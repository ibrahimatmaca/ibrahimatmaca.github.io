import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { generateEmailTemplate } from '../utils/emailTemplate';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Validate input
    const { name, email, message } = request.body;

    if (!name || !email || !message) {
      response.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, email, and message are required'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      response.status(400).json({ error: 'Invalid email format' });
      return;
    }

    // Get SMTP configuration from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || process.env.SMTP_FROM,
        pass: process.env.SMTP_PASSWORD || ''
      }
    };

    // Validate SMTP password exists
    if (!smtpConfig.auth.pass) {
      response.status(500).json({ 
        error: 'SMTP configuration error',
        details: 'SMTP_PASSWORD environment variable is not set'
      });
      return;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: smtpConfig.auth,
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Generate HTML email template
    const htmlContent = generateEmailTemplate({ name, email, message });

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_FROM || smtpConfig.auth.user}>`,
      to: process.env.SMTP_TO || smtpConfig.auth.user,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: htmlContent,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    response.status(200).json({ 
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    response.status(500).json({ 
      error: 'Failed to send email',
      details: error.message || 'An unknown error occurred'
    });
  }
}

