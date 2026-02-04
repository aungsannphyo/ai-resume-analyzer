import type { JobDescriptionInput } from "@/types/job-description";

export const validateJobDescriptionInput = (
  input: Partial<JobDescriptionInput>,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!input.jobTitle?.trim()) {
    errors.push("Job title is required");
  }

  if (!input.experienceLevel) {
    errors.push("Experience level is required");
  }

  if (!input.employmentType) {
    errors.push("Employment type is required");
  }

  if (!input.workMode) {
    errors.push("Work mode is required");
  }

  if (!input.industry) {
    errors.push("Industry is required");
  }

  if (!input.companySize) {
    errors.push("Company size is required");
  }

  if (!input.responsibilities || input.responsibilities.length === 0) {
    errors.push("At least one responsibility is required");
  }

  if (!input.requiredSkills || input.requiredSkills.length === 0) {
    errors.push("At least one required skill is needed");
  }

  if (!input.niceToHaveSkills || input.niceToHaveSkills.length === 0) {
    errors.push("At least one nice-to-have skill is needed");
  }

  return { isValid: errors.length === 0, errors };
};

export const validateJobDescriptionField = (
  field: keyof JobDescriptionInput,
  value: any,
): string | null => {
  switch (field) {
    case "jobTitle":
      if (!value?.trim()) return "Job title is required";
      if (value.length > 100) return "Job title too long";
      break;
    case "experienceLevel":
      if (!value) return "Experience level is required";
      break;
    case "employmentType":
      if (!value) return "Employment type is required";
      break;
    case "workMode":
      if (!value) return "Work mode is required";
      break;
    case "industry":
      if (!value) return "Industry is required";
      break;
    case "companySize":
      if (!value) return "Company size is required";
      break;
    case "responsibilities":
      if (!value || value.length === 0)
        return "At least one responsibility is required";
      if (value.length > 10) return "Too many responsibilities";
      break;
    case "requiredSkills":
      if (!value || value.length === 0)
        return "At least one required skill is needed";
      if (value.length > 15) return "Too many required skills";
      break;
    case "niceToHaveSkills":
      if (!value || value.length === 0)
        return "At least one nice-to-have skill is needed";
      if (value.length > 10) return "Too many nice-to-have skills";
      break;
    default:
      return null;
  }
  return null;
};
