"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export type Tone = "blue" | "green" | "purple" | "amber" | "red" | "neutral";

export type DecisionPanelData = {
  recommendation: string;
  why: string;
  evidence: string[];
  confidence: number;
  risk: string;
  nextAction: string;
};

const navigationItems = [
  { label: "工作台", href: "/" },
  { label: "趋势发现", href: "/trends" },
  { label: "竞品情报", href: "/competitors" },
  { label: "内容策略", href: "/strategy" },
  { label: "内容工作室", href: "/studio" },
  { label: "发布计划", href: "/planner" },
  { label: "数据复盘", href: "/analytics" },
  { label: "AI 策略中心", href: "/hub" }
];

export function toneClasses(tone: Tone) {
  const tones: Record<Tone, string> = {
    blue: "bg-blue-50 text-brand-blue",
    green: "bg-green-50 text-brand-green",
    purple: "bg-purple-50 text-brand-purple",
    amber: "bg-amber-50 text-brand-amber",
    red: "bg-red-50 text-brand-red",
    neutral: "bg-surface-soft text-ink-500"
  };

  return tones[tone];
}

export function AppShell({ children, title = "工作台" }: { children: ReactNode; title?: string }) {
  const pathname = usePathname();

  return (
    <main className="h-dvh overflow-hidden px-4 py-4 text-ink-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-full min-h-0 max-w-[1500px] gap-5">
        <aside className="hidden h-full w-72 shrink-0 rounded-3xl border border-white/80 bg-white/72 p-4 shadow-card backdrop-blur-xl lg:flex lg:flex-col">
          <div className="mb-7 flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-ink-950 text-sm font-semibold text-white">
              AI
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">ContentPilot AI</p>
              <p className="truncate text-xs text-ink-500">研究与策略工作区</p>
            </div>
          </div>

          <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
            {navigationItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`focus-ring flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    active ? "bg-ink-950 text-white shadow-card" : "text-ink-700 hover:bg-surface-soft hover:text-ink-950"
                  }`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${active ? "bg-white" : "bg-ink-300"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple">AI 策略层</p>
            <p className="mt-2 text-sm font-medium leading-5 text-ink-950">
              每个模块都把信号转化为决策、证据和下一步。
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-purple-100">
              <div className="h-full w-4/5 rounded-full bg-brand-purple" />
            </div>
          </div>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 overflow-hidden">
          <TopBar title={title} />
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-8 [scrollbar-gutter:stable]">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}

export function TopBar({ title }: { title: string }) {
  return (
    <header className="glass-panel relative z-30 flex shrink-0 items-center justify-between rounded-3xl px-4 py-3 shadow-card">
      <div className="flex min-w-0 items-center gap-3">
        <button className="focus-ring grid h-10 w-10 place-items-center rounded-2xl border border-gray-200 bg-white text-sm font-semibold lg:hidden">
          AI
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="truncate text-xs text-ink-500">研究与策略工作区</p>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        {["研究主题", "小红书", "本周"].map((item) => (
          <button
            key={item}
            className="focus-ring rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 transition hover:border-gray-300 hover:bg-surface-soft"
          >
            {item}
          </button>
        ))}
      </div>
    </header>
  );
}

export function Card({
  children,
  className = "",
  delay = "0ms"
}: {
  children: ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <section
      className={`animate-floatIn rounded-2xl border border-gray-200 bg-white/86 p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lift ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </section>
  );
}

export function FieldSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-500">{label}</span>
      <select
        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium outline-none transition focus:border-blue-200 focus:bg-blue-50/30"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function AIDecisionPanel({
  data,
  compact = false,
  delay = "0ms",
  className = "",
  onAction
}: {
  data: DecisionPanelData;
  compact?: boolean;
  delay?: string;
  className?: string;
  onAction?: () => void;
}) {
  return (
    <Card className={`${compact ? "" : "xl:col-span-4"} ${className}`} delay={delay}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">AI 决策面板</p>
          <p className="mt-1 text-xs text-ink-500">推荐、证据、风险与下一步动作</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses(data.confidence >= 85 ? "green" : "purple")}`}>
          信心分数 {data.confidence}%
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-purple-100 bg-purple-50/45 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-purple">推荐决策</p>
        <p className="mt-2 text-base font-semibold leading-6 text-ink-950">{data.recommendation}</p>
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? "2xl:grid-cols-3" : ""}`}>
        <div className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
          <p className="text-xs font-semibold text-ink-500">为什么重要</p>
          <p className="mt-2 text-sm leading-6 text-ink-700">{data.why}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4">
          <p className="text-xs font-semibold text-ink-500">证据信号</p>
          <div className="mt-3 space-y-2">
            {data.evidence.map((signal) => (
              <div key={signal} className="flex gap-2 text-sm leading-5 text-ink-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                <span>{signal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
          <p className="text-xs font-semibold text-brand-amber">风险提示</p>
          <p className="mt-2 text-sm leading-6 text-ink-700">{data.risk}</p>
        </div>
      </div>

      {onAction ? (
        <button
          className="focus-ring mt-4 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-ink-950 transition hover:-translate-y-0.5 hover:bg-surface-soft"
          onClick={onAction}
        >
          {data.nextAction}
        </button>
      ) : (
        <div className="mt-4 rounded-xl border border-gray-100 bg-surface-soft px-4 py-3">
          <p className="text-xs font-semibold text-ink-500">下一步动作</p>
          <p className="mt-1 text-sm font-semibold text-ink-950">{data.nextAction}</p>
        </div>
      )}
    </Card>
  );
}
