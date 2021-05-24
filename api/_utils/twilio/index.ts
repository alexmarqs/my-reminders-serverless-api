import { Twilio } from 'twilio';

const config = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER
};

type SMS = {
  text: string;
  from?: string;
  to: string;
};

// Initializing twilio client
const client = new Twilio(config.accountSid, config.authToken);

export async function sendSMS(msg: SMS) {
  return await client.messages.create({
    body: msg.text,
    from: msg.from || config.phoneNumber,
    to: msg.to
  });
}
