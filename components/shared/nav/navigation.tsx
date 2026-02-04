"use client";

import { FileSearch, Briefcase, Home, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const linkClassName = (isActive: boolean) =>
    `${linkBaseClasses} ${
      isActive
        ? "bg-[#5cbe4c]/10 text-[#5cbe4c]"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 mb-8 rounded-2xl">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand Section */}
          <Link
            href="/"
            aria-label="AI Career Tools home"
            className="flex items-center gap-3"
          >
            <div className="animate-float p-2 bg-[#5cbe4c]/10 rounded-xl">
              <FileSearch className="w-7 h-7 text-[#5cbe4c]" />
            </div>
            <div className="leading-tight">
              <span className="block text-lg sm:text-xl font-extrabold text-[#5cbe4c]">
                AI Career Tools
              </span>
              <span className="block text-xs text-slate-500 font-medium">
                Powered by Groq Llama 3
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex w-full flex-col justify-start gap-2 sm:w-auto sm:flex-row sm:justify-end sm:gap-3">
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
                  className={linkClassName(isActive)}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
