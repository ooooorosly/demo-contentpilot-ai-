"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AIDecisionPanel, AppShell, Card, FieldSelect, type DecisionPanelData } from "@/components/workspace";

const suggestedTopics = [
  "上班族健康早餐",
  "五分钟早餐系统",
  "经济实惠的蛋白质早餐",
  "无冰箱办公室早餐清单"
];

const recentResearch = [
  { topic: "办公室人群健康早餐", status: "研究摘要已生成", time: "今天" },
  { topic: "五分钟早餐系统", status: "竞品信号已整理", time: "昨天" },
  { topic: "无冰箱办公室早餐清单", status: "受众意图已识别", time: "周一" }
];

const workflowStages = [
  { stage: "研究", status: "进行中", next: "明确研究主题、目标受众和决策目标。", active: true },
  { stage: "发现", status: "下一步", next: "找到趋势信号与机会聚类。", active: false },
  { stage: "竞品", status: "待处理", next: "比较竞品角度、格式和评论信号。", active: false },
  { stage: "策略", status: "待处理", next: "把证据转化为内容方向和内容支柱。", active: false },
  { stage: "发布", status: "待处理", next: "规划发布时间、顺序和平台适配。", active: false },
  { stage: "衡量", status: "待处理", next: "追踪能证明策略价值的指标。", active: false },
  { stage: "迭代", status: "待处理", next: "决定下一轮选题、系列或转向。", active: false }
];

const startingPoints = [
  {
    title: "上班族早餐系统",
    signal: "保存意图强",
    next: "研究日常格式和时间限制。"
  },
  {
    title: "经济实惠的蛋白质早餐",
    signal: "预算痛点明确",
    next: "比较成本拆解、替换方案和评论问题。"
  },
  {
    title: "无冰箱办公室早餐清单",
    signal: "下一轮机会明确",
    next: "整理无冰箱、低预算和通勤携带限制。"
  }
];

const quickActions = [
  { action: "进入趋势发现", detail: "为当前研究主题扩展趋势信号。" },
  { action: "比较竞品", detail: "从 Hook、格式和评论中找到证据。" },
  { action: "生成策略简报", detail: "把研究转化为内容支柱、角度和格式。" },
  { action: "规划衡量指标", detail: "定义信心、风险和成功信号。" }
];

const primaryDecision: DecisionPanelData = {
  recommendation: "先把主题作为决策空间研究，再进入内容资产制作。",
  why: "ContentPilot AI 应先识别信号、证据和风险，再推荐内容策略。",
  evidence: ["研究主题会成为全流程上下文", "趋势信号决定机会优先级", "竞品和受众证据能减少经验猜测"],
  confidence: 91,
  risk: "跳过研究会让策略变成泛泛的内容计划。",
  nextAction: "查看决策依据"
};

const recommendationPanels: DecisionPanelData[] = [
  {
    recommendation: "先验证受众意图，再决定内容格式。",
    why: "主题仍然较宽，受众需求会决定应该做清单、对比还是误区解析。",
    evidence: ["实用型日常方案搜索兴趣上升", "评论反复询问低门槛做法", "竞品内容过度集中在灵感展示"],
    confidence: 86,
    risk: "过早创作可能产出缺少决策角度的泛内容。",
    nextAction: "进入趋势发现"
  },
  {
    recommendation: "把竞品评论作为证据，而不只看高表现内容。",
    why: "评论能揭示未被回答的问题和行动阻力，这是单纯表现指标解释不了的。",
    evidence: ["时间成本问题反复出现", "高保存格式通常包含步骤结构", "低表现内容缺少具体限制条件"],
    confidence: 78,
    risk: "只复制表层格式会错过格式背后的受众问题。",
    nextAction: "分析竞品信号"
  }
];

const thinkingSteps = [
  "读取趋势信号...",
  "分析竞品...",
  "理解受众意图...",
  "生成内容机会...",
  "准备研究摘要..."
];

const selectorOptions = {
  platform: ["小红书"],
  audience: ["上班族", "办公室人群", "通勤人群"],
  goal: ["发现机会", "建立策略", "规划活动", "优化表现"]
};

