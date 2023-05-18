const cors = require('cors'); 
const express = require('express'); 

const app = express(); 
const port = 3001; 
const { Configuration, OpenAIApi } = require('openai');

app.use(cors());
app.use(express.json());

const api_key = "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"
const configuration = new Configuration({
  apiKey: api_key
});
const openai = new OpenAIApi(configuration);
 
app.get('/', (req, res) => { 
  res.send('Hello, world!'); 
}); 

app.post('/api/process-audio', async (req, res) => {
    const userMessage = req.body.audio;
    const conversationContext = req.body.conversation || [];

    const updatedContext = [
      ...conversationContext,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: '' }, // Placeholder for AI response
      { role: 'system', content: 'Requirements: Speak in chinese', language: 'zh' }
    ];

    // Construct the message input for OpenAI API
    const messages = updatedContext.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    // Process the audio and make the OpenAI API call
    console.log(messages);

    //currently messages aint working as a prompt
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: userMessage,
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        // target_language: 'zh'
      });
  
      const result = response.data.choices[0].text.trim();
      console.log(result);
      // Send the result back to the frontend
      res.json({
        result: result
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'An error occurred'
      });
    }
});

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`); 
}); 
  
  