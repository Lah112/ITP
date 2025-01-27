const emailSender = async ({
    senderEmail,
    subject,
    html,
  }) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Or your email service
      auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: senderEmail,
      subject: subject,
      html: html,
    };
  
    await transporter.sendMail(mailOptions);
  };
export default emailSender