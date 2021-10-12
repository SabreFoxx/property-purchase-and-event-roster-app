import models from '../models/index.js';
import { uniqueId } from '../utilities/functions.js';

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
        where: {
            plotId: req.params.plotId,
            isTaken: false
        }
    }).then(async property => {
        const sale = await property.createSale({
            paymentProvider: 'paystack',
            paymentReference: uniqueId(),
            amount: property.price
        });

        referenceId = property.isTaken == false ? sale.paymentReference : '';
        res.status(200)
            .json({
                data: { referenceId, isTaken: property.isTaken },
                message: "Success"
            });
    }).catch(() => {
        res.status(204)
            .json({ message: "No property matches supplied id" });
    });
}

export const verifyPayment = (req, res) => {

}