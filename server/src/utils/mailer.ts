import nodemailer from 'nodemailer';
import { config } from '../config/env';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465, // true for 465, false for other ports
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const sendEmployeeWelcomeEmail = async (
  toEmail: string,
  firstName: string,
  loginId: string,
  rawPassword: string
) => {
  // If SMTP is not configured, just log it instead of crashing
  if (!config.smtp.user || !config.smtp.pass) {
    console.warn('⚠️ SMTP is not configured! Welcome email was NOT sent to:', toEmail);
    console.warn(`LoginId: ${loginId} | Password: ${rawPassword}`);
    return;
  }

  const mailOptions = {
    from: `"Dayflow HRMS" <${config.smtp.user}>`,
    to: toEmail,
    subject: 'Welcome to Dayflow - Your Account Details',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Welcome to Dayflow, ${firstName}!</h2>
        <p>Your employee account has been successfully created by your HR team.</p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Login ID:</strong> ${loginId}</p>
          <p><strong>Temporary Password:</strong> ${rawPassword}</p>
        </div>
        <p>You will be required to change your password upon your first login.</p>
        <p>Best Regards,<br/>The Dayflow Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
  }
};
