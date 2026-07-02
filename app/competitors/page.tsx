"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AIDecisionPanel, AppShell, Card, FieldSelect, toneClasses } from "@/components/workspace";
import { competitors, type CompetitorProfile, type WinningPost } from "@/data/mockData";

const platformOptions = ["全部平台", "小红书", "Instagram"];
const competitorTypeOptions = ["全部类型", "创作者账号", "垂直媒体号", "编辑型账号"];
const formatOptions = ["全部格式", "清单笔记", "成本对比轮播", "快速准备视频", "编辑型笔记"];
const timeRangeOptions = ["本周", "本月", "近 90 天"];
const selectedTrendOptions = ["经济实惠的蛋白质早餐", "五分钟早餐系统"];
const demoCompetitorIds = ["daily-office-meals", "budget-wellness-lab", "morning-routine-notes"];

const platformValue: Record<string, string> = { 小红书: "小红书" };
const typeValue: Record<string, string> = {
  创作者账号: "创作者账号",
  垂直媒体号: "垂直媒体号",
  编辑型账号: "编辑型账号"
};
const formatValue: Record<string, string> = {
  清单笔记: "清单笔记",
  成本对比轮播: "成本对比轮播",
  快速准备视频: "Fast prep video",
  编辑型笔记: "编辑型笔记"
};

export default function CompetitorIntelligencePage() {
  const [selectedCompetitorId, setSelectedCompetitorId] = useState(competitors[0].id);
  const [selectedPostId, setSelectedPostId] = useState(competitors[0].winningPosts[0].id);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [competitorType, setCompetitorType] = useState(competitorTypeOptions[0]);
  const [format, setFormat] = useState(formatOptions[0]);
  const [timeRange, setTimeRange] = useState(timeRangeOptions[0]);
  const [selectedTrend, setSelectedTrend] = useState(selectedTrendOptions[0]);

  const filteredCompetitors = useMemo(() => {
    const demoCompetitors = demoCompetitorIds
      .map((id) => competitors.find((competitor) => competitor.id === id))
      .filter(Boolean) as CompetitorProfile[];

    return demoCompetitors.filter((competitor) => {
      const platformMatch = platform === "全部平台" || competitor.platform === (platformValue[platform] ?? platform);
      const typeMatch = competitorType === "全部类型" || competitor.type === typeValue[competitorType];
      const formatMatch = format === "全部格式" || competitor.bestFormat === formatValue[format];

      return platformMatch && typeMatch && formatMatch;
    });
  }, [platform, competitorType, format]);

  const visibleCompetitors = filteredCompetitors.length > 0 ? filteredCompetitors : demoCompetitorIds
    .map((id) => competitors.find((competitor) => competitor.id === id))
    .filter(Boolean) as CompetitorProfile[];
  const selectedCompetitor = visibleCompetitors.find((competitor) => competitor.id === selectedCompetitorId) ?? visibleCompetitors[0];
  const selectedPost =
    selectedCompetitor.winningPosts.find((post) => post.id === selectedPostId) ?? selectedCompetitor.winningPosts[0];

  const selectCompetitor = (competitor: CompetitorProfile) => {
    setSelectedCompetitorId(competitor.id);
    setSelectedPostId(competitor.winningPosts[0].id);
  };

  return (
    <AppShell title="竞品情报">
      <div className="space-y-5">
        <section className="animate-floatIn rounded-3xl border border-white/80 bg-white/82 p-5 shadow-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-blue">竞品情报</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">
                别人为什么做得好？
              </h1>
              <p className="mt-3 text-sm leading-6 text-ink-500">
                拆解竞品内容表现，找到可借鉴模式和机会缺口。
              </p>
              <div className="mt-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
                已选趋势：{selectedTrend}
              </div>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:max-w-3xl xl:grid-cols-3 2xl:grid-cols-5">
              <FieldSelect label="平台" value={platform} options={platformOptions} onChange={setPlatform} />
              <FieldSelect label="竞品类型" value={competitorType} options={competitorTypeOptions} onChange={setCompetitorType} />
              <FieldSelect label="内容格式" value={format} options={formatOptions} onChange={setFormat} />
              <FieldSelect label="时间范围" value={timeRange} options={timeRangeOptions} onChange={setTimeRange} />
              <FieldSelect label="趋势上下文" value={selectedTrend} options={selectedTrendOptions} onChange={setSelectedTrend} />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-5">
            <CompetitorOverview
              competitors={visibleCompetitors}
              selectedId={selectedCompetitor.id}
              onSelect={selectCompetitor}
            />
            <WinningPostBreakdown
              competitor={selectedCompetitor}
              selectedPost={selectedPost}
              onSelectPost={setSelectedPostId}
            />
          </section>

          <aside className="space-y-5 xl:sticky xl:top-0 xl:self-start">
            <AIDecisionPanel data={selectedCompetitor.decision} compact className="xl:col-span-1" />
            <SelectedPostInsight post={selectedPost} />
          </aside>
        </div>

        <OpportunityGapSection competitor={selectedCompetitor} />
        <StrategyTransition competitor={selectedCompetitor} selectedTrend={selectedTrend} />
      </div>
    </AppShell>
  );
}

