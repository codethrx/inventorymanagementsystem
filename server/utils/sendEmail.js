const { createTransport } = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "garfield.satterfield@ethereal.email",
      pass: "hcEuauGH2bUfjNTpNU",
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};
module.exports = sendEmail;
