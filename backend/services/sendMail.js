import nodemailer from "nodemailer";

export const sendMail = async (options) => {
  try {
    // 1Create the transporter (SMTP connection)
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can also use host & port manually
      auth: {
        user: "koshishkdka321@gmail.com", // your Gmail address
        pass: "moqo rbbm dckk rasn", // app password (NOT your Gmail password)
      },
    });

    //  Send the mail
    const info = await transporter.sendMail({
      from: "Food Ordering System <koshishkdka@gmail.com>",
      to: options.to,
      subject: options.subject,
      text: options.text,
    });

    console.log(" Email sent:", info.response);
  } catch (error) {
    console.error("❌ Failed to send mail:", error);
  }
};
