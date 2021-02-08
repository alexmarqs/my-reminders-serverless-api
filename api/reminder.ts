import { NowRequest, NowResponse } from '@vercel/node';
import { readSheet } from './_utils/google';
import { sendSMS } from './_utils/twilio';
import { appConfig } from './_utils/config';

export default async function (req: NowRequest, res: NowResponse) {
  const auth = req.headers.authorization;

  if (auth === appConfig.mySecret) {
    let remindersList = '';

    try {
      const response = await readSheet({
        id: '1HsjotxmlPu-xDOYCS2iXaoXSLCCxFGtWfJYg4CPt1Vk', // sheet id
        tab: 'monthly_reminders' // sheet tab name
      });
      remindersList = response.data.values.map(row => row[0]).toString(); // get first column entries
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({
        message: 'Unexpected error reading sheet, see logs for more info!'
      });
    }

    try {
      await sendSMS({
        text: `Monthly reminders: ${remindersList}`,
        to: appConfig.myPhoneNumber
      });
      return res.status(200).json({ message: 'SMS sent with the reminder!' });
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({
        message: 'Unexpected error  when sending SMS, see logs for more info!'
      });
    }
  }

  return res.status(401).end();
}
