const nodemailer = require("nodemailer");
require("dotenv").config(); // To use env vars

// create function to send the email

const SendAccVerificationEmail = async (to, ressetToken) => {
  try {
    // create transport
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.Gmail_User, // user email address
        pass: process.env.Gmail_pass,
      },
    });

    //  create message
    const message = {
      to,
      subject: "Account verification ",
      html: `
            <h3> you're receiving this email because you (some one else)have requested to verify your account<h3>
            <h2>http://localhost:3000/Verify_acc/${ressetToken}</h2>
            <h2>If you did not request this reset please ignore this email and no changes  will be made.</h2>
            `,
    };
    // send the email
    const info = await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
    throw new error("Email sending failed");
  }
};

module.exports = SendAccVerificationEmail;
