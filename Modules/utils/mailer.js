const nodemailer = require('nodemailer');
const { MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_VERIFY_ACCOUNT, MAIL_USERNAME } = require('../../config');
const { InternalError } = require('../Error/Error');
const { INTERNAL_ERROR } = require('../Error/StatusCode');

exports.send_email = async(sender,receiver, subject, html) => {
    try {

        const transport = nodemailer.createTransport({

            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: MAIL_SECURE, // true for 465, false for other ports
            auth: {
                user: MAIL_VERIFY_ACCOUNT, // your domain email address
                pass: MAIL_USERNAME// your password
            }
        });

        const mailOptions = {
            from: sender, // Sender address
            to: receiver, // List of recipients
            subject: subject, // Subject line
            html: html,
        };

        return await transport.sendMail(mailOptions)

    } catch (error) {
        throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to send email via nodemailer")
    }
}
