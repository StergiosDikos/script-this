import type { NextApiRequest, NextApiResponse } from 'next'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

type ResponseData = {
  message: string
}

// These should be in your .env.local file
console.log('in join waitlist 1');
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID
console.log('GOOGLE_PRIVATE_KEY'+GOOGLE_PRIVATE_KEY);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    console.log('in join waitlist post request');
    const { email } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' })
    }

    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_SHEET_ID) {
      throw new Error('Missing required Google credentials')
    }

    // Auth
    const jwt = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    // Initialize the sheet
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
    await doc.loadInfo()
    
    // Get the first sheet
    const sheet = doc.sheetsByIndex[0]
    
    // Add the row
    await sheet.addRow({
      email,
      timestamp: new Date().toISOString(),
    })

    return res.status(200).json({ message: 'Successfully joined waitlist' })
    
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
} 