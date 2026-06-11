"use client";

import {
  LayoutDashboard,
  Briefcase,
  Banknote,
  Compass,
  Recycle,
  FolderGit2,
  MapPin,
  FileText,
  Bot,
  ClipboardList,
} from "lucide-react";
import { PortalShell, type NavItem } from "@/components/shared/PortalShell";

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "Job Board", href: "/candidate/jobs", icon: <Briefcase size={16} /> },
  { label: "My Applications", href: "/candidate/applications", icon: <ClipboardList size={16} /> },
  { label: "Next Move", href: "/candidate/next-move", icon: <Compass size={16} /> },
  { label: "Salary", href: "/candidate/salary", icon: <Banknote size={16} /> },
  { label: "Portfolio", href: "/candidate/portfolio", icon: <FolderGit2 size={16} /> },
  { label: "Gig Bridge", href: "/candidate/gig", icon: <Recycle size={16} /> },
  { label: "Lokal Route", href: "/candidate/lokal", icon: <MapPin size={16} /> },
  { label: "Agent Console", href: "/candidate/agents", icon: <Bot size={16} /> },
  { label: "Resume Upload", href: "/candidate/onboarding", icon: <FileText size={16} /> },
];

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell role="candidate" nav={NAV}>
      {children}
    </PortalShell>
  );
}
