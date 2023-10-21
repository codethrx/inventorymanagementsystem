const { createTransport } = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "juanita.vandervort48@ethereal.email",
      pass: "Tkns3zRUe1ZsFJ74jq",
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};
module.exports = sendEmail;
