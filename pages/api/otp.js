// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// ref: https://www.twilio.com/docs/sms/quickstart/node

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER; 
const client = require('twilio')(accountSid, authToken);

export default (req, res) => {
  switch (req.method) {
    case 'POST': {
      const { phoneNumber, otp } = req.body // destructuring phoneNumber and otp from req.body
     
        client.messages
        .create({
        body: `Your otp is ${otp}`,
        to: `+91${phoneNumber}`, // Text your number
        from: `${twilioNumber}`, // Get your number from twilio.com/console or sign up to twilio get one
        })
        .then((message) => console.log(message.sid));

        res.status(200).json({ message: 'OTP sent successfully' })
    }
  }


}

