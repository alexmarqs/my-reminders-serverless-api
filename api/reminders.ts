import {
  RichTextText,
  TitlePropertyValue
} from '@notionhq/client/build/src/api-types';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { readRemindersFromDB } from './_utils/notion';
import { sendSMS } from './_utils/twilio';

const config = {
  mySecret: process.env.APP_SECRET,
  myPhoneNumber: process.env.MY_PHONE_NUMBER
};

export default async function (req: VercelRequest, res: VercelResponse) {
  const auth = req.headers.authorization;

  if (auth === config.mySecret) {
    let remindersMsg = 'My reminders for this month: ';

    try {
      const remindersDBResponse = await readRemindersFromDB();
      remindersMsg = remindersDBResponse.results.reduce(
        (acc, curr, idx, src) => {
          const reminderText = (
            (curr.properties.Name as TitlePropertyValue)
              .title[0] as RichTextText
          ).text.content;
          return acc + reminderText + (idx === src.length - 1 ? ';' : ', ');
        },
        remindersMsg
      );
      console.log(remindersMsg);
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({
        message:
          'Unexpected error reading reminders from Notion, see logs for more info!'
      });
    }

    try {
      await sendSMS({
        text: `${remindersMsg}`,
        to: config.myPhoneNumber
      });
      return res.status(200).json({ message: 'SMS sent with the reminders!' });
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({
        message: 'Unexpected error when sending SMS, see logs for more info!'
      });
    }
  }
  return res.status(401).end();
}
