import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextApiRequest, NextApiResponse } from 'next';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Log environment variables (without sensitive data)
    console.log('Checking environment variables...');
    console.log('GOOGLE_SPREADSHEET_ID exists:', !!process.env.GOOGLE_SPREADSHEET_ID);
    console.log('GOOGLE_CLIENT_EMAIL exists:', !!process.env.GOOGLE_CLIENT_EMAIL);
    console.log('GOOGLE_PRIVATE_KEY exists:', !!process.env.GOOGLE_PRIVATE_KEY);

    const { email } = req.body;
    console.log('Received email:', email);

    if (!email) {
      console.log('Email missing in request');
      return res.status(400).json({ message: 'Email is required' });
    }

    // Create JWT client
    console.log('Creating JWT client...');
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: SCOPES,
    });

    // Initialize the sheet
    console.log('Initializing spreadsheet...');
    try {
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID!, serviceAccountAuth);
      console.log('Loading spreadsheet info...');
      await doc.loadInfo();
      console.log('Spreadsheet loaded:', doc.title);

      // Get the first sheet
      const sheet = doc.sheetsByIndex[0];
      console.log('Sheet accessed:', sheet.title);

      // Append the row
      console.log('Appending row...');
      await sheet.addRow({
        Email: email,
        Timestamp: new Date().toISOString(),
      });
      console.log('Row added successfully');

      return res.status(200).json({ message: 'Email submitted successfully' });
    } catch (sheetError) {
      console.error('Spreadsheet error:', sheetError);
      return res.status(500).json({ 
        message: 'Error accessing spreadsheet',
        error: sheetError instanceof Error ? sheetError.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Detailed error:', error);
    return res.status(500).json({ 
      message: 'Error submitting email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 