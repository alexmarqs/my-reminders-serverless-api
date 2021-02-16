import { NowRequest, NowResponse } from '@vercel/node';
import { loadRandomDadJoke } from './_utils/joke';
import { sendSMS } from './_utils/twilio';
import { appConfig } from './_utils/config';

export default async function (req: NowRequest, res: NowResponse) {
  const auth = req.headers.authorization;

  if (auth === appConfig.mySecret) {
    let joke = '';

    try {
      const result = await loadRandomDadJoke();
      joke = result.joke;
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({
        message: 'Unexpected error when fetching joke, see logs for more info!'
      });
    }

    try {
      await sendSMS({
        text: `Dadjoke of the week: ${joke}`,
        to: appConfig.myPhoneNumber
      });
      return res.status(200).json({ message: 'SMS sent with the joke!' });
    } catch (ex) {
      console.log(ex);
      return res.status(500).json({
        message: 'Unexpected error  when sending SMS, see logs for more info!'
      });
    }
  }

  return res.status(401).end();
}
