import {
  Activity,
  Bell,
  Cpu,
  LayoutDashboard,
  ShieldHalf,
  Waypoints,
} from "lucide-react";
import { NavigationItem } from "@/layouts/app-shell";

export const navigation: NavigationItem[] = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Threats",
    href: "/threats",
    icon: ShieldHalf,
    badge: "5",
  },
  {
    label: "Network",
    href: "/network",
    icon: Activity,
  },
  {
    label: "Workflows",
    href: "/workflows",
    icon: Waypoints,
  },
  {
    label: "Automation",
    href: "/automation",
    icon: Cpu,
  },
  {
    label: "Alerts",
    href: "/alerts",
    icon: Bell,
    badge: "12",
  },
];
