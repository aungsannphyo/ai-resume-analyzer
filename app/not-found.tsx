import Link from "next/link";
import { FileSearch, Briefcase, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-slate-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5cbe4c] text-white rounded-xl font-semibold hover:bg-[#4da839] transition-colors"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/resume-analyzer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-[#5cbe4c]/40 hover:text-[#5cbe4c] transition-colors"
          >
            <FileSearch className="w-4 h-4" />
            Resume Analyzer
          </Link>
          <Link
            href="/job-description-generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-[#5cbe4c]/40 hover:text-[#5cbe4c] transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            JD Generator
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-slate-400">
            Or go back to the previous page if you think this is an error.
          </p>
        </div>
      </div>
    </div>
  );
}
