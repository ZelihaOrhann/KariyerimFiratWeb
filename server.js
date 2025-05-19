require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require("openai");
const fetch = require('node-fetch');
const pdfParse = require('pdf-parse');


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// OpenAI API anahtarını .env dosyasından al
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// PDF dosyasını indirip metne çeviren fonksiyon
async function fetchAndExtractPdfText(pdfUrl) {
  const response = await fetch(pdfUrl);
  const buffer = await response.buffer();
  const data = await pdfParse(buffer);
  return data.text;
}

// CV Analiz endpointi
app.post('/api/cv-analyze', async (req, res) => {
  try {
    const { cvUrl } = req.body;
    if (!cvUrl) return res.status(400).json({ error: 'cvUrl gerekli' });

    // 1. PDF'den metni çıkar
    const cvText = await fetchAndExtractPdfText(cvUrl);

    // 2. OpenAI ile analiz et
    const prompt = `
Aşağıdaki CV metnini analiz et:
- Hangi yetenekler ön planda?
- Hangi iş tanımları bu kişi için uygundur?
- Kısa bir özet ve öneriler hazırla.
CV:
${cvText}
    `;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
    });
    const aiText = completion.choices[0].message.content;
    res.json({ result: aiText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI analiz hatası', detail: err.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`AI backend server running on http://localhost:${PORT}`);
}); 