export default function DashboardPage() {
  const router = useRouter();
  const [researchTopic, setResearchTopic] = useState("");
  const [isResearching, setIsResearching] = useState(false);

  const updateTopic = (topic: string) => {
    setResearchTopic(topic);
    setIsResearching(false);
  };

  const startResearch = () => {
    if (!researchTopic.trim()) {
      setResearchTopic("办公室人群健康早餐");
    }

    setIsResearching(true);
    window.setTimeout(() => router.push("/trends"), 650);
  };

  return (
    <AppShell title="工作台">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <AIResearchHero
          researchTopic={researchTopic}
          isResearching={isResearching}
          onTopicChange={updateTopic}
          onStartResearch={startResearch}
        />
        <AIDecisionPanel data={primaryDecision} delay="80ms" />

        <Card className="xl:col-span-12" delay="120ms">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-base font-semibold">工作流进度</h2>
              <p className="mt-1 text-sm text-ink-500">每一步都会继承当前研究主题作为上下文。</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
            {workflowStages.map((stage, index) => (
              <button
                key={stage.stage}
                className={`focus-ring group min-h-44 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                  stage.active ? "border-blue-200 bg-blue-50/70" : "border-gray-100 bg-surface-soft hover:border-gray-200 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-semibold text-ink-700 shadow-sm">
                    {index + 1}
                  </span>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${stage.active ? "bg-brand-blue text-white" : "bg-white text-ink-500"}`}>
                    {stage.status}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold group-hover:text-brand-blue">{stage.stage}</p>
                <p className="mt-2 text-xs leading-5 text-ink-500">{stage.next}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-12" delay="180ms">
          <div className="mb-5">
            <h2 className="text-base font-semibold">最近研究</h2>
            <p className="mt-1 text-xs text-ink-500">恢复一个策略工作区。</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {recentResearch.map((project) => (
              <button
                key={project.topic}
                className="focus-ring w-full rounded-2xl border border-gray-100 bg-surface-soft p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
                onClick={() => updateTopic(project.topic)}
              >
                <p className="text-sm font-semibold">{project.topic}</p>
                <p className="mt-1 text-xs text-ink-500">{project.status}</p>
                <p className="mt-3 text-xs font-semibold text-brand-blue">下一步：继续证据复核</p>
              </button>
            ))}
          </div>
        </Card>

      </div>
    </AppShell>
  );
}

function AIResearchHero({
  researchTopic,
  isResearching,
  onTopicChange,
  onStartResearch
}: {
  researchTopic: string;
  isResearching: boolean;
  onTopicChange: (topic: string) => void;
  onStartResearch: () => void;
}) {
  const [platform, setPlatform] = useState(selectorOptions.platform[0]);
  const [audience, setAudience] = useState(selectorOptions.audience[0]);
  const [goal, setGoal] = useState(selectorOptions.goal[0]);
  const [competitor, setCompetitor] = useState("");

  const submitResearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onStartResearch();
  };

  return (
    <section className="animate-floatIn overflow-hidden rounded-3xl border border-white/80 bg-ink-950 p-5 text-white shadow-glass xl:col-span-8">
      <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm text-blue-100">开始今天的研究</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">今天研究什么？</h1>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              从一个内容想法开始，生成完整的研究与策略工作流。
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-gray-200">
            <span className="text-gray-400">示例：</span> 研究面向上班族的健康早餐内容机会。
          </div>
        </div>

        <form className="mt-7 rounded-3xl border border-white/10 bg-white p-4 text-ink-950 shadow-lift transition duration-200 focus-within:-translate-y-0.5 focus-within:shadow-glass" onSubmit={submitResearch}>
          <label className="sr-only" htmlFor="research-topic">
            研究主题
          </label>
          <input
            id="research-topic"
            className="h-14 w-full rounded-2xl border border-gray-100 bg-surface-soft px-4 text-base font-medium outline-none transition placeholder:text-ink-400 focus:border-blue-200 focus:bg-white"
            placeholder="示例：研究面向上班族的健康早餐内容机会。"
            value={researchTopic}
            onChange={(event) => onTopicChange(event.target.value)}
          />

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <FieldSelect label="平台" value={platform} options={selectorOptions.platform} onChange={setPlatform} />
            <FieldSelect label="受众" value={audience} options={selectorOptions.audience} onChange={setAudience} />
            <FieldSelect label="目标" value={goal} options={selectorOptions.goal} onChange={setGoal} />
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-500">竞品（可选）</span>
              <input
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none transition placeholder:text-ink-400 focus:border-blue-200 focus:bg-blue-50/30"
                placeholder="@账号或品牌"
                value={competitor}
                onChange={(event) => setCompetitor(event.target.value)}
              />
            </label>
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs font-medium leading-5 text-ink-500">主题上下文：{researchTopic.trim() || "等待输入研究主题"}</p>
            <button className="focus-ring rounded-2xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-blue-700" type="submit">
              {isResearching ? "正在进入趋势发现..." : "开始研究"}
            </button>
          </div>
        </form>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">建议起点</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestedTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => onTopicChange(topic)}
                className="focus-ring rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-xs font-medium text-gray-100 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:text-ink-950"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isResearching ? (
        <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.05] p-4">
          <p className="text-sm font-semibold">AI 正在建立研究上下文</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {thinkingSteps.slice(0, 4).map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulseSoft" style={{ animationDelay: `${index * 160}ms` }} />
                <span className="text-sm text-gray-100">{step}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
