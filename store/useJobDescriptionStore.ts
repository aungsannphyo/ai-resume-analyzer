import { create } from "zustand";
import type { JobDescriptionInput } from "@/types/job-description";

const initialInput: JobDescriptionInput = {
  jobTitle: "",
  experienceLevel: "",
  employmentType: "",
  workMode: "",
  industry: "",
  companySize: "",
  responsibilities: [],
  requiredSkills: [],
  niceToHaveSkills: [],
  techStack: {
    backend: [],
    frontend: [],
    database: [],
    devops: [],
  },
  domain: "",
  reportingTo: "",
  teamSize: "",
  methodology: "",
  softSkills: [],
  location: "",
  salaryRange: "",
  tone: "professional",
};

export type JobDescriptionListField =
  | "responsibilities"
  | "requiredSkills"
  | "niceToHaveSkills"
  | "softSkills";

interface JobDescriptionState {
  input: JobDescriptionInput;
  generatedDescription: string | null;
  showResults: boolean;
  error: string | null;
  setInput: (input: JobDescriptionInput) => void;
  updateInput: (updates: Partial<JobDescriptionInput>) => void;
  updateListField: (field: JobDescriptionListField, values: string[]) => void;
  updateTechStack: (updates: Partial<JobDescriptionInput["techStack"]>) => void;
  setGeneratedDescription: (value: string | null) => void;
  setShowResults: (show: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useJobDescriptionStore = create<JobDescriptionState>((set) => ({
  input: initialInput,
  generatedDescription: null,
  showResults: false,
  error: null,
  setInput: (input) => set({ input }),
  updateInput: (updates) =>
    set((state) => ({
      input: {
        ...state.input,
        ...updates,
      },
    })),
  updateListField: (field, values) =>
    set((state) => ({
      input: {
        ...state.input,
        [field]: values,
      },
    })),
  updateTechStack: (updates) =>
    set((state) => ({
      input: {
        ...state.input,
        techStack: {
          ...state.input.techStack,
          ...updates,
        },
      },
    })),
  setGeneratedDescription: (value) => set({ generatedDescription: value }),
  setShowResults: (show) => set({ showResults: show }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      input: initialInput,
      generatedDescription: null,
      showResults: false,
      error: null,
    }),
}));
