/**
 * Anthropic API wrapper for FilterFlow
 * Handles all calls to claude-opus-4-5
 */

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-opus-4-5';

/**
 * Call Claude with a system prompt + user message + optional conversation history
 * @param {string} systemPrompt
 * @param {string} userMessage
 * @param {Array} history - [{role:'user'|'assistant', content:string}]
 * @param {number} maxTokens
 * @returns {Promise<string>} the text content of the response
 */
export async function callClaude(systemPrompt, userMessage, history = [], maxTokens = 1024) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('MISSING_KEY');
  }

  const messages = [
    ...history,
    { role: 'user', content: userMessage }
  ];

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API_ERROR: ${response.status} ${err}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text ?? '';
  return content;
}

/**
 * Parse JSON from Claude response, handling potential markdown wrapping
 */
export function parseClaudeJSON(text) {
  // Strip markdown code fences if present
  const cleaned = text.replace(/^```(?:json)?\n?/gm, '').replace(/\n?```$/gm, '').trim();
  return JSON.parse(cleaned);
}
