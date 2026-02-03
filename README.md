# AI-Powered Resume Analyzer

An intelligent resume analysis tool powered by Groq Llama 3 that evaluates candidates using job-description-aware, domain-specific scoring.

## Features

- AI-powered analysis using Groq Llama 3
- Job description + resume alignment
- Domain-specific competency breakdowns and scoring
- PDF resume upload with client-side text extraction
- Exportable PDF report
- Modern responsive UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Groq API key

### Installation

1. Configure environment variables
   - Open `.env.local` in the project root
   - Add the following values:

   ```
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL=llama-3.1-8b-instant
   ```

   `GROQ_MODEL` is optional. If omitted, the app uses `llama-3.1-8b-instant` by default.

2. Start the development server

   ```bash
   npm run dev
   ```

3. Open the application
   - Navigate to `http://localhost:3000`

## How to Use

1. Select a target domain.
2. Paste the job description.
3. Upload a resume PDF.
4. Click "Analyze Resume" and review results.
5. Export the report as PDF if needed.

## Technology Stack

- Frontend: Next.js 16, React 19, TypeScript
- AI: Groq API (Llama 3)
- State: Zustand, React Query
- Styling: Tailwind CSS
- API: Next.js API Routes

## Project Structure

```
my-app/
|-- app/
|   |-- api/analyze/route.ts
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|-- hooks/
|-- prompts/
|-- provider/
|-- services/
|-- store/
|-- types/
|-- utils/
|-- public/
|-- .env.local
`-- package.json
```

## API Endpoint

### POST `/api/analyze`

Request body:

```json
{
  "jdText": "string (required)",
  "resumeText": "string (required)",
  "domain": "string (required)"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "overallScore": 75,
    "assessment": "...",
    "competencies": [...],
    "strengths": [...],
    "gaps": [...]
  }
}
```

## Notes

- API limits and latency depend on your Groq plan and model.
- If AI parsing fails, the server returns a structured error.

## Troubleshooting

**"GROQ_API_KEY is not defined" error:**

- Ensure `.env.local` exists and contains `GROQ_API_KEY`.
- Restart the development server after updating the file.

**Analysis takes too long:**

- Try a smaller resume or a faster model.

**Styling issues:**

- Clear browser cache.
- Ensure `app/globals.css` is loaded.

## License

This project is for educational and demonstration purposes.

## Credits

- UI/UX inspired by modern design principles
- AI powered by Groq
- Built with Next.js and React
