"use client";

import { useState, useEffect } from "react";

const MODEL_OPTIONS = [
  {
    value: "instant",
    label: "Instant",
    description: "Fast responses",
    icon: "⚡",
  },
  {
    value: "versatile",
    label: "Versatile",
    description: "Powerful analysis",
    icon: "🧠",
  },
] as const;

type ModelType = (typeof MODEL_OPTIONS)[number]["value"];

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState<ModelType>("instant");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai-model-type") as ModelType;
    if (saved && MODEL_OPTIONS.some((opt) => opt.value === saved)) {
      setSelectedModel(saved);
    }
  }, []);

  const handleModelChange = (model: ModelType) => {
    setSelectedModel(model);
    localStorage.setItem("ai-model-type", model);
    setIsOpen(false);
  };

  const selectedOption = MODEL_OPTIONS.find(
    (opt) => opt.value === selectedModel,
  );

  return (
    <div className="relative">
      {/* Label */}
      <div className="text-xs sm:text-sm text-center font-medium text-slate-700 mb-2">
        AI Model
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/60 border border-slate-200/50 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:bg-white hover:border-slate-300 transition-all duration-200 min-w-32 sm:min-w-35 justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base">{selectedOption?.icon}</span>
          <span className="text-xs sm:text-sm">{selectedOption?.label}</span>
        </div>
        <svg
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 right-0 z-50 bg-white border border-slate-200 rounded-xl shadow-lg min-w-32 sm:min-w-35 overflow-hidden">
            {MODEL_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleModelChange(option.value)}
                className={`
                  w-full px-3 py-2 sm:px-4 sm:py-2 text-left text-xs sm:text-sm transition-colors duration-150 cursor-pointer
                  ${
                    selectedModel === option.value
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base">{option.icon}</span>
                    <span className="text-xs sm:text-sm">{option.label}</span>
                  </div>
                  {selectedModel === option.value && (
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
