import nodeMailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { type IRes } from "../interfaces/express.interface";
import { envVar } from "@envVar/env";

export function GetEmailTransporter() {
  const emailTransporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: envVar.EMAIL_FROM,
      pass: envVar.EMAIL_PASSWORD,
    },
  });
  return emailTransporter;
}

export const createEmailOptions = (html: any, to: string) => {
  const mailOptions: Mail.Options = {
    from: envVar.EMAIL_FROM,
    to,
    subject: "TEST NODEMAILER",
    html,
  };
  return mailOptions;
};

export const sendEmail = async (res: IRes) => {
  const html = "<div>hello</div>";
  const transporter = GetEmailTransporter();
  const mailOptions = createEmailOptions(html, "npaul2173@gmail.com");
  try {
    await transporter.sendMail(mailOptions);
    res.send({ message: "mail sent" });
  } catch (error) {
    res.send({ message: "Failed to send email" });
  }
};
