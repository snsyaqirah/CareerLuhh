"use client";

import {
  LayoutDashboard,
  GitBranch,
  Building2,
  FolderGit2,
  Languages,
  MapPin,
} from "lucide-react";
import { PortalShell, type NavItem } from "@/components/shared/PortalShell";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "Roadmap", href: "/student/roadmap", icon: <GitBranch size={16} /> },
  { label: "Internships", href: "/student/internships", icon: <Building2 size={16} /> },
  { label: "Portfolio", href: "/student/portfolio", icon: <FolderGit2 size={16} />, soon: true },
  { label: "Qualifications", href: "/student/qualifications", icon: <Languages size={16} />, soon: true },
  { label: "Lokal Route", href: "/student/lokal", icon: <MapPin size={16} />, soon: true },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="student" nav={NAV}>
      {children}
    </PortalShell>
  );
}
