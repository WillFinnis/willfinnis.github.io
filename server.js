import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New message from ${name}`,
            text: message
        });

        res.send("Message sent successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to send message.");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
