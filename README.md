
  # VerveWell Brand X Marketing Dashboard

## Local Development (Client + AI Chat Backend)

Prereqs: Node >= 18 and npm.

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a `.env` in the project root and set:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   PORT=3001
   ```

3. Start client and server together

   ```bash
   npm run dev:full
   ```

   - Client: `http://localhost:3000`
   - Server: `http://localhost:3001`

4. Chatbot
   - The Marketing Copilot widget calls `/api/chat` (proxied to `http://localhost:3001`).
   - Uses Google Gemini (with timeouts); otherwise local CSV answers
   - Integrates with your CSV marketing dataset for data-driven answers
   - If the backend is not available, it falls back to local heuristic replies.

## Data Integration

The chatbot now uses your uploaded CSV dataset (`data for chatbot+ dashboard(Sheet2).csv`) to provide:
- Campaign performance insights
- CTR, RoAS, and conversion data
- Agent automation status
- Regional and channel performance
- Real-time data summaries

## API Endpoints

- `GET /api/health` - Server health and data record count
- `POST /api/chat` - AI chat with marketing data context
- `GET /api/data/summary` - Marketing data overview and averages

## Getting Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `GEMINI_API_KEY=your_key_here`

The chatbot will now answer questions based on your actual marketing data!
  