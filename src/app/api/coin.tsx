import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://34.22.90.37:5000/stock', req.body, {
        timeout: 120000
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}