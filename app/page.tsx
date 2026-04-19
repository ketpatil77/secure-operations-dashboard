"use client";

import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  Clock3,
  Database,
  KeyRound,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip } from "@/components/ui/tooltip";
import { navigation } from "@/data/navigation";
import { alerts } from "@/data/alerts";
import { metrics } from "@/data/metrics";
import { AppShell } from "@/layouts/app-shell";
import { cn } from "@/lib/utils";
import { fadeSlide, listStagger } from "@/lib/motion";

const severityStyles = {
  critical: "text-danger bg-danger/10 border-danger/30",
  high: "text-warning bg-warning/10 border-warning/30",
  medium: "text-emerald-300 bg-emerald-500/10 border-emerald-400/30",
  low: "text-muted bg-white/5 border-white/10",
} as const;

const statusStyles = {
  open: "bg-danger/15 text-danger border-danger/25",
  contained: "bg-emerald-500/15 text-emerald-200 border-emerald-300/20",
  investigating: "bg-accent/10 text-accent border-accent/25",
} as const;

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <AppShell navigation={navigation}>
      <div className="space-y-6">
        <Hero onLaunch={() => setOpenModal(true)} />

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label} padding="lg" className="group relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted">{metric.label}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <p className="text-3xl font-semibold text-foreground">{metric.value}</p>
                    <ChangePill value={metric.change} />
                  </div>
                  <p className="mt-2 text-sm text-muted">{metric.caption}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Active incidents</p>
                <p className="mt-1 text-lg font-semibold text-foreground">Live response queue</p>
              </div>
              <Button variant="secondary" className="rounded-full px-4 py-2 text-sm">
                Assign responder
              </Button>
            </div>

            <motion.div
              className="mt-4 divide-y divide-white/5 border border-white/5 rounded-xl"
              variants={listStagger()}
              initial="hidden"
              animate="visible"
            >
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  variants={fadeSlide}
                  className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold",
                        severityStyles[alert.severity],
                      )}
                    >
                      {alert.id}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground">{alert.title}</p>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold border",
                            severityStyles[alert.severity],
                          )}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-xs text-muted">Source: {alert.source}</p>
                      <p className="text-xs text-muted">Detected: {alert.timestamp}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                        statusStyles[alert.status],
                      )}
                    >
                      <Activity className="h-4 w-4" />
                      {alert.status}
                    </span>
                    <Tooltip content="Open incident details">
                      <Button variant="ghost" className="border border-white/10 px-3 py-2 text-sm">
                        Review
                      </Button>
                    </Tooltip>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Posture</p>
                <p className="text-lg font-semibold text-foreground">System health</p>
              </div>
              <BadgeCheck className="h-5 w-5 text-emerald-300" />
            </div>
            <div className="space-y-3">
              {[
                { label: "Authentication hardening", score: 92, icon: KeyRound },
                { label: "Data plane integrity", score: 88, icon: Database },
                { label: "Edge defense & WAF", score: 94, icon: Shield },
              ].map((item) => (
                <div key={item.label} className="space-y-2 rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <item.icon className="h-4 w-4 text-accent" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-emerald-300">{item.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-accent to-emerald-500 shadow-[0_0_12px_rgba(61,209,246,0.35)]"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-sm font-semibold text-foreground">Upcoming checks</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>API egress audit</span>
                  <span className="text-accent">In 18 minutes</span>
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Automation</p>
                <p className="text-lg font-semibold text-foreground">Response workflows</p>
              </div>
              <Workflow className="h-5 w-5 text-accent" />
            </div>

            <div className="space-y-3">
              {[
                { label: "Containment & isolate infected nodes", progress: 76 },
                { label: "Purge malicious credentials", progress: 52 },
                { label: "Re-issue service meshes", progress: 24 },
              ].map((item) => (
                <div key={item.label} className="space-y-2 rounded-xl border border-white/5 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-foreground">
                    <span>{item.label}</span>
                    <span className="text-muted">{item.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-sm font-semibold text-foreground">Queued tasks</p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <Skeleton className="h-10 rounded-lg" />
                <Skeleton className="h-10 rounded-lg" />
              </div>
              <p className="mt-2 text-xs text-muted">
                Skeletons demonstrate the loading state we expose globally.
              </p>
            </div>
          </Card>

          <Card className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted">Runbook</p>
                <p className="text-lg font-semibold text-foreground">Live response cockpit</p>
              </div>
              <Tooltip content="All actions are scoped with least-privilege tokens">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-muted">
                  <KeyRound className="h-4 w-4 text-accent" />
                  Zero-trust
                </span>
              </Tooltip>
            </div>

            <div className="space-y-3">
              {["Snapshot endpoints", "Quarantine segments", "Rotate signing keys"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span>{item}</span>
                  </div>
                  <Tooltip content="Prep step ready">
                    <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  </Tooltip>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setOpenModal(true)}>Launch containment runbook</Button>
              <Button variant="secondary" className="border border-white/10">
                Export audit trail
              </Button>
              <Tooltip content="Soft launch uses canary traffic">
                <Button variant="ghost" className="border border-white/10">
                  Dry run
                </Button>
              </Tooltip>
            </div>
          </Card>
        </section>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Containment runbook"
        description="Validate scope, confirm network segmentation, and arm automation with signed approvals."
        primaryAction={{
          label: "Confirm & arm automation",
          onClick: () => setOpenModal(false),
        }}
      >
        <div className="space-y-3">
          <ModalStep
            icon={<Shield className="h-4 w-4 text-accent" />}
            label="Isolate compromised nodes"
            detail="Targeting 3 nodes inside production cluster A."
          />
          <ModalStep
            icon={<KeyRound className="h-4 w-4 text-emerald-300" />}
            label="Rotate credentials"
            detail="Re-issuing service mesh certs and short-lived tokens."
          />
          <ModalStep
            icon={<Workflow className="h-4 w-4 text-warning" />}
            label="Notify downstream teams"
            detail="Signal to Observability, SRE, and Threat Intel channels."
          />
        </div>
      </Modal>
    </AppShell>
  );
}

function Hero({ onLaunch }: { onLaunch: () => void }) {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <Card padding="lg" className="lg:col-span-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">Secure operations</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Defence-grade monitoring with{" "}
              <span className="headline-gradient">automation you can trust.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted">
              Phase 1 lays the foundation for a zero-trust, cyber-first dashboard. Structured for
              scale, hardened by defaults, and tuned for live operations.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground">
            <p className="font-semibold text-accent">Live telemetry</p>
            <p className="mt-1 text-xs text-muted">Latency budget</p>
            <p className="text-lg font-semibold text-emerald-300">41ms</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={onLaunch}>Start secure session</Button>
          <Tooltip content="Runs a dry pipeline with non-prod credentials">
            <Button variant="secondary">Simulate attack path</Button>
          </Tooltip>
          <Button variant="ghost">Share with team</Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Clock3 className="h-4 w-4" />
              Updated 48 seconds ago
            </div>
            <div className="mt-2 text-sm text-foreground">
              <p className="font-semibold text-emerald-300">Resilience:</p>
              <p>Auto-rollback and isolation policies are primed.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <KeyRound className="h-4 w-4" />
              Encrypted with hardware-backed keys
            </div>
            <div className="mt-2 text-sm text-foreground">
              <p className="font-semibold text-accent">Signal clarity:</p>
              <p>Noise reduced by adaptive correlation and heuristics.</p>
            </div>
          </div>
        </div>
      </Card>

      <Card padding="lg" className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.24em] text-muted">Operations</p>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            Live
          </span>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted">Analyst availability</span>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">On-call</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">Auto-remediations</span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-foreground">6 policies</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted">Critical assets</span>
            <span className="rounded-full bg-warning/15 px-3 py-1 text-warning">18 tracked</span>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full">Review posture now</Button>
        </div>
      </Card>
    </section>
  );
}

function ChangePill({ value }: { value: number }) {
  const positive = value >= 0;
  const Icon = positive ? ArrowUp : ArrowDown;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold",
        positive
          ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
          : "border-danger/25 bg-danger/10 text-danger",
      )}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(value)}%
    </span>
  );
}

function ModalStep({ icon, label, detail }: { icon: React.ReactNode; label: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-3">
      <div className="mt-0.5 rounded-full bg-white/10 p-2">{icon}</div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted">{detail}</p>
      </div>
    </div>
  );
}
