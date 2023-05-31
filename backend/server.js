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
    // const userMessage = req.body.audio;

    const userMessage = "我今天很忙。我早上起床后，我没有吃饭就出门了。在路上，我遇到了我朋友。我和她聊天，但是我说话很不流利。她告诉我，我需要练习更多的中文。然后，我买了许多东西去了商店，但是我忘了带钱包。店员很生气，他不给我买东西。我感到非常尴尬"
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        //maybe shove the requirement into the prompt. Search online
        prompt: 
        "假设你是个华文老师。请检查以下段落的语法和用词是否正确，并根据情况提出修改意见或将正确的段落写出来:\n" 
        + userMessage 
        + "\n 如果段落有语法和用词错误，请提供正确的段落。如果该句子无误，请提供原本的句子。忽略句号。",
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,

        // THIS IS A WRONG PARAMETER U CANNOT SET IT LIKE THIS
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
  
