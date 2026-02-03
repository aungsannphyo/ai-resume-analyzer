import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";

interface ResumeUploadProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
}

const ResumeUpload = ({ resumeFile, setResumeFile }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF file only");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF file only");
      }
    }
  };

  return (
    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200/50 hover:border-[#5cbe4c]/30 transition-all duration-300">
      <label className="flex items-center gap-2 font-semibold text-slate-900 mb-4">
        <Upload className="w-5 h-5 text-[#5cbe4c]" />
        Resume Upload (PDF Only)
      </label>

      {!resumeFile ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
            dragActive
              ? "border-[#5cbe4c] bg-[#5cbe4c]/5"
              : "border-slate-300 hover:border-[#5cbe4c]/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="resumeFile"
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-700 font-medium mb-2">
            Drop your PDF resume here or click to browse
          </p>
          <p className="text-sm text-slate-500">Maximum file size: 10MB</p>
        </div>
      ) : (
        <div className="bg-white border-2 border-[#5cbe4c]/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5cbe4c]/10 rounded-lg">
              <FileText className="w-6 h-6 text-[#5cbe4c]" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{resumeFile.name}</p>
              <p className="text-sm text-slate-500">
                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => setResumeFile(null)}
            className="p-2 hover:bg-red-500/10 rounded-lg transition-all group"
          >
            <X className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
