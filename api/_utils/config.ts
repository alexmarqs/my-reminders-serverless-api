const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER
};

const googleConfig = {
  clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
};

const appConfig = {
  mySecret: process.env.APP_SECRET,
  myPhoneNumber: process.env.MY_PHONE_NUMBER
};

const dadjokeConfig = {
  apiUrl: 'https://icanhazdadjoke.com/',
  userAgentName: 'DadJokes API Serverless function'
};

export { twilioConfig, appConfig, googleConfig, dadjokeConfig };
