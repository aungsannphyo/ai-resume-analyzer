import { useCallback } from "react";
import {
  validateJobDescriptionInput,
  validateJobDescriptionField,
} from "@/lib/validation";
import type { JobDescriptionInput } from "@/types/job-description";

export const useJobDescriptionValidation = () => {
  const validateInput = useCallback((input: Partial<JobDescriptionInput>) => {
    return validateJobDescriptionInput(input);
  }, []);

  const validateField = useCallback(
    (field: keyof JobDescriptionInput, value: any): string | null => {
      return validateJobDescriptionField(field, value);
    },
    [],
  );

  return { validateInput, validateField };
};
