import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Task Manager',
      link: 'https://mailgen.com',
    },
  })

  var emailText = mailGenerator.generatePlainText(options.mailGenContent)
  var emailHTML = mailGenerator.generate(options.mailGenContent)

  const transporter = nodemialer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  })

  const mail = {
    from: 'falaanabakchod',
    to: options.email,
    subject: options.email.subject,
    text: emailText,
    html: emailHTML,
  }

  try {
    await transporter.sendMail(mail)
  } catch (error) {
    console.error('something went wrong while sending mail: ' + error)
  }
}

// factory function
const emailVerificationMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to App, We're excited to have you onboard",
      action: {
        instructions: 'To get started with our app please click here',
        button: {
          color: '#22BC66',
          text: 'Verify your email',
          link: verificationUrl,
        },
      },
      outro: 'need help or have any questions? just reply',
    },
  }
}

const forgotPasswordMailGenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to App, We're excited to have you onboard",
      action: {
        instructions: 'to change your password please click here',
        button: {
          color: '#22BC66',
          text: 'reset your password',
          link: verificationUrl,
        },
      },
      outro: 'need help or have any questions? just reply',
    },
  }
}
