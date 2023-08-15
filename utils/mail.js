require("dotenv").config()


OTPMail = (name, email, OTP) => {
    const mail = {
        from: process.env.NODE_MAILER_USEREMAIL,
        to: email,
        subject: 'Verify Your email Account for ECom Authentication',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ECom</a>
      </div>
      <p style="font-size:1.1em">Hi ${name},</p>
      <p>Thank you for choosing Your ECom. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      <p style="font-size:0.9em;">Regards,<br />ECom</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>ECom Inc</p>
        <p>B-1104, Saarrthi Signor</p>
        <p>Pune</p>
      </div>
    </div>
  </div>`
    }

    return mail
}

transportObject = () => {
    return {
      service: process.env.NODE_MAILER_SERVICE_PROVIDER,
      auth: {
          user: process.env.NODE_MAILER_USEREMAIL,
          pass: process.env.NODE_MAILER_USERPASS
      }
    }
}

verifiedMail = (name, email) => {
    return {
        from: process.env.NODE_MAILER_USEREMAIL,
        to: email,
        subject: 'Account Verified',
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ECom</a>
          </div>
          <p style="font-size:1.1em">Hi ${name},</p>
          <p>Thank you for choosing Your ECom. </p>
          <p>Your Email has been verified.</p>
          <p style="font-size:0.9em;">Regards,<br />ECom</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>ECom Inc</p>
            <p>B-1104, Saarrthi Signor</p>
            <p>Pune</p>
          </div>
        </div>
      </div>`
    }
}

module.exports = { OTPMail, transportObject, verifiedMail }
