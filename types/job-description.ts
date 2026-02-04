// Re-export from schema for consistency
export type JobDescriptionInput =
  import("@/schemas/job-description").JobDescriptionInput;

export interface JobDescriptionResult {
  jobDescription: string;
}

export interface JobDescriptionResponse {
  success: boolean;
  data?: JobDescriptionResult;
  error?: string;
  cached?: boolean; // Add cache indicator
}
