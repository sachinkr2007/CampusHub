const nodemailer = require("nodemailer");

// ===============================
// EMAIL TRANSPORTER
// ===============================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// ===============================
// SEND EMAIL
// ===============================

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"CampusHub" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully to:", to);

  } catch (error) {
    console.error("Email sending error:", error);

    throw error;
  }
};


module.exports = sendEmail;