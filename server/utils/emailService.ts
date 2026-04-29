import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendContactNotification = async (contactData: any) => {
  const { name, email, phone, service, message } = contactData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'astacksolutions@gmail.com',
    subject: `New Contact Form Submission - ${name}`,
    text: `
      You have a new message from Astack Solutions website:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service Requested: ${service}
      
      Message:
      ${message}
    `,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service Requested:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
