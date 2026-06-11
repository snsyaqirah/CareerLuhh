"use client";

import {
  LayoutDashboard,
  Search,
  TrendingUp,
  Bookmark,
  MailOpen,
  UserPlus,
  Building2,
} from "lucide-react";
import { PortalShell, type NavItem } from "@/components/shared/PortalShell";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/employer/dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "Talent Search", href: "/employer/search", icon: <Search size={16} /> },
  { label: "Workforce", href: "/employer/workforce", icon: <TrendingUp size={16} /> },
  { label: "Saved", href: "/employer/saved", icon: <Bookmark size={16} /> },
  { label: "Re-Engage", href: "/employer/re-engage", icon: <MailOpen size={16} /> },
  { label: "Onboarding", href: "/employer/onboarding", icon: <UserPlus size={16} /> },
  { label: "Internships", href: "/employer/internships", icon: <Building2 size={16} /> },
];

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="employer" nav={NAV}>
      {children}
    </PortalShell>
  );
}
