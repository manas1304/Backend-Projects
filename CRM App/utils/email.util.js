const nodemailer = require("nodemailer");

async function sendWelcomeEmail(userEmail, userName) {
  try {
    const transporter = nodemailer.createTransport({
      // Using smtp.gmail.com with explicit port and family setting
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Force IPv4 to prevent ENETUNREACH errors on Render
      family: 4, 
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    const mailOptions = {
      from: `"CRM Pro Support" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Welcome to CRM Pro!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
            <h2 style="color: #2563eb;">Welcome to the Team, ${userName}!</h2>
            <p>Thank you for registering with <b>CRM Pro</b>. Your account has been successfully created.</p>
            <p>Our platform helps you manage tickets and support requests seamlessly. Log in now to get started!</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="https://your-crm-frontend.vercel.app/login" style="background-color: #0f172a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Access Dashboard</a>
            </div>
            <p style="margin-top: 40px; font-size: 12px; color: #64748b;">© 2026 CRM Pro. All rights reserved.</p>
        </div> `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent to: ${userEmail}. MessageId: ${info.messageId}`);
    
  } catch (err) {
    console.error("CRITICAL EMAIL ERROR:", err.message);
    // Log the full error if it's not a network unreachable issue
    if (err.code !== 'ENETUNREACH') {
        console.error(err);
    }
  }
}

module.exports = { sendWelcomeEmail };