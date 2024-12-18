import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Request body:', req.body);

      const videoUrl = req.body.video_url;
      const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11}).*/);

      if (!videoIdMatch) 
      {
        res.status(400).json({ error: 'Invalid video URL format' });
        return;
      }
      
      const response = await axios.post('http://34.64.197.103:5000/stock', req.body, {
        timeout: 300000
      });

      console.log('Response data:', response.data);
      res.status(200).json(response.data);
    } 
    catch (error: any) 
    {
      console.error('Error fetching data:', error);

      if (error.code === 'ECONNABORTED') 
      {
        console.error('Request timed out');
        res.status(504).json({ error: 'Request timed out' });
      } 
      else if (error.response) 
      {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);

        if (error.response.status === 504) 
        {
          res.status(504).json({ error: 'Gateway Timeout' });
        } 
        else 
        {
          res.status(error.response.status).json(error.response.data);
        }
      } 
      else 
      {
        res.status(500).json({ error: 'An error occurred while fetching data' });
      }
    }
  } 
  else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
