import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

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

    // TODO: Add your email storage logic here
    // This could be:
    // - Saving to a database
    // - Adding to a mailing list service
    // - Sending to a spreadsheet
    
    // For now, just return success
    return res.status(200).json({ message: 'Successfully joined waitlist' })
    
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
} 