function CompetitorOverview({
  competitors: visibleCompetitors,
  selectedId,
  onSelect
}: {
  competitors: CompetitorProfile[];
  selectedId: string;
  onSelect: (competitor: CompetitorProfile) => void;
}) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">竞品概览</h2>
          <p className="mt-1 text-sm text-ink-500">选择一个竞品后，模式、机会缺口和评论信号会同步更新。</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">
          {visibleCompetitors.length} 个竞品
        </span>
      </div>
      <div className="grid gap-3 2xl:grid-cols-2">
        {visibleCompetitors.map((competitor) => {
          const selected = competitor.id === selectedId;

          return (
            <button
              key={competitor.id}
              data-testid={`competitor-card-${competitor.id}`}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(competitor)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold">{competitor.name}</h3>
                    {selected ? <span className="rounded-full bg-brand-blue px-2.5 py-1 text-[11px] font-semibold text-white">已选中</span> : null}
                  </div>
                  <p className="mt-1 text-xs font-medium text-ink-500">
                    {competitor.platform} · {competitor.type}
                  </p>
                </div>
                <span className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-semibold text-ink-500">
                  {competitor.bestFormat}
                </span>
              </div>
              <div className="mt-4 grid gap-2">
                <InfoLine label="定位" value={competitor.positioning} />
                <InfoLine label="核心受众" value={competitor.audience} />
                <InfoLine label="主要风格" value={competitor.contentStyle} />
                <InfoLine label="最强主题" value={competitor.strongestTopic} />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <SignalBox label="优势" value={competitor.strength} tone="green" />
                <SignalBox label="弱点" value={competitor.weakness} tone="amber" />
                <SignalBox label="机会缺口" value={competitor.opportunityGap} tone="blue" />
              </div>
              <p className="mt-4 text-xs font-semibold text-brand-blue">
                {selected ? "正在查看高表现内容" : "查看高表现内容"}
              </p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-surface-soft px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-400">{label}</p>
      <p className="mt-1 text-xs font-medium leading-5 text-ink-700">{value}</p>
    </div>
  );
}

function SignalBox({ label, value, tone }: { label: string; value: string; tone: "green" | "amber" | "blue" }) {
  return (
    <div className={`min-w-0 rounded-xl px-3 py-2 ${toneClasses(tone)}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] opacity-70">{label}</p>
      <p className="mt-1 text-xs font-semibold leading-5">{value}</p>
    </div>
  );
}

function WinningPostBreakdown({
  competitor,
  selectedPost,
  onSelectPost
}: {
  competitor: CompetitorProfile;
  selectedPost: WinningPost;
  onSelectPost: (postId: string) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">高表现内容拆解</h2>
        <p className="mt-1 text-sm text-ink-500">
          基于已选竞品：<span className="font-medium text-ink-700">{competitor.name}</span>
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-3">
          {competitor.winningPosts.map((post) => {
            const selected = post.id === selectedPost.id;

            return (
              <button
                key={post.id}
                className={`focus-ring w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                  selected ? "border-blue-300 bg-blue-50/80" : "border-gray-200 bg-white hover:border-blue-100"
                }`}
                onClick={() => onSelectPost(post.id)}
              >
                <p className="text-sm font-semibold leading-5">{post.title}</p>
                <p className="mt-2 text-xs font-medium text-ink-500">
                  {post.platform} · {post.format}
                </p>
                <p className="mt-3 text-xs font-semibold text-brand-blue">{selected ? "已选内容" : "分析 Hook"}</p>
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Hook 分析</p>
          <h3 className="mt-2 text-lg font-semibold leading-7">{selectedPost.hook}</h3>
          <div className="mt-4 grid gap-3 2xl:grid-cols-2">
            <InfoLine label="主题" value={selectedPost.topic} />
            <InfoLine label="情绪触发" value={selectedPost.emotionalTrigger} />
            <InfoLine label="视觉风格" value={selectedPost.visualStyle} />
            <InfoLine label="CTA" value={selectedPost.cta} />
          </div>
          <div className="mt-4 rounded-2xl bg-white p-4">
            <p className="text-xs font-semibold text-ink-500">有效原因</p>
            <p className="mt-2 text-sm leading-6 text-ink-700">{selectedPost.whyWorked}</p>
          </div>
          <div className="mt-3 rounded-2xl bg-white p-4">
            <p className="text-xs font-semibold text-ink-500">受众反馈信号</p>
            <p className="mt-2 text-sm leading-6 text-ink-700">{selectedPost.responseSignal}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SelectedPostInsight({ post }: { post: WinningPost }) {
  return (
    <Card>
      <p className="text-sm font-semibold">已选内容模式</p>
      <p className="mt-1 text-xs text-ink-500">Hook、证据和模式洞察。</p>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">内容模式洞察</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-ink-950">{post.patternInsight}</p>
      </div>
      <div className="mt-4 space-y-3">
        <InfoLine label="Hook" value={post.hook} />
        <InfoLine label="格式" value={post.format} />
        <InfoLine label="受众信号" value={post.responseSignal} />
      </div>
    </Card>
  );
}

function PatternExtraction({ competitor }: { competitor: CompetitorProfile }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">模式提取</h2>
        <p className="mt-1 text-sm text-ink-500">
          我们能从 <span className="font-medium text-ink-700">{competitor.name}</span> 学到什么？
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {competitor.patterns.map((pattern) => (
          <div key={pattern.label} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">{pattern.label}</p>
            <p className="mt-3 text-sm font-semibold leading-5">{pattern.pattern}</p>
            <p className="mt-2 text-xs leading-5 text-ink-500">{pattern.evidence}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OpportunityGapSection({ competitor }: { competitor: CompetitorProfile }) {
  const gapItems = [
    { label: "竞品过度使用", value: competitor.gap.overused, tone: "amber" as const },
    { label: "竞品忽略", value: competitor.gap.ignored, tone: "blue" as const },
    { label: "未回答问题", value: competitor.gap.unanswered, tone: "purple" as const },
    { label: "可占领角度", value: competitor.gap.ownableAngle, tone: "green" as const },
    { label: "复制风险", value: competitor.gap.copyRisk, tone: "red" as const }
  ];

  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="mb-5">
        <p className="text-sm text-blue-100">机会缺口</p>
        <h2 className="mt-2 text-2xl font-semibold">我们可以如何差异化</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">
          基于已选竞品 {competitor.name} 的缺口分析，用来指导下一步内容策略决策。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {gapItems.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(item.tone)}`}>{item.label}</span>
            <p className="mt-4 text-sm font-semibold leading-6 text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AudienceCommentSignals({ competitor }: { competitor: CompetitorProfile }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">受众评论信号</h2>
        <p className="mt-1 text-sm text-ink-500">来自竞品评论的信号聚类，而不是展示大量模拟评论。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {competitor.comments.map((signal) => (
          <div key={signal.cluster} className="rounded-2xl border border-gray-100 bg-white p-4">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-blue">{signal.cluster}</span>
            <p className="mt-4 text-xs font-semibold text-ink-500">用户真正想问什么</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{signal.asking}</p>
            <p className="mt-3 text-xs font-semibold text-ink-500">为什么重要</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{signal.why}</p>
            <p className="mt-3 text-xs font-semibold text-brand-blue">内容机会</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{signal.opportunity}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompetitorComparisonMatrix({
  competitors: visibleCompetitors,
  selectedId,
  onSelect
}: {
  competitors: CompetitorProfile[];
  selectedId: string;
  onSelect: (competitor: CompetitorProfile) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">竞品对比矩阵</h2>
        <p className="mt-1 text-sm text-ink-500">比较定位、优势、弱点和机会缺口。</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-gray-100">
        <div className="min-w-[820px]">
          <div className="grid grid-cols-[1fr_1.1fr_1fr_1fr_1fr_1fr_1.1fr_1fr] gap-3 bg-surface-soft px-4 py-3 text-xs font-semibold text-ink-500">
            <span>竞品</span>
            <span>定位</span>
            <span>核心受众</span>
            <span>最佳格式</span>
            <span>优势</span>
            <span>弱点</span>
            <span>机会缺口</span>
            <span>推荐动作</span>
          </div>
          {visibleCompetitors.map((competitor) => (
            <button
              key={competitor.id}
              className={`grid w-full grid-cols-[1fr_1.1fr_1fr_1fr_1fr_1fr_1.1fr_1fr] gap-3 px-4 py-4 text-left text-xs transition hover:bg-blue-50/50 ${
                competitor.id === selectedId ? "bg-blue-50/70" : "bg-white"
              }`}
              onClick={() => onSelect(competitor)}
            >
              <span className="font-semibold text-ink-950">{competitor.name}</span>
              <span className="text-ink-600">{competitor.positioning}</span>
              <span className="text-ink-600">{competitor.audience}</span>
              <span className="text-ink-600">{competitor.bestFormat}</span>
              <span className="text-ink-600">{competitor.strength}</span>
              <span className="text-ink-600">{competitor.weakness}</span>
              <span className="text-brand-blue">{competitor.opportunityGap}</span>
              <span className="font-semibold text-brand-blue">查看模式</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

function StrategyTransition({ competitor, selectedTrend }: { competitor: CompetitorProfile; selectedTrend: string }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">下一步决策</p>
          <h2 className="mt-2 text-2xl font-semibold">把竞品洞察转化为内容策略</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <TransitionItem label="已选机会缺口" value={competitor.strategyTransition.selectedGap} />
            <TransitionItem label="推荐定位" value={competitor.strategyTransition.positioning} />
            <TransitionItem label="建议内容方向" value={competitor.strategyTransition.direction} />
          </div>
          <p className="mt-4 text-xs font-medium text-gray-400">趋势上下文：{selectedTrend}</p>
        </div>
        <Link
          href="/strategy"
          className="focus-ring rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-ink-950 shadow-card transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          生成内容策略
        </Link>
      </div>
    </section>
  );
}

function TransitionItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-white">{value}</p>
    </div>
  );
}
