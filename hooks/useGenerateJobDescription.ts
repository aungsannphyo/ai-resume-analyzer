import { useMutation } from "@tanstack/react-query";
import { useJobDescriptionStore } from "@/store/useJobDescriptionStore";
import { JobDescriptionService } from "@/services/job-description.service";
import type { JobDescriptionInput } from "@/types/job-description";

export const useGenerateJobDescription = () => {
  const { setGeneratedDescription, setShowResults, setError } =
    useJobDescriptionStore();

  return useMutation({
    mutationFn: async (payload: JobDescriptionInput) => {
      return JobDescriptionService.generate(payload);
    },
    onMutate: () => {
      setError(null);
      setGeneratedDescription(null);
      setShowResults(false);
    },
    onSuccess: (data) => {
      setGeneratedDescription(data.jobDescription);
      setShowResults(true);
      setError(null);

      // Show cache indicator in console for now
      if (data.cached) {
        console.log("📋 Result loaded from cache");
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error: Error) => {
      setError(error.message);
      setShowResults(false);
    },
  });
};
