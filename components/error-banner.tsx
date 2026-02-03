import { AlertTriangle } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  className?: string;
}

const ErrorBanner = ({ message, className }: ErrorBannerProps) => {
  return (
    <div
      role="alert"
      className={`bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-600 flex items-center gap-3 ${className || ""}`}
    >
      <AlertTriangle className="w-5 h-5" />
      {message}
    </div>
  );
};

export default ErrorBanner;
