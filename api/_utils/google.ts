import { google } from 'googleapis';
import { googleConfig } from './config';

type Sheet = {
  id: string;
  tab: string;
};

const authJwt = new google.auth.JWT(
  googleConfig.clientEmail,
  null,
  googleConfig.privateKey,
  googleConfig.scopes
);

export async function readSheet(sheet: Sheet) {
  const sheets = google.sheets({ version: 'v4', auth: authJwt });
  return await sheets.spreadsheets.values.get({
    spreadsheetId: sheet.id,
    range: sheet.tab
  });
}
