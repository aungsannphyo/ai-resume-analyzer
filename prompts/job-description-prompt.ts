import type { JobDescriptionInput } from "@/types/job-description";

const formatList = (items: string[]) => {
  const cleaned = items.map((item) => item.trim()).filter(Boolean);
  return cleaned.length > 0
    ? cleaned.map((item) => `- ${item}`).join("\n")
    : "Not specified";
};

const formatValue = (value: string) =>
  value && value.trim().length > 0 ? value.trim() : "Not specified";

export const getJobDescriptionPrompt = (input: JobDescriptionInput): string => {
  const hasTechStack = Object.values(input.techStack).some(
    (arr) => arr.length > 0,
  );
  const hasSoftSkills = input.softSkills.length > 0;
  const hasOptionalFields =
    input.domain || input.reportingTo || input.teamSize || input.methodology;

  let prompt = `Generate a professional, realistic job description for a ${input.jobTitle} position.

**Basic Information:**
**Job Title:** ${formatValue(input.jobTitle)}
**Experience Level:** ${formatValue(input.experienceLevel)}
**Employment Type:** ${formatValue(input.employmentType)}
**Work Mode:** ${formatValue(input.workMode)}

**Company Context:**
**Industry:** ${formatValue(input.industry)}
**Company Size:** ${formatValue(input.companySize)}`;

  // Only include sections with meaningful content
  if (input.responsibilities.length > 0) {
    prompt += `\n\n**Key Responsibilities:**\n${formatList(input.responsibilities)}`;
  }

  if (input.requiredSkills.length > 0) {
    prompt += `\n\n**Required Skills & Qualifications:**\n${formatList(input.requiredSkills)}`;
  }

  if (input.niceToHaveSkills.length > 0) {
    prompt += `\n\n**Preferred Qualifications:**\n${formatList(input.niceToHaveSkills)}`;
  }

  // Tech Stack section only if there are technologies
  if (hasTechStack) {
    prompt += `\n\n**Technology Stack:**`;
    if (input.techStack.backend.length > 0) {
      prompt += `\n**Backend:**\n${formatList(input.techStack.backend)}`;
    }
    if (input.techStack.frontend.length > 0) {
      prompt += `\n**Frontend:**\n${formatList(input.techStack.frontend)}`;
    }
    if (input.techStack.database.length > 0) {
      prompt += `\n**Database:**\n${formatList(input.techStack.database)}`;
    }
    if (input.techStack.devops.length > 0) {
      prompt += `\n**DevOps:**\n${formatList(input.techStack.devops)}`;
    }
  }

  // Optional fields section
  if (hasOptionalFields) {
    prompt += `\n\n**Additional Details:**`;
    if (input.domain) {
      prompt += `\n**Domain:** ${formatValue(input.domain)}`;
    }
    if (input.reportingTo) {
      prompt += `\n**Reporting To:** ${formatValue(input.reportingTo)}`;
    }
    if (input.teamSize) {
      prompt += `\n**Team Size:** ${formatValue(input.teamSize)}`;
    }
    if (input.methodology) {
      prompt += `\n**Methodology:** ${formatValue(input.methodology)}`;
    }
  }

  // Soft skills only if provided
  if (hasSoftSkills) {
    prompt += `\n\n**Soft Skills:**\n${formatList(input.softSkills)}`;
  }

  // Compensation and location
  if (input.location || input.salaryRange) {
    prompt += `\n\n**Compensation & Location:**`;
    if (input.location) {
      prompt += `\n**Location:** ${formatValue(input.location)}`;
    }
    if (input.salaryRange) {
      prompt += `\n**Salary Range:** ${formatValue(input.salaryRange)}`;
    }
  }

  prompt += `\n\n**Instructions:**
Generate a complete, professional job description that:
1. Uses clear, inclusive language and avoids corporate jargon
2. Includes realistic day-to-day responsibilities and deliverables
3. Specifies actual requirements (not wish-list items)
4. Reflects the ${input.tone} communication style
5. Is structured with clear headings and bullet points
6. Sounds like a real job posting from a ${input.companySize.toLowerCase()} company in the ${input.industry} industry

Make it compelling and realistic, not a generic template. Focus on what the candidate will actually do and learn.`;

  return prompt;
};
