// pages/api/classifyImage.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
    return;
  }

  const { image } = req.body; 

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
  };


  const payload = {
    "model": "gpt-4o-mini",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What’s in this image?"
          },
          {
            "type": "image",
            "data": {
              "url": `https://imgur.com/a/Tnjb5tP`
            }
          }
        ]
      }
    ],
    "max_tokens": 300
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(`OpenAI API error: ${response.statusText} - Details: ${JSON.stringify(errorBody)}`);
    }

    const data = await response.json();
    const classifiedItem = data.choices[0].message.content.trim();
    res.status(200).json({ classifiedItem });
  } catch (error) {
    console.error('Failed to classify image:', error);
    res.status(500).json({ error: 'Failed to classify image', details: error.message });
  }
}
