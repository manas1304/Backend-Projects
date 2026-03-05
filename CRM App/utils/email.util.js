const Brevo = require('@getbrevo/brevo').default || require('@getbrevo/brevo');

const client = Brevo.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new Brevo.TransactionalEmailsApi();

async function sendWelcomeEmail(userEmail, name) {
  try {
    const sendSmtpEmail = {
      to: [{ email: userEmail, name: name }],
      sender: { email: 'manasshukla01304@gmail.com', name: 'CRM Pro Support' },
      subject: 'Welcome to CRM Pro!',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
            <h2 style="color: #2563eb;">Welcome to the Team, ${name}!</h2>
            <p>Thank you for registering with <b>CRM Pro</b>. Your account has been successfully created.</p>
            <p>Our platform helps you manage tickets and support requests seamlessly. Log in now to get started!</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="https://manas-crm.vercel.app/login" style="background-color: #0f172a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Access Dashboard</a>
            </div>
            <p style="margin-top: 40px; font-size: 12px; color: #64748b;">© 2026 CRM Pro. All rights reserved.</p>
        </div>`
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to ${userEmail}`);
  } catch (err) {
    console.error('Email Error:', err.message);
  }
}

module.exports = { sendWelcomeEmail };