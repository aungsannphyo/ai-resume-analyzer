import { z } from "zod";

export const JobDescriptionSchema = z.object({
  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Job title too long"),
  experienceLevel: z
    .enum(["Intern", "Junior", "Mid", "Senior"])
    .refine((val) => val, {
      message: "Valid experience level required",
    }),
  employmentType: z
    .enum(["Full-time", "Contract", "Internship"])
    .refine((val) => val, {
      message: "Valid employment type required",
    }),
  workMode: z.enum(["Onsite", "Hybrid", "Remote"]).refine((val) => val, {
    message: "Valid work mode required",
  }),
  industry: z
    .string()
    .min(1, "Industry is required")
    .max(50, "Industry too long"),
  companySize: z.enum(["Startup", "SME", "Enterprise"]).refine((val) => val, {
    message: "Valid company size required",
  }),
  responsibilities: z
    .array(
      z
        .string()
        .min(1, "Responsibility cannot be empty")
        .max(200, "Responsibility too long"),
    )
    .min(1, "At least one responsibility is required")
    .max(10, "Too many responsibilities"),
  requiredSkills: z
    .array(
      z.string().min(1, "Skill cannot be empty").max(50, "Skill name too long"),
    )
    .min(1, "At least one required skill is needed")
    .max(15, "Too many required skills"),
  niceToHaveSkills: z
    .array(
      z.string().min(1, "Skill cannot be empty").max(50, "Skill name too long"),
    )
    .min(1, "At least one nice-to-have skill is needed")
    .max(10, "Too many nice-to-have skills"),
  techStack: z.object({
    backend: z.array(z.string()).default([]),
    frontend: z.array(z.string()).default([]),
    database: z.array(z.string()).default([]),
    devops: z.array(z.string()).default([]),
  }),
  domain: z.string().max(50, "Domain too long").default(""),
  reportingTo: z.string().max(100, "Reporting to field too long").default(""),
  teamSize: z.string().max(50, "Team size too long").default(""),
  methodology: z.string().max(50, "Methodology too long").default(""),
  softSkills: z
    .array(z.string().max(50, "Soft skill too long"))
    .max(10, "Too many soft skills")
    .default([]),
  location: z.string().max(100, "Location too long").default(""),
  salaryRange: z.string().max(100, "Salary range too long").default(""),
  tone: z
    .enum(["professional", "startup", "enterprise"])
    .default("professional"),
});

export type JobDescriptionInput = z.infer<typeof JobDescriptionSchema>;
