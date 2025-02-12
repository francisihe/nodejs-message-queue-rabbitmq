import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmailNotification(notification: { product: string; message: string }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `Stock Alert: ${notification.product}`,
      text: notification.message,
    });

    console.log(`📧 Email sent: ${notification.message}`);
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
}
