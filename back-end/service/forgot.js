import bcrypt from 'bcrypt';
import 'dotenv/config';
import crypto from 'crypto';
import User from '../model/User.js';
import nodemailer from 'nodemailer';
import { use } from 'react';

function generateKey(length = 5) {
  return crypto.randomBytes(length).toString('hex');
}

export async function Forgot(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.reset) {
      return res.status(400).json({ error: 'Reset already requested, try again later' });
    }

    const key = generateKey();
    user.reset = true;
    user.key = key;
    await user.save();

    setTimeout(async () => {
      try {
        await User.findOneAndUpdate(
          { email },
          { $set: { reset: false, key: null } }
        );
      } catch (err) {
        console.error('Error resetting reset/key after timeout:', err);
      }
    }, 36000);
    

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Password Recovery" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset</h2>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <a href="http://localhost:5173/forgot-password/${key}"
           style="display: inline-block; padding: 10px 20px; background-color: #4a6bff; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">
          Reset Password
        </a>
        <p>This link will expire in 1 minute.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p style="font-size: 12px; color: #888;">
          Can't click the button? Copy this link: http://localhost:5173/forgot-password/${key}
        </p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Password reset link sent', key });
      }
    });
  } catch (e) {
    console.error('Server error:', e);
    res.status(500).json({ error: 'Server error' });
  }
}





export async function ResetPassword(req, res) {
  try {
    const { key } = req.params;
    const { email, password } = req.body;

    if (!key) {
      return res.status(400).json({ error: 'Reset key is required' });
    }

    const user = await User.findOne({ key });

    if (!user) {
      return res.status(404).json({ error: 'User not found or invalid reset key' });
    }

    if (!user.reset) {
      return res.status(400).json({ message: 'User already reset their password' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.reset = false;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
