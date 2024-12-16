import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
    const msg = {
      to, // Dirección de correo del destinatario
      from: 'duvanaponteramirez@gmail.com', // Dirección de correo verificada en SendGrid
      subject,
      text,
      html: `<strong>${text}</strong>`, // Para enviar en formato HTML también
    };
  
    try {
      await sgMail.send(msg); // Envía el correo
      console.log(`Correo enviado a ${to}`);
      return true;
    } catch (error) {
      console.error('Error al enviar correo:', error);
      return false; // Si falla, devuelve false
    }
  };
