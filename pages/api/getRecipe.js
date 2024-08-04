// pages/api/getRecipe.js

import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correctly set in your environment variables
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items } = req.body;
    console.log('Items received:', items);

    try {
      const prompt = `Here are the items in my pantry: ${items}. Can you suggest a recipe using these items in less than 100 words?`;

      // Use createChatCompletion for chat models
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Ensure you have access to this model
        messages: [
          { role: "system", content: "You are a helpful assistant for providing recipes." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150, // Adjust based on your requirements
      });

      const recipe = response.choices[0].message.content.trim();
      res.status(200).json({ recipe });
    } catch (error) {
      console.error('Error fetching recipe from OpenAI:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error fetching recipe' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
