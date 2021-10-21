import nodemailer from 'nodemailer';
import env from 'dotenv';
env.config();

export const uniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const sendMail = (referenceId, name) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_EMAIL_PASSWORD
        },
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: `"${req.body.name}" <bonitasmailer@gmail.com>`, // sender address
        to: "gerald.nnebe@bonitasict.com, gerald.nnebe@bonitasict.com", // list of receivers
        subject: `${Date.now()} GVE Groundbreaking app offline payment receipt/`, // Subject line
        // text: `From ${req.body.name}: ${req.body.body}`, // plain text body
        html: `<p><b>From: ${name}</b></p><p><b>Reference Id: ${referenceId}</b></p>`,
    }).then(() => {
        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        res.status(200).send('Message sent successfully');
    }).catch(e => console.log(e));
};