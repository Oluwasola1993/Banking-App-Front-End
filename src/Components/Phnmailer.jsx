import React from "react";

const Phnmailer = () => {
  return (
    <div>
      {/* const twilio = require("twilio"); */}
      {/* require("dotenv").config();
    
    // Twilio setup
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    
    // Function to send SMS verification
    const sendVerificationSMS = (phoneNumber, verificationCode) => {
      twilioClient.messages
        .create({
          body: `Your verification code is: ${verificationCode}`,
          from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
          to: phoneNumber,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.error(err));
    };
    
    module.exports = { sendVerificationSMS };
    
    
    // npm i nodemailer
    // npm i twilio */}
    </div>
  );
};

export default Phnmailer;
