import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({

    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    
    logger:true,
    debug:true,
    secureConnection:false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
    tls:{
      rejectUnauthorized:true,
    }

  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<b>${options.message}</b>`, // html body
  };
  
  const info=await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
  
};

export default sendEmail;


