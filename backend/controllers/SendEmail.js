const nodemailer = require("nodemailer");
const PDFDocument = require('pdfkit');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ssa.info.service@gmail.com',
    pass: 'eoqapgpjfqeyhdgg'
  }
});

async function sendmailWithPDF(mail, subject, text, pdfContent) {
  try {
    // Generate the PDF
    const doc = new PDFDocument();
    doc.fontSize(12).text(text);

     // Load and embed the logo in the PDF
     const logo = fs.readFileSync('controllers\\ssa.png');
     doc.image(logo, 200, 350, { width: 500 });

     // Draw a border around the content
    const borderX = 40; // X-coordinate for the border
    const borderY = 50; // Y-coordinate for the border
    const borderWidth = 500; // Width of the border rectangle
    const borderHeight = 200; // Height of the border rectangle
    doc.rect(borderX, borderY, borderWidth, borderHeight).stroke();
   
     doc.end();

    const mailOptions = {
      from: 'ssa.info.service@gmail.com',
      to: mail,
      subject: subject,
      text: 'Please find the attached PDF for details.',
      attachments: [
        {
          filename: 'SSA.pdf',
          content: doc, // Use the generated PDF content here
        },
      ],
    };

    // Send the email with the attached PDF
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent with PDF attachment:', info.response);
  } catch (error) {
    console.error('Error sending email with PDF:', error);
  }
}

module.exports = {
  sendmailWithPDF // Make sure to export sendmailWithPDF, not sendmail
};
