const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: "loquenderolax13@gmail.com",
    pass: "nvuvwleulaamluef",
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: "Confirmacion de Correo Electronico",
      to: email,
      subject,
      text: "Ingrese al Link para confirmar su cuenta",
      html,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      ok: false,
      message: "Algo no va bien con el email",
      error,
    });
  }
};
const getTemplate = (name, token) => {
  return `     
      <div style="margin-left: 35%; margin-right: 50%; width:400px" class="cont-message">
      <img style="margin-left: 160px;" width="100px" src="https://avatars.githubusercontent.com/u/84889331?s=400&u=7d4de3840fd2b45c1c5a164a1ae74bdb60a7b51f&v=4" alt="">
      <h2 style="margin-left: 82px;">Hola ${name} Somos Soft-Lore</h2>
      <p style="margin-left: 92px;">Necesitamos validar tu dirección de email</p>
      <div style="margin-left: 100px; margin-top: 20px; width: 200px; background-color: #90be6d; padding: 10px; border-radius: 10px; text-align: center" class="buttom">
          <a style="text-decoration: none; color: white; text-transform: uppercase;" href="http://localhost:4000/api/confifrEmail/${token}">Confirmar cuenta</a>
      </div>
      </div>
    `;
};

module.exports = {
  sendEmail,
  getTemplate,
};
