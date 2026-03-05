const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');

const apiInstance = new TransactionalEmailsApi();
apiInstance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

async function sendWelcomeEmail(userEmail, name) {
  try {
    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.subject = 'Welcome to CRM Pro!';
    sendSmtpEmail.sender = { email: 'manasshukla01304@gmail.com', name: 'CRM Pro Support' };
    sendSmtpEmail.to = [{ email: userEmail, name: name }];
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
          <h2 style="color: #2563eb;">Welcome to the Team, ${name}!</h2>
          <p>Thank you for registering with <b>CRM Pro</b>. Your account has been successfully created.</p>
          <p>Our platform helps you manage tickets and support requests seamlessly. Log in now to get started!</p>
          <div style="text-align: center; margin-top: 30px;">
              <a href="https://manas-crm.vercel.app/login" style="background-color: #0f172a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Access Dashboard</a>
          </div>
          <p style="margin-top: 40px; font-size: 12px; color: #64748b;">© 2026 CRM Pro. All rights reserved.</p>
      </div>`;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to ${userEmail}`);
  } catch (err) {
    console.error('Email Error:', err.message);
  }
}

module.exports = { sendWelcomeEmail };