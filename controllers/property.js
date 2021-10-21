import models, { sequelize } from '../models/index.js';
import { uniqueId } from '../utilities/functions.js';
import paystackLib from 'paystack';
import crypto from 'crypto';
import env from 'dotenv';
env.config();

// TODO hide taken properties
export const fetchProperty = (req, res) => {
    models.PropertyCategory.findAll({ include: models.Property })
        .then(properties => {
            res.status(200)
                .json({ data: properties, message: "Success" })
        });
}

export const addProperty = (req, res) => {
    models.PropertyCategory.findByPk(req.body.categoryId)
        .then(category => {
            category.createProperty({
                plotId: req.body.plotId,
                size: req.body.size,
                unit: req.body.unit,
                price: req.body.price,
                thumbnailUrl: req.body.thumbnailUrl
            }).then(property => {
                res.status(201)
                    .json({
                        data: property,
                        message: "Property added successfully"
                    })
            }).catch((err) => {
                res.status(400)
                    .json({
                        error: err.errors,
                        message: "Property inclusion failed"
                    })
            });
        }).catch(() => { res.status(400).json({ message: "Category does not exist" }) });
}

export const addPropertyCategory = (req, res) => {
    models.PropertyCategory.create({
        categoryName: req.body.categoryName,
        description: req.body.description
    }).then(category => {
        res.status(201)
            .json({
                data: category,
                message: "Category created successfully"
            })
    }).catch(() => {
        res.status(400)
            .json({
                message: "Category creation failed"
            })
    });
}

export const initiatePayment = (req, res) => {
    models.Property.findOne({
        where: { plotId: req.params.plotId }
    }).then(async property => {
        // extract pin from jwt and use to fetch user who wants to pay
        const payerPin = await models.Pin.findOne({
            where: { pin: req.payload.pin },
            include: models.Persona
        });

        const sale = await property.createSale({
            paymentProvider: 'paystack',
            paymentReference: uniqueId(),
            amount: property.price
        });

        // set the user who wants to pay
        await sale.setPersona(payerPin.Persona);

        let referenceId = property.isTaken == false ? sale.paymentReference : '';
        res.status(200)
            .json({
                data: { referenceId, isTaken: property.isTaken },
                message: "Success"
            });
    }).catch(err => {
        console.log(err);
        res.status(204)
            .json({ message: "No property matches supplied id" });
    });
}

export const verifyPayment = (req, res) => {
    const paystack = paystackLib(process.env.PAYSTACK_SECRET_KEY);

    // check reference id exists
    models.Sale.findOne({
        where: { paymentReference: req.body.referenceId },
        include: models.Property
    }).then(async sale => {
        const paystackVerificationResponse = await paystack.transaction
            .verify(sale.paymentReference);
        if (paystackVerificationResponse.status) {
            if (await !confirmPayment(sale))
                return res.status(400)
                    .json({ message: "Payment verification failed" });

            res.status(200)
                .json({ message: "Payment successful" });
        } else
            res.status(400)
                .json({ message: "Payment unsuccessful" });
    }).catch(() => {
        res.status(400)
            .json({ message: "No payment reference found" });
    });
}

export const verifyOfflinePayment = (req, res) => {
    if (req.body.referenceId != req.body.retypeReferenceId)
        return res.status(400).json({ message: "Please retype correct reference id" });
    if (!req.body.name)
        return res.status(400).json({ message: "Please enter payer name" });

    models.Sale.findOne({
        where: { paymentReference: req.body.referenceId },
        include: models.Property
    }).then(async sale => {
        const data = {
            type: 'offline payment',
            name: req.body.name
        }
        if (await webhookConfirmPayment(sale, JSON.stringify(data)))
            return res.status(200).json({ message: "Verification successful" });
        res.status(400).json({ message: "Verfication unsuccessful" });
    });
}

export const paystackWebhook = (req, res) => {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    let hash = crypto.createHmac('sha512', secret)
        .update(JSON.stringify(req.body)).digest('hex');
    if (hash == req.headers['x-paystack-signature']
        && req.body.event == "charge.success") {
        models.Sale.findOne({
            where: { paymentReference: req.body.data.reference },
            include: models.Property
        }).then(sale => {
            webhookConfirmPayment(sale, req.body.data);
        });
    }
    res.sendStatus(200);
}

/**
 * webhookConfirmPayment allows the payment gateway such as paystact, call our app after 
 * a successful payment, and marks the payment as successful in the database.
 * It is also called by our app's admin, whenever req, resa user decides to us offline payment
 * For a payment to be marked as done, the columns clientHasConfirmedPayment and 
 * webhookHasConfirmedPayment of a record should be true.
 */
export const webhookConfirmPayment = async (sale, extraData) => {
    const t = await sequelize.transaction();
    try {
        if (sale.clientHasConfirmedPayment) {
            sale.Property.isTaken = true;
            await sale.Property.save({ transaction: t });
        }
        sale.webhookHasConfirmedPayment = true;
        sale.paymentGatewayPayload = extraData;
        await sale.save({ transaction: t });

        await t.commit();
        return true;
    } catch (err) {
        await t.rollback();
        console.log(err);
        return false;
    }
}

/**
 * confirmPayment should be called when a user makes and online payment, or uploads a 
 * document of proof for payment in the case of offline payment.
 * For a payment to be marked as done, the columns clientHasConfirmedPayment and 
 * webhookHasConfirmedPayment of a record should be true.
 */
export const confirmPayment = async (sale) => {
    const t = await sequelize.transaction();
    try {
        if (sale.webhookHasConfirmedPayment) {
            sale.Property.isTaken = true;
            await sale.Property.save({ transaction: t });
        }
        sale.clientHasConfirmedPayment = true;
        await sale.save({ transaction: t });

        await t.commit();
    } catch (err) {
        await t.rollback();
        console.log(err);
        return false;
    }

    return true;
}