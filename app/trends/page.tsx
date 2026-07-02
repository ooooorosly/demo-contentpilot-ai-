"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AIDecisionPanel, AppShell, Card, FieldSelect, toneClasses } from "@/components/workspace";
import { trends, type CompetitionLevel, type Strength, type TrendOpportunity, type TrendStage } from "@/data/mockData";

const platformOptions = ["小红书"];
const categoryOptions = ["食品与健康"];
const timeRangeOptions = ["本周", "本月", "近 90 天"];
const audienceOptions = ["上班族"];
const opportunityOptions = ["全部机会", "高", "中", "低"];

const platformValue: Record<string, string> = { 小红书: "小红书" };
const categoryValue: Record<string, string> = { 食品与健康: "食品与健康", 教育: "Education", 美妆: "Beauty", 健身: "Fitness" };
const audienceValue: Record<string, string> = {
  上班族: "上班族"
};
const opportunityValue: Record<string, string> = { 高: "High", 中: "Medium", 低: "Low" };
const demoTrendIds = ["office-breakfast", "protein-breakfast", "no-fridge-office-breakfast"];

export default function TrendDiscoveryPage() {
  const demoTrends = useMemo(() => {
    const selected = trends.filter((trend) => demoTrendIds.includes(trend.id));
    return demoTrendIds.map((id) => selected.find((trend) => trend.id === id)).filter(Boolean) as TrendOpportunity[];
  }, []);
  const [selectedTrendId, setSelectedTrendId] = useState("protein-breakfast");
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [timeRange, setTimeRange] = useState(timeRangeOptions[0]);
  const [audience, setAudience] = useState(audienceOptions[0]);
  const [opportunityLevel, setOpportunityLevel] = useState(opportunityOptions[0]);

  const filteredTrends = useMemo(() => {
    return demoTrends.filter((trend) => {
      const platformMatch = platform === "全部平台" || trend.platform === (platformValue[platform] ?? platform);
      const categoryMatch = category === "全部分类" || trend.category === (categoryValue[category] ?? category);
      const audienceMatch = audience === "全部受众" || trend.audience === (audienceValue[audience] ?? audience);
      const opportunityMatch = opportunityLevel === "全部机会" || trend.level === opportunityValue[opportunityLevel];

      return platformMatch && categoryMatch && audienceMatch && opportunityMatch;
    });
  }, [demoTrends, platform, category, audience, opportunityLevel]);

  const visibleTrends = filteredTrends.length > 0 ? filteredTrends : demoTrends;
  const selectedTrend = visibleTrends.find((trend) => trend.id === selectedTrendId) ?? visibleTrends[0];

  const selectTrend = (trend: TrendOpportunity) => {
    setSelectedTrendId(trend.id);
  };

  return (
    <AppShell title="趋势发现">
      <div className="space-y-5">
        <section className="animate-floatIn rounded-3xl border border-white/80 bg-white/82 p-5 shadow-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-blue">趋势发现</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">
                哪些趋势值得做？
              </h1>
              <p className="mt-3 text-sm leading-6 text-ink-500">
                判断哪些内容机会值得继续研究。
              </p>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:max-w-3xl xl:grid-cols-3 2xl:grid-cols-5">
              <FieldSelect label="平台" value={platform} options={platformOptions} onChange={setPlatform} />
              <FieldSelect label="分类" value={category} options={categoryOptions} onChange={setCategory} />
              <FieldSelect label="时间范围" value={timeRange} options={timeRangeOptions} onChange={setTimeRange} />
              <FieldSelect label="受众" value={audience} options={audienceOptions} onChange={setAudience} />
              <FieldSelect label="机会等级" value={opportunityLevel} options={opportunityOptions} onChange={setOpportunityLevel} />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">趋势机会</h2>
                <p className="mt-1 text-sm text-ink-500">
                  选择一个机会后，AI 决策面板、证据信号和下一步会同步更新。
                </p>
              </div>
              <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue sm:inline-flex">
                {visibleTrends.length} 个信号
              </span>
            </div>
            <div className="space-y-3">
              {visibleTrends.map((trend) => (
                <TrendOpportunityCard
                  key={trend.id}
                  trend={trend}
                  selected={trend.id === selectedTrend.id}
                  onSelect={() => selectTrend(trend)}
                />
              ))}
            </div>
          </section>

          <aside className="space-y-5 xl:sticky xl:top-0 xl:self-start">
            <AIDecisionPanel data={selectedTrend.decision} compact className="xl:col-span-1" />
            <SelectedTrendDetail trend={selectedTrend} />
          </aside>
        </div>

        <ContentAnglesSection trend={selectedTrend} />

        <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-blue-100">下一步决策</p>
              <h2 className="mt-2 text-2xl font-semibold">分析竞品</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
                使用竞品格式、评论和证据信号，判断这个机会是否应该进入内容策略。
              </p>
            </div>
            <Link
              href="/competitors"
              className="focus-ring rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-ink-950 shadow-card transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              分析竞品
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function TrendOpportunityCard({
  trend,
  selected,
  onSelect
}: {
  trend: TrendOpportunity;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      data-testid={`trend-card-${trend.id}`}
      className={`focus-ring group rounded-2xl border p-4 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${
        selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white/86 hover:border-blue-100"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold leading-5 group-hover:text-brand-blue">{trend.title}</h2>
            {selected ? (
              <span className="rounded-full bg-brand-blue px-2.5 py-1 text-[11px] font-semibold text-white">
                已选中
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-xs font-medium text-ink-500">
            {trend.platform} · {trend.category}
          </p>
        </div>
        <StageBadge stage={trend.stage} />
      </div>

      <p className="mt-3 text-sm leading-6 text-ink-600">{trend.explanation}</p>

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        <MetricPill label="增长" value={trend.growthScore} />
        <MetricPill label="受众匹配" value={trend.audienceFitScore} />
        <MetricPill label="竞争" value={competitionLabel(trend.competition)} />
        <MetricPill label="机会" value={trend.opportunityScore} highlight />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneClasses(trend.level === "High" ? "green" : trend.level === "Medium" ? "amber" : "neutral")}`}>
          {opportunityLabel(trend.level)}机会
        </span>
        <span className="text-xs font-semibold text-brand-blue">
          {selected ? "下一步：分析竞品" : "选择趋势"}
        </span>
      </div>
    </button>
  );
}

function MetricPill({ label, value, highlight = false }: { label: string; value: number | string; highlight?: boolean }) {
  const numericValue = typeof value === "number" ? value : undefined;

  return (
    <div className={`min-w-0 rounded-xl border px-3 py-2 ${highlight ? "border-blue-100 bg-blue-50" : "border-gray-100 bg-white"}`}>
      <div className="min-w-0">
        <p className="truncate text-[10px] font-semibold text-ink-400">{label}</p>
        <p className={`text-xs font-semibold ${highlight ? "text-brand-blue" : "text-ink-950"}`}>{value}</p>
      </div>
      {numericValue ? (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-100">
          <div className={`h-full rounded-full ${highlight ? "bg-brand-blue" : "bg-ink-400"}`} style={{ width: `${numericValue}%` }} />
        </div>
      ) : null}
    </div>
  );
}

function StageBadge({ stage }: { stage: TrendStage }) {
  const tone = stage === "Rising" ? "green" : stage === "Early" ? "blue" : stage === "Saturated" ? "amber" : "neutral";

  return <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{stageLabel(stage)}</span>;
}

function CompetitionBadge({ level }: { level: CompetitionLevel }) {
  const tone = level === "Low" ? "green" : level === "Medium" ? "amber" : "red";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{competitionLabel(level)}</span>;
}

function StrengthBadge({ strength }: { strength: Strength }) {
  const tone = strength === "Strong" ? "green" : strength === "Medium" ? "blue" : "amber";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{strengthLabel(strength)}</span>;
}

function SelectedTrendDetail({ trend }: { trend: TrendOpportunity }) {
  const details = [
    { label: "增长原因", value: trend.whyGrowing },
    { label: "参与受众", value: trend.whoEngages },
    { label: "有效格式", value: trend.workingFormats },
    { label: "受众痛点", value: trend.painPoint },
    { label: "内容机会", value: trend.opportunity }
  ];

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">已选趋势详情</p>
          <p className="mt-1 text-xs text-ink-500">当前机会的决策上下文。</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">{trend.opportunityScore} 机会评分</span>
      </div>
      <div className="mt-4 space-y-3">
        {details.map((detail) => (
          <div key={detail.label} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">{detail.label}</p>
            <p className="mt-2 text-sm leading-6 text-ink-700">{detail.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EvidenceSignalsSection({ trend }: { trend: TrendOpportunity }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">证据信号</h2>
        <p className="mt-1 text-sm text-ink-500">
          基于已选趋势：<span className="font-medium text-ink-700">{trend.title}</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {trend.evidence.map((signal) => (
          <div key={signal.name} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold">{signal.name}</p>
              <StrengthBadge strength={signal.strength} />
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-600">{signal.explanation}</p>
            <p className="mt-3 text-xs leading-5 text-ink-500">{signal.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ContentAnglesSection({ trend }: { trend: TrendOpportunity }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">推荐内容角度</h2>
        <p className="mt-1 text-sm text-ink-500">
          基于已选趋势生成的内容角度：<span className="font-medium text-ink-700">{trend.title}</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {trend.angles.map((angle) => (
          <div key={angle.type} className="rounded-2xl border border-gray-100 bg-white p-4">
            <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-brand-purple">{angle.type}</span>
            <p className="mt-4 text-sm font-semibold leading-5">{angle.title}</p>
            <p className="mt-2 text-xs leading-5 text-ink-500">{angle.why}</p>
            <div className="mt-4 rounded-xl bg-surface-soft p-3">
              <p className="text-[11px] font-semibold text-ink-400">示例选题</p>
              <p className="mt-1 text-xs leading-5 text-ink-700">{angle.example}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RiskNotesSection({ trend }: { trend: TrendOpportunity }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">风险提示</h2>
        <p className="mt-1 text-sm text-ink-500">
          投入前需要复核的风险：<span className="font-medium text-ink-700">{trend.title}</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {trend.risks.map((risk) => (
          <div key={risk.risk} className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold">{risk.risk}</p>
              <CompetitionBadge level={risk.level} />
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-700">{risk.note}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TrendComparisonMatrix({
  trends: comparisonTrends,
  selectedId,
  onSelect
}: {
  trends: TrendOpportunity[];
  selectedId: string;
  onSelect: (trend: TrendOpportunity) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">趋势对比矩阵</h2>
        <p className="mt-1 text-sm text-ink-500">在选择研究方向前比较机会信号。</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100">
        <div className="grid grid-cols-[1.4fr_.8fr_.8fr_.8fr_.8fr_1fr] gap-3 bg-surface-soft px-4 py-3 text-xs font-semibold text-ink-500">
          <span>趋势</span>
          <span>平台</span>
          <span>受众匹配</span>
          <span>竞争</span>
          <span>机会</span>
          <span>推荐动作</span>
        </div>
        {comparisonTrends.map((trend) => (
          <button
            key={trend.id}
            className={`grid w-full grid-cols-[1.4fr_.8fr_.8fr_.8fr_.8fr_1fr] gap-3 px-4 py-4 text-left text-sm transition hover:bg-blue-50/50 ${
              trend.id === selectedId ? "bg-blue-50/70" : "bg-white"
            }`}
            onClick={() => onSelect(trend)}
          >
            <span className="font-semibold text-ink-950">{trend.title}</span>
            <span className="text-ink-500">{trend.platform}</span>
            <span className="font-semibold">{trend.audienceFitScore}</span>
            <span className="text-ink-500">{competitionLabel(trend.competition)}</span>
            <span className="font-semibold text-brand-blue">{trend.opportunityScore}</span>
            <span className="text-brand-blue">分析这个趋势</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

function stageLabel(stage: TrendStage) {
  const labels: Record<TrendStage, string> = {
    Early: "早期",
    Rising: "上升",
    Saturated: "饱和",
    Declining: "下降"
  };

  return labels[stage];
}

function competitionLabel(level: CompetitionLevel) {
  const labels: Record<CompetitionLevel, string> = {
    Low: "低",
    Medium: "中",
    High: "高"
  };

  return labels[level];
}

function strengthLabel(strength: Strength) {
  const labels: Record<Strength, string> = {
    Medium: "中",
    Strong: "强",
    Watch: "观察"
  };

  return labels[strength];
}

function opportunityLabel(level: string) {
  const labels: Record<string, string> = {
    High: "高",
    Medium: "中",
    Low: "低"
  };

  return labels[level] ?? level;
}
