import { GoogleSpreadsheet } from 'google-spreadsheet';
import { NextApiRequest, NextApiResponse } from 'next';

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({ Email: email, Timestamp: new Date().toISOString() });

    res.status(200).json({ message: 'Email added to waitlist successfully' });
  } catch (error) {
    console.error('Error adding email to waitlist:', error);
    res.status(500).json({ message: 'Error adding email to waitlist' });
  }
} 