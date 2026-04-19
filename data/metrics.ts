export type Metric = {
  label: string;
  value: string;
  change: number;
  caption: string;
};

export const metrics: Metric[] = [
  {
    label: "Live incidents",
    value: "12",
    change: -14,
    caption: "containment after triage",
  },
  {
    label: "Blocked intrusions",
    value: "3.8k",
    change: 8,
    caption: "last 24h",
  },
  {
    label: "Mean response",
    value: "2.4m",
    change: -6,
    caption: "MTTR",
  },
  {
    label: "Policy coverage",
    value: "96%",
    change: 2,
    caption: "production assets",
  },
];
