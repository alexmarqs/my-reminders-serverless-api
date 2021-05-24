import { Client } from '@notionhq/client';

const config = {
  authToken: process.env.NOTION_TOKEN,
  remindersDbId: process.env.NOTION_DB_ID_REMINDERS
};

// Initializing notion client
const notion = new Client({
  auth: config.authToken
  //logLevel: LogLevel.DEBUG,
});

type DatabaseRequest = {
  id: string;
};

export const readRemindersFromDB = async () => {
  return await notion.databases.query({
    database_id: config.remindersDbId,
    filter: {
      property: 'Status',
      multi_select: {
        contains: 'Enabled' // get only my active reminders
      }
    }
  });
};
