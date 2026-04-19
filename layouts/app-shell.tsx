import type React from "react";
import { Bell, Menu, Search, ShieldCheck, Signal, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type NavigationItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  badge?: string;
};

type AppShellProps = {
  navigation: NavigationItem[];
  children: React.ReactNode;
};

export function AppShell({ navigation, children }: AppShellProps) {
  return (
    <div className="relative z-10 min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-inner shadow-cyan-500/20">
              <ShieldCheck className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted">Secure Ops</p>
              <p className="text-base font-semibold text-foreground">Control Center</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-surface/70 px-2 py-1 lg:flex">
            {navigation.map((item) => (
              <Tooltip key={item.label} content={item.label}>
                <button
                  type="button"
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground",
                    item.active && "bg-white/10 text-foreground shadow-inner shadow-cyan-500/20",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="rounded-full bg-accent/20 px-2 text-xs font-semibold text-accent">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              </Tooltip>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="group relative hidden items-center gap-2 rounded-full border border-white/10 bg-surface/70 px-3 py-2 text-sm text-muted focus-within:ring-2 focus-within:ring-accent lg:flex">
              <Search className="h-4 w-4 text-muted" />
              <input
                type="search"
                placeholder="Search assets, incidents, users"
                aria-label="Search operations"
                className="w-56 bg-transparent text-foreground placeholder:text-muted focus:outline-none"
              />
            </div>

            <Tooltip content="Signal health">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300">
                <Signal className="h-4 w-4" />
                Stable
              </div>
            </Tooltip>

            <Button variant="secondary" className="hidden lg:inline-flex">
              Deploy shield
            </Button>
            <Button variant="primary" className="hidden lg:inline-flex">
              Create policy
            </Button>

            <Tooltip content="Alerts">
              <Button variant="ghost" className="h-10 w-10 rounded-full border border-white/10 px-0">
                <Bell className="h-4 w-4" />
              </Button>
            </Tooltip>

            <Tooltip content="Analyst">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-foreground">
                <UserCircle className="h-6 w-6" />
              </div>
            </Tooltip>

            <button className="lg:hidden">
              <Menu className="h-6 w-6 text-muted" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 lg:px-8">{children}</main>
    </div>
  );
}
