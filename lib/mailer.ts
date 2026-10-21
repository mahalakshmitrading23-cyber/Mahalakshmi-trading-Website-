import "server-only";
import nodemailer from "nodemailer";
import { company, siteUrl, waLink } from "@/lib/site";
import { enquiryRows, enquirySubject, whatsappText, type Enquiry } from "@/lib/enquiry";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function mailConfigured() {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transport() {
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f8f6f2;font-family:Arial,Helvetica,sans-serif;color:#2a2d31">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e8e4de">
    <tr><td style="background:#17191c;padding:20px 28px;color:#fff;font-size:18px;font-weight:bold">${esc(company.name)}
      <div style="color:#ef8a1e;font-size:12px;font-weight:normal;letter-spacing:1px;text-transform:uppercase;margin-top:4px">${esc(title)}</div></td></tr>
    <tr><td style="padding:28px">${body}</td></tr>
    <tr><td style="padding:16px 28px;background:#f8f6f2;color:#5f6368;font-size:12px">
      ${esc(company.name)} · ${esc(company.address.city)}, ${esc(company.address.state)} · GSTIN ${company.gstin}</td></tr>
  </table></td></tr></table></body></html>`;
}

function rowsTable(e: Enquiry) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${enquiryRows(e)
    .map(
      ([k, v]) => `<tr><td style="padding:10px 12px;border-bottom:1px solid #eee;color:#6b6c6e;width:38%;vertical-align:top">${esc(k)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:bold;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

const button = (href: string, label: string, bg: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:#fff;text-decoration:none;font-weight:bold;padding:11px 18px;border-radius:8px;margin:0 8px 8px 0">${esc(label)}</a>`;

/** Notifies the business, and acknowledges the buyer when they gave an email address. */
export async function sendEnquiryEmails(e: Enquiry) {
  const t = transport();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER!;
  const to = process.env.ENQUIRY_TO || company.email;
  const digits = e.phone.replace(/\D/g, "");
  const buyerWa = `https://wa.me/${digits.length === 10 ? "91" + digits : digits}`;

  const reply = [
    button(`tel:${e.phone.replace(/[^\d+]/g, "")}`, "Call buyer", "#17191c"),
    button(buyerWa, "WhatsApp buyer", "#1fa855"),
    e.email ? button(`mailto:${e.email}?subject=${encodeURIComponent("Re: " + enquirySubject(e))}`, "Reply by email", "#ef8a1e") : "",
  ].join("");

  await t.sendMail({
    from,
    to,
    replyTo: e.email || undefined,
    subject: enquirySubject(e),
    text: whatsappText(e).replace(/\*/g, ""),
    html: shell(
      e.kind === "quote" ? "New quotation request" : "New website enquiry",
      `<p style="margin:0 0 16px;font-size:15px">A new enquiry was submitted on the website${e.channel === "whatsapp" ? " (the buyer also opened WhatsApp)" : ""}.</p>
       ${rowsTable(e)}<div style="margin-top:22px">${reply}</div>`,
    ),
  });

  if (e.email) {
    await t.sendMail({
      from,
      to: e.email,
      replyTo: to,
      subject: `We've received your enquiry — ${company.name}`,
      text: `Dear ${e.name},\n\nThank you for contacting ${company.name}. We have received your enquiry and our team will get back to you shortly.\n\n${whatsappText(e).replace(/\*/g, "")}\n\nFor anything urgent, call ${company.phones[0].display} or WhatsApp ${company.whatsapp.display}.\n\n${company.name}\n${siteUrl}`,
      html: shell(
        "Enquiry received",
        `<p style="margin:0 0 12px;font-size:15px">Dear ${esc(e.name)},</p>
         <p style="margin:0 0 18px;font-size:15px;line-height:1.6">Thank you for contacting ${esc(company.name)}. We have received your enquiry and our team will get back to you shortly. Here is a copy of what you sent:</p>
         ${rowsTable(e)}
         <p style="margin:22px 0 10px;font-size:14px">For anything urgent:</p>
         ${button(`tel:${company.phones[0].tel}`, `Call ${company.phones[0].display}`, "#17191c")}${button(waLink(), "WhatsApp us", "#1fa855")}`,
      ),
    });
  }
}
