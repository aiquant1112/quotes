import { OpenAI } from 'openai';
import { generateQuote } from '../openai';

jest.mock('openai', () => ({
  OpenAI: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  })),
}));

describe('OpenAI integration', () => {
  let mockOpenAI: jest.Mocked<OpenAI>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOpenAI = new OpenAI() as jest.Mocked<OpenAI>;
  });

  it('generates quote successfully', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Generated quote',
          },
        },
      ],
    };

    mockOpenAI.chat.completions.create.mockResolvedValueOnce(mockResponse);

    const result = await generateQuote('inspiration', 'motivational');

    expect(mockOpenAI.chat.completions.create).toHaveBeenCalledWith({
      model: 'gpt-4',
      messages: expect.arrayContaining([
        expect.objectContaining({
          role: 'system',
          content: expect.stringContaining('You are a quote generator'),
        }),
        expect.objectContaining({
          role: 'user',
          content: expect.stringContaining('inspiration'),
        }),
      ]),
    });

    expect(result).toBe('Generated quote');
  });

  it('handles API error', async () => {
    const mockError = new Error('API error');
    mockOpenAI.chat.completions.create.mockRejectedValueOnce(mockError);

    await expect(generateQuote('inspiration', 'motivational')).rejects.toThrow('API error');
  });

  it('handles empty response', async () => {
    const mockResponse = {
      choices: [],
    };

    mockOpenAI.chat.completions.create.mockResolvedValueOnce(mockResponse);

    await expect(generateQuote('inspiration', 'motivational')).rejects.toThrow('No quote generated');
  });
}); 