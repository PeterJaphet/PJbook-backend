import nodemailer from 'nodemailer';
import logger from './logger';

const mailSenderUzo = async (email: string, title: string, body: string) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.UZO_MAIL_HOST,
      auth: {
        user: process.env.UZO_MAIL_USER,
        pass: process.env.UZO_MAIL_PASS,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'PJBOOKS',
      to: email,
      subject: title,
      html: body,
    });
    logger.info('Email info: ', info);
    return info;
  } catch (error: any) {
    logger.info(error.message);
  }
};
export default mailSenderUzo;
