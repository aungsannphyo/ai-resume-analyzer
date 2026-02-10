"use client";

import { FileSearch, Briefcase, Home, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModelSelector } from "@/components/ui/model-selector";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const Navigation = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: "/resume-analyzer",
      label: "Resume Analyzer",
      icon: FileSearch,
    },
    {
      href: "/job-description-generator",
      label: "JD Generator",
      icon: Briefcase,
    },
  ];

  const linkBaseClasses =
    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border border-white/20 shadow-lg rounded-3xl mb-8">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-6 py-4 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand Section */}
          <Link
            href="/"
            aria-label="AI Career Tools home"
            className="group flex items-center gap-3 sm:gap-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-emerald-400 to-green-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative p-2 sm:p-3 bg-linear-to-br from-emerald-50 to-green-100 rounded-2xl border border-emerald-200/50">
                <FileSearch className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
            </div>
            <div className="leading-tight">
              <span className="block text-lg sm:text-xl lg:text-2xl font-black bg-linear-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                AI Career Tools
              </span>
              <span className="block text-xs text-slate-500 font-medium mt-1">
                Powered by Groq Llama 3
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
            <div className="flex flex-col justify-start gap-2 sm:flex-row sm:justify-end sm:gap-3 lg:gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                // Make Resume Analyzer active on both / and /resume-analyzer
                const isActive =
                  (item.href === "/resume-analyzer" &&
                    (pathname === "/" || pathname === "/resume-analyzer")) ||
                  (item.href !== "/resume-analyzer" && pathname === item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex items-center gap-2 sm:gap-3 rounded-xl px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-emerald-100 text-emerald-700 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }
                    `}
                  >
                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Model Selector */}
            <div className="border-l border-slate-200/50 pl-3 sm:pl-4">
              <ModelSelector />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
