import { TitlePropertyValue } from '@notionhq/client/build/src/api-types';
import { VercelRequest, VercelResponse, VercelApiHandler } from '@vercel/node';
import { readRemindersFromDB } from './_utils/notion';
import { sendSMS } from './_utils/twilio';
import { withSentryApiHandler } from './_utils/sentry';

const config = {
  mySecret: process.env.APP_SECRET,
  myPhoneNumber: process.env.MY_PHONE_NUMBER
};

export default withSentryApiHandler(async function (req: VercelRequest, res: VercelResponse) {
  const auth = req.headers.authorization;

  if (auth === config.mySecret) {
    let remindersMsg = 'My reminders: ';

    const remindersDBResponse = await readRemindersFromDB();
    const results = remindersDBResponse.results;

    results.forEach((result, idx) => {
      const reminderText = (result.properties.Name as TitlePropertyValue).title[0].plain_text;
      remindersMsg = remindersMsg + reminderText + (idx === results.length - 1 ? ';' : ', ');
    });

    await sendSMS({
      text: `${remindersMsg}`,
      to: config.myPhoneNumber
    });

    return res.status(200).json({ message: 'SMS sent with the reminders!' });
  }

  return res.status(401).end();
});
