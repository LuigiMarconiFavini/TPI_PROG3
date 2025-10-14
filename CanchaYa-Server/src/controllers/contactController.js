import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendContactEmail = async (req, res) => {
  const { nombre, apellido, email, telefono, asunto, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // Configurar transporter con Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();

    const mailOptions = {
      from: `"${nombre} ${apellido}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Contacto desde CanchaYa: ${asunto}`,
      text: `Mensaje: ${mensaje}\n\nTeléfono: ${telefono}\nEmail: ${email}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Correo enviado correctamente." });
  } catch (error) {
    console.error("❌ Error al enviar mensaje:", error);
    res.status(500).json({ error: "Error al enviar el correo." });
  }
};
