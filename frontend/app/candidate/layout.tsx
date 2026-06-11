"use client";

import {
  LayoutDashboard,
  Briefcase,
  Banknote,
  Compass,
  Recycle,
  FolderGit2,
  MapPin,
} from "lucide-react";
import { PortalShell, type NavItem } from "@/components/shared/PortalShell";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "Job Matches", href: "/candidate/jobs", icon: <Briefcase size={16} /> },
  { label: "Salary", href: "/candidate/salary", icon: <Banknote size={16} /> },
  { label: "Next Move", href: "/candidate/next-move", icon: <Compass size={16} />, soon: true },
  { label: "Gig Bridge", href: "/candidate/gig", icon: <Recycle size={16} />, soon: true },
  { label: "Portfolio", href: "/candidate/portfolio", icon: <FolderGit2 size={16} />, soon: true },
  { label: "Lokal Route", href: "/candidate/lokal", icon: <MapPin size={16} />, soon: true },
];

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="candidate" nav={NAV}>
      {children}
    </PortalShell>
  );
}
