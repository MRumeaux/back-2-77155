import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail", 
    host: "smtp.gmail.com", // Dirección del servidor SMTP del proveedor de correo que usemos (en este caso Gmail)
    port: 587,
    secure: false, 
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});