import { X } from "lucide-react";
import { useCallback, useState } from "react";

interface TagInputProps {
  label: string;
  values: string[];
  placeholder?: string;
  helperText?: string;
  onChange: (values: string[]) => void;
  required?: boolean;
  error?: string;
}

const TagInput = ({
  label,
  values,
  placeholder,
  helperText,
  onChange,
  required,
  error,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = useCallback(
    (rawValue: string) => {
      const trimmed = rawValue.trim();
      if (!trimmed) return;
      if (values.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
        setInputValue("");
        return;
      }
      onChange([...values, trimmed]);
      setInputValue("");
    },
    [values, onChange],
  );

  const removeTag = useCallback(
    (value: string) => {
      onChange(values.filter((item) => item !== value));
    },
    [values, onChange],
  );

  return (
    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50 hover:border-[#5cbe4c]/30 transition-all">
      <label className="block text-sm font-semibold text-slate-900 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {values.map((value) => (
          <span
            key={value}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-700"
          >
            {value}
            <button
              type="button"
              onClick={() => removeTag(value)}
              className="rounded-full p-1 hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addTag(inputValue.replace(/,$/, ""));
          }
        }}
        onBlur={() => addTag(inputValue)}
        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#5cbe4c] focus:ring-4 focus:ring-[#5cbe4c]/10 transition-all"
      />
      {helperText && (
        <p className="mt-2 text-xs text-slate-500 font-medium">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default TagInput;
