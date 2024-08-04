// testOpenAI.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: 'sk-proj-3T5L3OGNelm8AOZK9I5ST3BlbkFJY4NIqkuWYq1vUvhs0qtk',
});

const openai = new OpenAIApi(configuration);

async function testOpenAI() {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 10,
    });
    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error('OpenAI API error:', error.response ? error.response.data : error.message);
  }
}

testOpenAI();
