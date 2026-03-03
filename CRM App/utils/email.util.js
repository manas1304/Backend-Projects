const nodemailer = require('nodemailer');

async function sendWelcomeEmail(userEmail, userName){

    try{
        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        })

        // Content Inside the mail
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
                        <a href="http://localhost:3000/login" style="background-color: #0f172a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Access Dashboard</a>
                    </div>
                    <p style="margin-top: 40px; font-size: 12px; color: #64748b;">© 2026 CRM Pro. All rights reserved.</p>
                </div> `
            ,
        }

        await transporter.sendMail(mailOptions);
        console.log(`Welcome Email sent to ${userName}`)

    }catch(err){
        console.error("Error Sending Email", err);
    }
}

module.exports = {sendWelcomeEmail};