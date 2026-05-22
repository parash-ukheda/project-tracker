const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const EmailSendFun = (email, emailSubject, msg) => {
 
  const abcFun = async(req, res) => {
     console.log("alllKey", email, emailSubject, msg);
    try {
      let mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: emailSubject,
        text:`${msg}\n\nRegards,\n${process.env.REGARDS_NAME}`
      };
      console.log('mailOptions',mailOptions)
      const info = await transport.sendMail(mailOptions)
      console.log('info', info.messageId)
      console.log('Message sent successfully')
    } catch (error) {
        console.log('error',error)
      return res
        .status(500)
        .json({ status: "Failed", message: "Internal server error" });
    }
  };
  abcFun()
};

module.exports = {
  EmailSendFun,
};
