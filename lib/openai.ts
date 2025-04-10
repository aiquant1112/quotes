import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from '@env';
import { Category, Tone } from '../types';

if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateQuote = async (category: string, tone: string): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a quote generator. Generate unique, inspirational quotes.',
        },
        {
          role: 'user',
          content: `Generate a ${tone} quote about ${category}.`,
        },
      ],
    });

    const quote = response.choices[0]?.message?.content;
    if (!quote) {
      throw new Error('No quote generated');
    }

    return quote;
  } catch (error) {
    console.error('Error generating quote:', error);
    throw error;
  }
};

// Test OpenAI connection
export const testOpenAIConnection = async () => {
  try {
    await generateQuote('test', 'motivational');
    console.log('OpenAI connection successful');
    return true;
  } catch (error) {
    console.error('OpenAI connection failed:', error);
    return false;
  }
};

export async function generateQuoteForAuthor(
  category: Category,
  tone: Tone,
  author: string
): Promise<{ content: string; author: string }> {
  try {
    const prompt = `Generate a ${tone} quote about ${category} in the style of ${author}. 
    The quote should be inspiring and memorable. 
    Format the response as JSON with "content" and "author" fields.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a quote generator. Generate unique, inspiring quotes in the requested style."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      content: response.content,
      author: response.author || author,
    };
  } catch (error) {
    console.error('Error generating quote:', error);
    throw new Error('Failed to generate quote. Please try again.');
  }
} 