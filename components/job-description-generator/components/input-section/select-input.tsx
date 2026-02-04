interface SelectInputOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  value: string;
  options: SelectInputOption[];
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}

const SelectInput = ({
  id,
  label,
  value,
  options,
  onChange,
  required,
  error,
}: SelectInputProps) => {
  return (
    <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50 hover:border-[#5cbe4c]/30 transition-all">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-900 mb-3"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-slate-700 font-semibold focus:outline-none focus:ring-4 transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
            : "border-slate-200 focus:border-[#5cbe4c] focus:ring-[#5cbe4c]/10"
        }`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-xs text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default SelectInput;
