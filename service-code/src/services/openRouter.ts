// import fetch from 'node-fetch';
import { z } from 'zod';

const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';

export class OpenRouterClient {
  private apiKey = process.env.OPENROUTER_API_KEY!;

  async enrich(prompt: string) {
    const body = {
      model: 'openai/gpt-4o-mini', // or any model you prefer
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    };

    const res = await fetch(openRouterUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message ?? 'OpenRouter error');

    return json.choices[0].message.content;
  }
}