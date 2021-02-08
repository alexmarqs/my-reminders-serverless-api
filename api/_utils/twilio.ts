import { Twilio } from 'twilio';
import { twilioConfig } from './config';

type SMS = {
  text: string;
  from?: string;
  to: string;
};

const client = new Twilio(twilioConfig.accountSid, twilioConfig.authToken);

export async function sendSMS(msg: SMS) {
  return await client.messages.create({
    body: msg.text,
    from: msg.from || twilioConfig.phoneNumber,
    to: msg.to
  });
}
