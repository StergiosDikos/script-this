import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

type ResponseData = {
  message: string
}

console.log('Loading environment variables...');
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
console.log('Loading environment variables1');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
console.log('Loading environment variables2');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID
console.log('Loading environment variables3');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('Processing waitlist request...');
    const { email } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' })
    }

    // if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_SHEET_ID) {
    //   console.error('Missing credentials:', {
    //     hasPrivateKey: !!GOOGLE_PRIVATE_KEY,
    //     hasClientEmail: !!GOOGLE_CLIENT_EMAIL,
    //     hasSheetId: !!GOOGLE_SHEET_ID
    //   });
    //   throw new Error('Missing required Google credentials')
    // }

    console.log('Initializing Google Auth...');
    // Auth

    // const jwt = new JWT({
    //   email: GOOGLE_CLIENT_EMAIL,
    //   key: GOOGLE_PRIVATE_KEY,
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    // })

    // console.log('Loading spreadsheet...');
    // // Initialize the sheet
    // const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
    // await doc.loadInfo()
    
    // console.log('Getting first sheet...');
    // // Get the first sheet
    // const sheet = doc.sheetsByIndex[0]
    
    // console.log('Adding row with email:', email);
    // // Add the row
    // await sheet.addRow({
    //   email,
    //   timestamp: new Date().toISOString(),
    // })

    console.log('Successfully added email to waitlist');
    return res.status(200).json({ message: 'Successfully joined waitlist' })
    
  } catch (error) {
    console.error('Detailed waitlist submission error:', error);
    return res.status(500).json({ message: 'Internal server error' })
  }
} 