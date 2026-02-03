# AI-Powered Resume Analyzer

An intelligent resume analysis tool powered by Hugging Face AI that evaluates Project Manager candidates with comprehensive competency breakdowns and scoring.

## Features

- 🤖 **AI-Powered Analysis** - Uses Hugging Face's Mistral-7B model for intelligent resume evaluation
- 📊 **Comprehensive Scoring** - Overall score (0-100) with detailed competency breakdown
- 🎯 **7 Key Competencies** - Evaluates Planning, Agile/Scrum, Stakeholder Management, Risk Management, Budget Management, Leadership, and PM Tools
- 💪 **Strengths & Gaps** - Identifies top 3 strengths and potential areas for improvement
- 📥 **Export Reports** - Download analysis as Markdown files
- 🎨 **Beautiful UI** - Modern dark theme with gradients and smooth animations
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Hugging Face account (free)

### Installation

1. **Get your Hugging Face API Token**
   - Visit [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - Create a new token (read access is sufficient)
   - Copy the token

2. **Configure Environment Variables**
   - Open `.env.local` in the project root
   - Replace `your_huggingface_token_here` with your actual token:

   ```
   HUGGINGFACE_API_TOKEN=hf_your_actual_token_here
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Open the Application**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The AI Resume Analyzer is ready to use!

## How to Use

1. **Enter Keywords (Optional)**
   - Add specific keywords you want the AI to focus on
   - Example: "Agile, Scrum, Budget Management, Stakeholder Communication"
   - Separate multiple keywords with commas

2. **Paste Resume Text**
   - Copy and paste the candidate's resume into the text area
   - Include work experience, skills, certifications, and achievements

3. **Analyze**
   - Click "Analyze Resume" button
   - Wait for the AI to process (usually 5-15 seconds)

4. **Review Results**
   - Overall PM Score (0-100)
   - Detailed assessment
   - Competency breakdown with ratings
   - Key strengths
   - Potential gaps with interview questions

5. **Export (Optional)**
   - Click "Export Report" to download as Markdown
   - Use for documentation or sharing with team

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **AI**: Hugging Face Inference API (Mistral-7B-Instruct)
- **Styling**: Custom CSS with modern design system
- **API**: Next.js API Routes

## Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # AI analysis API endpoint
│   ├── globals.css               # Global styles & design system
│   ├── resume-analyzer.css       # Component-specific styles
│   ├── page.tsx                  # Main resume analyzer component
│   └── layout.tsx                # Root layout
├── types/
│   └── analysis.ts               # TypeScript type definitions
├── .env.local                    # Environment variables (API token)
└── package.json                  # Dependencies
```

## API Endpoint

### POST `/api/analyze`

Analyzes a resume using AI.

**Request Body:**

```json
{
  "resumeText": "string (required)",
  "keywords": "string (optional)"
}
```

**Response:**

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

- **API Rate Limits**: Hugging Face free tier has rate limits. For production use, consider upgrading.
- **Model Selection**: Currently uses Mistral-7B-Instruct for reliability. You can modify the model in `app/api/analyze/route.ts`.
- **Response Time**: AI analysis typically takes 5-15 seconds depending on resume length and API load.
- **Fallback**: If AI parsing fails, the system provides a basic analysis to ensure functionality.

## Troubleshooting

**"Hugging Face API token not configured" error:**

- Make sure you've created `.env.local` file
- Verify the token is correctly set
- Restart the development server after adding the token

**Analysis takes too long:**

- Hugging Face free tier can be slow during peak times
- Consider using a paid tier for faster responses
- Check your internet connection

**Styling issues:**

- Clear browser cache
- Make sure both `globals.css` and `resume-analyzer.css` are loaded
- Check browser console for errors

## License

This project is for educational and demonstration purposes.

## Credits

- UI/UX inspired by modern design principles
- AI powered by Hugging Face
- Built with Next.js and React
