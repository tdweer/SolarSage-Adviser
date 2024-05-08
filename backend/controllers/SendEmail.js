const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ssa.info.service@gmail.com',
    pass: 'eoqapgpjfqeyhdgg'
  }
});


async function sendmail(mail, subject, text) {

  var mailOptions = {
    from: 'ssa.info.service@gmail.com',
    to: mail,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

// main().catch(console.error);
module.exports = {
  sendmail
}