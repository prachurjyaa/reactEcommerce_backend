const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

async function mail(email, username) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASS
      }
    });

    const message = {
      from: process.env.GMAILUSER,
      to: email,
      subject: 'Account Creation Successful',
      text: `Hi ${username},\n\nYour account has been created successfully!\n\nWelcome to our store.`,
      html: `
        <h2>Welcome, ${username}!</h2>
        <p>Your account has been created successfully.</p>
        <p>You can now sign in and start shopping.</p>
      `
    };

    await transporter.sendMail(message);
    console.log('Email sent successfully to', email);
  } catch (error) {
    console.error('Email sending failed:', error.message);
  }
}

module.exports = mail;