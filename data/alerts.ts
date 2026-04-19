export type Alert = {
  id: string;
  title: string;
  source: string;
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  status: "open" | "contained" | "investigating";
};

export const alerts: Alert[] = [
  {
    id: "#8842",
    title: "Unusual lateral movement detected",
    source: "east-core-vpc",
    severity: "critical",
    timestamp: "04:22 UTC",
    status: "open",
  },
  {
    id: "#8839",
    title: "Privilege escalation blocked",
    source: "idp-prod",
    severity: "high",
    timestamp: "03:58 UTC",
    status: "contained",
  },
  {
    id: "#8834",
    title: "Anomalous API burst from partner integration",
    source: "api-gateway-eu",
    severity: "high",
    timestamp: "02:44 UTC",
    status: "investigating",
  },
  {
    id: "#8828",
    title: "Edge WAF blocking coordinated scan",
    source: "waf-global",
    severity: "medium",
    timestamp: "01:10 UTC",
    status: "contained",
  },
];
