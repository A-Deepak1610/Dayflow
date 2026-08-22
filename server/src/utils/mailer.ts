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

export const sendOtpEmail = async (
  toEmail: string,
  otp: string,
  recipientName: string = 'HR Administrator'
) => {
  if (!config.smtp.user || !config.smtp.pass) {
    console.warn('⚠️ SMTP is not configured! OTP was NOT sent to:', toEmail);
    console.warn(`Generated OTP: ${otp}`);
    return;
  }

  const mailOptions = {
    from: `"Dayflow HRMS Security" <${config.smtp.user}>`,
    to: toEmail,
    subject: `🔐 ${otp} is your Dayflow HR Verification Code`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #F4F5F7; margin: 0; padding: 20px; }
          .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { background: #1F2A52; padding: 28px 24px; text-align: center; }
          .logo { display: inline-block; background: #E9573F; color: #ffffff; font-weight: 800; font-size: 18px; padding: 8px 14px; border-radius: 8px; margin-bottom: 8px; }
          .title { color: #ffffff; font-size: 20px; margin: 8px 0 0 0; font-weight: 700; }
          .content { padding: 32px 28px; color: #334155; line-height: 1.6; }
          .greeting { font-size: 16px; font-weight: 600; color: #1F2A52; margin-bottom: 12px; }
          .otp-box { background: #F8FAFC; border: 2px dashed #CBD5E1; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-code { font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #E9573F; font-family: 'Courier New', monospace; }
          .badge { display: inline-block; background: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; margin-top: 8px; }
          .footer { padding: 20px 28px; background: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">DF</div>
            <h1 class="title">Dayflow HRMS</h1>
          </div>
          <div class="content">
            <p class="greeting">Hello ${recipientName},</p>
            <p>You are registering a company and creating an HR Administrator account on Dayflow. Please use the verification code below to confirm your business email address.</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <div class="badge">Valid for 10 minutes</div>
            </div>

            <p style="font-size: 13px; color: #64748B;">If you did not request this verification code, please ignore this email or contact support if you have security concerns.</p>
            <p style="margin-top: 24px; font-weight: 600; color: #1F2A52;">Best regards,<br/>The Dayflow Security Team</p>
          </div>
          <div class="footer">
            Dayflow Human Resource Management System &bull; Enterprise HR & Workforce Automation
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification OTP sent to ${toEmail}`);
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw error;
  }
};
