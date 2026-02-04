interface TextInputProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

const TextInput = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  required,
  error,
}: TextInputProps) => {
  return (
    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50 hover:border-[#5cbe4c]/30 transition-all">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-900 mb-3"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-slate-900 focus:outline-none focus:ring-4 transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-slate-200 focus:border-[#5cbe4c] focus:ring-[#5cbe4c]/10"
        }`}
      />
      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
