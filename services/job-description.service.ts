import type {
  JobDescriptionInput,
  JobDescriptionResponse,
  JobDescriptionResult,
} from "@/types/job-description";

export const JobDescriptionService = {
  generate: async (
    payload: JobDescriptionInput,
  ): Promise<JobDescriptionResult & { cached?: boolean }> => {
    const response = await fetch("/api/job-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: JobDescriptionResponse | null = null;
    try {
      data = (await response.json()) as JobDescriptionResponse;
    } catch {
      data = null;
    }

    if (!response.ok) {
      throw new Error(
        data?.error ||
          `Job description generation failed (status ${response.status})`,
      );
    }

    if (!data?.success || !data.data) {
      throw new Error(data?.error || "Job description generation failed");
    }

    return {
      ...data.data,
      cached: data.cached,
    };
  },
};
