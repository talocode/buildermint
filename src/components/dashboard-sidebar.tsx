"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/profile", label: "Skill Profile" },
  { href: "/dashboard/opportunities", label: "Opportunities" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950/80 p-4 md:w-64 md:border-b-0 md:border-r">
      <div className="mb-8">
        <Link href="/" className="text-lg font-semibold text-emerald-400">
          BuilderMint
        </Link>
        <p className="mt-1 text-xs text-slate-500">Validated micro-SaaS co-pilot</p>
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm transition-colors",
              pathname === link.href
                ? "bg-slate-800 text-emerald-300"
                : "text-slate-300 hover:bg-slate-900 hover:text-white",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}