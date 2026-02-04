import type { JobDescriptionInput } from "@/types/job-description";
import type { JobDescriptionListField } from "@/store/useJobDescriptionStore";
import ErrorBanner from "@/components/shared/error-banner";
import TextInput from "./input-section/text-input";
import SelectInput from "./input-section/select-input";
import TagInput from "./input-section/tag-input";
import GenerateButton from "./input-section/generate-button";
import { memo } from "react";

interface InputSectionProps {
  input: JobDescriptionInput;
  error: string | null;
  onUpdate: (updates: Partial<JobDescriptionInput>) => void;
  onUpdateList: (field: JobDescriptionListField, values: string[]) => void;
  onUpdateTechStack: (
    updates: Partial<JobDescriptionInput["techStack"]>,
  ) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const experienceOptions = [
  { label: "Intern", value: "Intern" },
  { label: "Junior", value: "Junior" },
  { label: "Mid", value: "Mid" },
  { label: "Senior", value: "Senior" },
];

const employmentTypeOptions = [
  { label: "Full-time", value: "Full-time" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
];

const workModeOptions = [
  { label: "Onsite", value: "Onsite" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
];

const companySizeOptions = [
  { label: "Startup", value: "Startup" },
  { label: "SME", value: "SME" },
  { label: "Enterprise", value: "Enterprise" },
];

const toneOptions = [
  { label: "Professional", value: "professional" },
  { label: "Startup", value: "startup" },
  { label: "Enterprise", value: "enterprise" },
];

const InputSection = memo(
  ({
    input,
    error,
    onUpdate,
    onUpdateList,
    onUpdateTechStack,
    onGenerate,
    isGenerating,
  }: InputSectionProps) => {
    return (
      <section className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/50 mb-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Job Description Generator
          </h2>
          <p className="text-slate-500 font-medium">
            Fill in the structured details and generate a professional job
            description tailored to your role.
          </p>
        </div>

        {error && <ErrorBanner message={error} className="mb-6" />}

        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Role Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <TextInput
                id="jobTitle"
                label="Job Title"
                value={input.jobTitle}
                placeholder="e.g. Senior Frontend Engineer"
                onChange={(value) => onUpdate({ jobTitle: value })}
                required
                error={
                  error && !input.jobTitle.trim()
                    ? "Job title is required"
                    : undefined
                }
              />
              <SelectInput
                id="experienceLevel"
                label="Experience Level"
                value={input.experienceLevel}
                options={experienceOptions}
                onChange={(value) =>
                  onUpdate({
                    experienceLevel: value as
                      | "Intern"
                      | "Junior"
                      | "Mid"
                      | "Senior",
                  })
                }
                required
                error={
                  error && !input.experienceLevel
                    ? "Experience level is required"
                    : undefined
                }
              />
              <SelectInput
                id="employmentType"
                label="Employment Type"
                value={input.employmentType}
                options={employmentTypeOptions}
                onChange={(value) =>
                  onUpdate({
                    employmentType: value as
                      | "Full-time"
                      | "Contract"
                      | "Internship",
                  })
                }
                required
                error={
                  error && !input.employmentType
                    ? "Employment type is required"
                    : undefined
                }
              />
              <SelectInput
                id="workMode"
                label="Work Mode"
                value={input.workMode}
                options={workModeOptions}
                onChange={(value) =>
                  onUpdate({
                    workMode: value as "Onsite" | "Hybrid" | "Remote",
                  })
                }
                required
                error={
                  error && !input.workMode ? "Work mode is required" : undefined
                }
              />
              <TextInput
                id="location"
                label="Location"
                value={input.location}
                placeholder="e.g. Yangon, MM"
                onChange={(value) => onUpdate({ location: value })}
              />
              <TextInput
                id="salaryRange"
                label="Salary Range"
                value={input.salaryRange}
                placeholder="e.g. 1200 - 1800 USD"
                onChange={(value) => onUpdate({ salaryRange: value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Company Context
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <TextInput
                id="industry"
                label="Industry"
                value={input.industry}
                placeholder="e.g. SaaS, Fintech"
                onChange={(value) => onUpdate({ industry: value })}
                required
                error={
                  error && !input.industry ? "Industry is required" : undefined
                }
              />
              <SelectInput
                id="companySize"
                label="Company Size"
                value={input.companySize}
                options={companySizeOptions}
                onChange={(value) =>
                  onUpdate({
                    companySize: value as "Startup" | "SME" | "Enterprise",
                  })
                }
                required
                error={
                  error && !input.companySize
                    ? "Company size is required"
                    : undefined
                }
              />
              <TextInput
                id="domain"
                label="Domain"
                value={input.domain}
                placeholder="e.g. ERP, Healthcare"
                onChange={(value) => onUpdate({ domain: value })}
              />
              <TextInput
                id="reportingTo"
                label="Reporting To"
                value={input.reportingTo}
                placeholder="e.g. CTO, Product Lead"
                onChange={(value) => onUpdate({ reportingTo: value })}
              />
              <TextInput
                id="teamSize"
                label="Team Size"
                value={input.teamSize}
                placeholder="e.g. 6 engineers"
                onChange={(value) => onUpdate({ teamSize: value })}
              />
              <TextInput
                id="methodology"
                label="Methodology"
                value={input.methodology}
                placeholder="e.g. Agile, Scrum"
                onChange={(value) => onUpdate({ methodology: value })}
              />
              <SelectInput
                id="tone"
                label="Tone"
                value={input.tone}
                options={toneOptions}
                onChange={(value) =>
                  onUpdate({
                    tone: value as "professional" | "startup" | "enterprise",
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Responsibilities & Skills
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <TagInput
                label="Key Responsibilities"
                values={input.responsibilities}
                placeholder="Add a responsibility"
                helperText="Press Enter to add."
                onChange={(values) => onUpdateList("responsibilities", values)}
                required
                error={
                  error && input.responsibilities.length === 0
                    ? "At least one responsibility is required"
                    : undefined
                }
              />
              <TagInput
                label="Required Skills"
                values={input.requiredSkills}
                placeholder="Add a required skill"
                helperText="Press Enter to add."
                onChange={(values) => onUpdateList("requiredSkills", values)}
                required
                error={
                  error && input.requiredSkills.length === 0
                    ? "At least one required skill is needed"
                    : undefined
                }
              />
              <TagInput
                label="Nice-to-have Skills"
                values={input.niceToHaveSkills}
                placeholder="Add a nice-to-have skill"
                helperText="Press Enter to add."
                onChange={(values) => onUpdateList("niceToHaveSkills", values)}
                required
                error={
                  error && input.niceToHaveSkills.length === 0
                    ? "At least one nice-to-have skill is needed"
                    : undefined
                }
              />
              <TagInput
                label="Soft Skills"
                values={input.softSkills}
                placeholder="Add a soft skill"
                helperText="Press Enter to add."
                onChange={(values) => onUpdateList("softSkills", values)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Tech Stack</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <TagInput
                label="Backend"
                values={input.techStack.backend}
                placeholder="Add backend tech"
                helperText="Press Enter to add."
                onChange={(values) =>
                  onUpdateTechStack({
                    backend: values,
                  })
                }
              />
              <TagInput
                label="Frontend"
                values={input.techStack.frontend}
                placeholder="Add frontend tech"
                helperText="Press Enter to add."
                onChange={(values) =>
                  onUpdateTechStack({
                    frontend: values,
                  })
                }
              />
              <TagInput
                label="Database"
                values={input.techStack.database}
                placeholder="Add database tech"
                helperText="Press Enter to add."
                onChange={(values) =>
                  onUpdateTechStack({
                    database: values,
                  })
                }
              />
              <TagInput
                label="DevOps"
                values={input.techStack.devops}
                placeholder="Add DevOps tech"
                helperText="Press Enter to add."
                onChange={(values) =>
                  onUpdateTechStack({
                    devops: values,
                  })
                }
              />
            </div>
          </div>
        </div>

        <GenerateButton isGenerating={isGenerating} onClick={onGenerate} />
      </section>
    );
  },
);

InputSection.displayName = "InputSection";

export default InputSection;
