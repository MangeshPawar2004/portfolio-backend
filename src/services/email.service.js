import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth: { user: env.smtp.user, pass: env.smtp.pass },
});

export const sendContactNotification = async ({ name, email, subject, message }) => {
  if (!env.smtp.user || !env.smtp.notifyEmail) return;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${env.smtp.user}>`,
    to: env.smtp.notifyEmail,
    subject: `📬 New message: ${subject || "No subject"} — from ${name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3B82F6;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; width: 100px;">Name</td><td>${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email</td><td>${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Subject</td><td>${subject || "—"}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px;">
          <p style="margin: 0;">${message}</p>
        </div>
        <p style="margin-top: 16px; color: #6b7280; font-size: 12px;">
          Reply directly to: <a href="mailto:${email}">${email}</a>
        </p>
      </div>
    `,
    replyTo: email,
  });
};

export const sendContactAutoReply = async ({ name, email }) => {
  if (!env.smtp.user) return;

  await transporter.sendMail({
    from: `"Portfolio" <${env.smtp.user}>`,
    to: email,
    subject: "Thanks for reaching out!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hi ${name},</h2>
        <p>Thanks for getting in touch! I've received your message and will get back to you shortly.</p>
        <p>— Mangesh</p>
      </div>
    `,
  });
};