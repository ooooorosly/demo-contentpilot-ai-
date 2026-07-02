"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AIDecisionPanel, AppShell, Card, FieldSelect, toneClasses, type DecisionPanelData } from "@/components/workspace";

type PositioningMode = "安全方向" | "推荐方向" | "大胆方向";

type Pillar = {
  id: string;
  name: string;
  need: string;
  topics: string[];
  format: string;
  value: string;
  firstBrief: string;
};

type Format = {
  id: string;
  name: string;
  why: string;
  behavior: string;
  example: string;
  pillarIds: string[];
};

type Strategy = {
  id: string;
  topic: string;
  platform: string;
  trend: string;
  gap: string;
  timeRange: string;
  mode: PositioningMode;
  recommended: boolean;
  title: string;
  angle: string;
  whyWorks: string;
  risk: string;
  useCase: string;
  direction: string;
  why: string;
  audience: string;
  painPoint: string;
  differentiation: string;
  expectedOutcome: string;
  confidence: number;
  audienceDecision: {
    who: string;
    cares: string;
    tension: string;
    belief: string;
    objection: string;
  };
  decision: DecisionPanelData;
  pillars: Pillar[];
  formats: Format[];
  brief: {
    objective: string;
    insight: string;
    tone: string;
    cta: string;
    metrics: string;
  };
  risks: Array<{
    name: string;
    why: string;
    mitigation: string;
  }>;
};

const strategies: Strategy[] = [
  {
    id: "safe",
    topic: "办公室人群健康早餐",
    platform: "小红书",
    trend: "五分钟早餐系统",
    gap: "简单工作日早餐灵感",
    timeRange: "本月",
    mode: "安全方向",
    recommended: false,
    title: "简单工作日早餐灵感",
    angle: "用低门槛早餐灵感降低用户的行动成本。",
    whyWorks: "执行成本低，适合测试视觉风格与基础受众兴趣。",
    risk: "差异化较弱，容易变成普通健康生活内容。",
    useCase: "适合早期试水或轻量内容日历。",
    direction: "围绕简单、轻负担的工作日早餐灵感做内容验证。",
    why: "这个方向容易启动，但只能作为测试，不适合作为长期主策略。",
    audience: "想要轻松早餐灵感的忙碌上班族",
    painPoint: "早餐重复、早晨没精力做复杂选择。",
    differentiation: "用更清晰的时间约束和小替换建议提升实用性。",
    expectedOutcome: "获得基础保存和评论反馈，判断用户是否需要更强的规划系统。",
    confidence: 73,
    audienceDecision: {
      who: "正在寻找低压力早餐想法的办公室人群。",
      cares: "省事、好执行、看起来不复杂。",
      tension: "想吃得更好，但不想增加早晨决策负担。",
      belief: "健康早餐可以从一个简单替换开始。",
      objection: "我早上不想再多想一件事。"
    },
    decision: {
      recommendation: "安全方向适合验证兴趣，但不建议作为主线策略。",
      why: "它能降低内容生产难度，却没有充分利用竞品分析中最强的预算与规划缺口。",
      evidence: ["受众门槛低", "执行成本低", "差异化较弱", "长期系列空间有限"],
      confidence: 73,
      risk: "如果只做灵感列表，用户很难形成关注理由。",
      nextAction: "补充一个明确的规划约束"
    },
    pillars: [
      {
        id: "easy-ideas",
        name: "轻量早餐灵感",
        need: "快速找到明天能做的早餐。",
        topics: ["三种不费脑早餐", "周一早餐重启", "不用开火的早餐组合"],
        format: "灵感笔记",
        value: "低成本测试用户兴趣。",
        firstBrief: "制作一篇三种工作日早餐灵感笔记，每种都标注准备时间。"
      },
      {
        id: "small-swaps",
        name: "小替换建议",
        need: "不用重做生活方式，也能改善早餐。",
        topics: ["把便利店早餐换成这个", "一个蛋白质加法", "三种更耐饿的小替换"],
        format: "前后对比卡片",
        value: "用轻教育建立信任。",
        firstBrief: "做一组早餐小替换对比，展示时间、成本和饱腹感差异。"
      },
      {
        id: "morning-calm",
        name: "早晨减压流程",
        need: "在工作开始前获得一点掌控感。",
        topics: ["打开电脑前的早餐流程", "赶时间也能完成的早餐", "办公桌早餐仪式"],
        format: "流程笔记",
        value: "建立情绪共鸣。",
        firstBrief: "围绕“赶时间的早晨”写一份两步早餐流程简报。"
      }
    ],
    formats: [
      {
        id: "editorial-note",
        name: "灵感笔记",
        why: "适合轻量浏览和低门槛保存。",
        behavior: "支持快速收藏和评论补充需求。",
        example: "周一早上可以直接照做的三种早餐。",
        pillarIds: ["easy-ideas", "morning-calm"]
      },
      {
        id: "before-after",
        name: "前后对比卡片",
        why: "能把小替换的价值表达得更清楚。",
        behavior: "支持快速理解和低成本尝试。",
        example: "看起来健康的早餐 vs 真正能撑到中午的早餐。",
        pillarIds: ["small-swaps"]
      }
    ],
    brief: {
      objective: "验证办公室人群对简单早餐灵感的保存意愿。",
      insight: "用户可能先被轻量内容吸引，但后续仍需要更明确的规划帮助。",
      tone: "轻松、简洁、低压力。",
      cta: "明天先试一个。",
      metrics: "保存率、评论问题、点击进入下一篇比例"
    },
    risks: [
      { name: "差异化不足", why: "灵感内容容易被替代。", mitigation: "每篇至少加入一个时间或预算约束。" },
      { name: "内容疲劳", why: "列表结构重复后保存率会下降。", mitigation: "轮换对比、流程和场景化表达。" },
      { name: "策略深度不足", why: "用户可能看完即走。", mitigation: "用系列化标题引导下一步规划。" }
    ]
  },
  {
    id: "recommended",
    topic: "办公室人群健康早餐",
    platform: "小红书",
    trend: "平价高蛋白早餐",
    gap: "面向上班族的预算友好早餐规划",
    timeRange: "本月",
    mode: "推荐方向",
    recommended: true,
    title: "忙碌上班族的实用早餐系统",
    angle: "把健康早餐从灵感内容变成可重复执行的工作日规划系统。",
    whyWorks: "它同时回应趋势信号、竞品缺口和用户评论里的预算焦虑。",
    risk: "如果缺少具体证据，会退化成普通早餐清单。",
    useCase: "适合作为首个主线内容系列。",
    direction: "主打“预算友好 + 五分钟 + 办公室场景”的早餐规划系统。",
    why: "趋势和竞品信号都指向同一个问题：用户不缺灵感，缺可执行的约束和规划。",
    audience: "时间有限、预算有限的办公室人群",
    painPoint: "健康早餐建议看起来不现实、太贵，或难以在工作日坚持。",
    differentiation: "用单份成本、准备时间和办公室约束建立可验证的内容结构。",
    expectedOutcome: "提升保存率、评论提问量和系列复访意愿。",
    confidence: 89,
    audienceDecision: {
      who: "想改善早餐，但不想增加早晨压力的上班族。",
      cares: "时间、预算、饱腹感、便携性和可重复性。",
      tension: "他们想吃得更健康，但多数建议默认有时间、有预算、有食材。",
      belief: "健康早餐可以是实际、平价且可重复的系统。",
      objection: "我没有时间、预算，也没有那么多食材。"
    },
    decision: {
      recommendation: "优先选择“预算友好的办公室早餐规划系统”。",
      why: "这个方向把趋势增长、竞品缺口和用户痛点连接在一起，最能支持后续内容系列化。",
      evidence: ["评论反复提到预算压力", "清单与对比格式更容易被保存", "办公室场景让受众更明确", "成本与时间证据能提升决策价值"],
      confidence: 89,
      risk: "不要只做早餐列表，必须持续展示成本、时间和场景约束。",
      nextAction: "生成内容简报"
    },
    pillars: [
      {
        id: "fast-systems",
        name: "五分钟早餐系统",
        need: "减少早晨决策疲劳。",
        topics: ["8:30 前出门的早餐系统", "两分钟办公室早餐公式", "周日准备五个工作日早餐"],
        format: "清单轮播",
        value: "形成高保存率的可重复内容资产。",
        firstBrief: "生成一份“五分钟工作日早餐系统”内容简报，包含步骤、食材和保存理由。"
      },
      {
        id: "budget-swaps",
        name: "平价蛋白质替换",
        need: "不用昂贵补剂也能吃够蛋白质。",
        topics: ["不用蛋白粉的早餐", "咖啡店早餐 vs 超市早餐", "三种平价耐饿食材"],
        format: "对比轮播",
        value: "把预算焦虑转化为品牌信任。",
        firstBrief: "生成一份“平价蛋白质替换”内容简报，对比常见高价早餐选择。"
      },
      {
        id: "office-constraints",
        name: "办公室无冰箱早餐",
        need: "找到通勤和办公桌都能成立的选择。",
        topics: ["无冰箱早餐矩阵", "通勤友好早餐包", "办公桌备用早餐清单"],
        format: "购物清单说明",
        value: "用真实工作场景建立差异化。",
        firstBrief: "生成一份“无冰箱办公室早餐矩阵”内容简报，按成本、时间和饱腹感分类。"
      },
      {
        id: "mistakes",
        name: "早餐失败原因",
        need: "理解为什么早餐撑不到中午。",
        topics: ["为什么 10 点就饿", "上班族早餐常见错误", "好看早餐 vs 有用早餐"],
        format: "误区解析",
        value: "建立策略可信度，而不是只给灵感。",
        firstBrief: "生成一份“上班族早餐失败原因”内容简报，每个错误配一个替代方案。"
      },
      {
        id: "planning",
        name: "购物清单规划",
        need: "用一次采购解决一周早餐。",
        topics: ["一张清单五顿早餐", "低预算早餐购物篮", "食材复用地图"],
        format: "规划模板轮播",
        value: "支持系列化和复访。",
        firstBrief: "生成一份“一张购物清单五顿办公室早餐”内容简报。"
      }
    ],
    formats: [
      {
        id: "checklist",
        name: "清单轮播",
        why: "能把早餐系统拆成可保存、可复用的步骤。",
        behavior: "支持保存、复访和周计划使用。",
        example: "如果你 8:30 前出门，保存这套早餐系统。",
        pillarIds: ["fast-systems", "planning"]
      },
      {
        id: "comparison",
        name: "对比轮播",
        why: "竞品分析显示，成本对比能快速帮助用户做决定。",
        behavior: "支持评论讨论和成本判断。",
        example: "咖啡店早餐 vs 超市早餐：成本、蛋白质和准备时间对比。",
        pillarIds: ["budget-swaps", "mistakes"]
      },
      {
        id: "routine-video",
        name: "短流程视频",
        why: "用真实准备过程证明这套系统可执行。",
        behavior: "支持完播率和信任建立。",
        example: "出门前五分钟打包一份办公室早餐。",
        pillarIds: ["fast-systems", "office-constraints"]
      },
      {
        id: "grocery",
        name: "购物清单说明",
        why: "规划型策略需要让食材复用逻辑可见。",
        behavior: "支持保存、提问和系列追更。",
        example: "一张购物清单，五顿早餐，三种复用食材。",
        pillarIds: ["budget-swaps", "planning", "office-constraints"]
      }
    ],
    brief: {
      objective: "建立一个帮助上班族规划平价健康早餐的内容系列。",
      insight: "用户不缺早餐灵感，缺少能处理时间、预算和食材限制的系统。",
      tone: "实用、克制、有证据感、不评判。",
      cta: "保存到下次买菜前。",
      metrics: "保存率、评论问题、关注转化、完播率"
    },
    risks: [
      { name: "差异化变弱", why: "早餐建议很容易变成普通清单。", mitigation: "每篇固定展示成本、时间或办公室约束。" },
      { name: "预算表达被质疑", why: "价格会因地区变化而不稳定。", mitigation: "使用价格区间和明确假设，不写过度精确数字。" },
      { name: "内容重复", why: "系统型内容容易结构相似。", mitigation: "轮换清单、对比、误区和购物规划四类格式。" }
    ]
  },
  {
    id: "bold",
    topic: "办公室人群健康早餐",
    platform: "小红书",
    trend: "平价高蛋白早餐",
    gap: "单份成本早餐规划",
    timeRange: "本月",
    mode: "大胆方向",
    recommended: false,
    title: "单份成本早餐规划系统",
    angle: "把“每一份多少钱”作为所有早餐内容的核心策略语言。",
    whyWorks: "差异化最强，能直接回应用户对健康饮食成本的焦虑。",
    risk: "价格证据维护成本高，容易被用户挑战。",
    useCase: "适合做旗舰系列，但需要更严格的数据规则。",
    direction: "用单份成本、饱腹感和食材复用构建强证据型早餐策略。",
    why: "这是最鲜明的机会缺口，但对执行准确度要求最高。",
    audience: "对预算高度敏感的上班族和初入职场人群",
    painPoint: "健康早餐看起来隐藏成本高、浪费食材、不够现实。",
    differentiation: "每个内容都展示成本逻辑、替换路径和复用方式。",
    expectedOutcome: "获得更高质量的保存、分享和替换类评论。",
    confidence: 82,
    audienceDecision: {
      who: "会主动比较外食和买菜成本的办公室人群。",
      cares: "周成本、饱腹感、食材复用和替代方案。",
      tension: "他们怀疑健康早餐只是另一种昂贵生活方式。",
      belief: "平价早餐也可以稳定、健康并且不将就。",
      objection: "便宜的选择真的能吃饱吗？"
    },
    decision: {
      recommendation: "只有在能维护价格证据时，才把单份成本方向做成旗舰系列。",
      why: "它最能占住竞品未覆盖的预算缺口，但需要更强的证据纪律。",
      evidence: ["预算反对意见高频出现", "对比格式已被验证", "成本视角降低竞争同质化", "价格证据能建立信任"],
      confidence: 82,
      risk: "过度精确的价格会快速过时，也可能被不同城市用户质疑。",
      nextAction: "先建立证据规则"
    },
    pillars: [
      {
        id: "cost",
        name: "成本拆解",
        need: "判断一套早餐是否真的负担得起。",
        topics: ["早餐单份成本拆解", "咖啡店早餐 vs 买菜早餐", "一周早餐预算表"],
        format: "成本对比轮播",
        value: "建立强证据差异化。",
        firstBrief: "生成一份“咖啡店早餐 vs 买菜早餐”的成本对比内容简报。"
      },
      {
        id: "reuse",
        name: "食材复用系统",
        need: "避免浪费和重复。",
        topics: ["一种食材三种早餐", "一篮食材五顿早餐", "不浪费早餐地图"],
        format: "规划模板轮播",
        value: "让预算策略变成可持续系列。",
        firstBrief: "生成一份“一篮食材五顿早餐”的内容简报。"
      },
      {
        id: "satiety",
        name: "平价饱腹证据",
        need: "相信便宜早餐也能撑到中午。",
        topics: ["便宜但耐饿的早餐", "不用补剂的蛋白质", "早餐稳定器"],
        format: "证据说明卡",
        value: "减少用户对低价方案的信任阻力。",
        firstBrief: "生成一份“便宜早餐如何撑到中午”的证据说明简报。"
      }
    ],
    formats: [
      {
        id: "cost-comparison",
        name: "成本对比轮播",
        why: "直接把预算决策可视化。",
        behavior: "支持保存、分享和评论纠错。",
        example: "同样一周早餐，外食和买菜分别花多少。",
        pillarIds: ["cost", "satiety"]
      },
      {
        id: "planning-template",
        name: "规划模板轮播",
        why: "预算策略需要可复用的购买和搭配系统。",
        behavior: "支持反复保存和系列追更。",
        example: "一篮食材如何组合出五顿工作日早餐。",
        pillarIds: ["reuse", "cost"]
      },
      {
        id: "evidence-card",
        name: "证据说明卡",
        why: "用简单证据回应“便宜不等于没营养”的疑虑。",
        behavior: "支持信任建立和理性评论。",
        example: "为什么这三种平价食材更耐饿。",
        pillarIds: ["satiety"]
      }
    ],
    brief: {
      objective: "用成本证据占领平价早餐策略心智。",
      insight: "预算焦虑不是附加问题，而是用户是否行动的核心障碍。",
      tone: "透明、精确、实用。",
      cta: "保存到下次买菜前。",
      metrics: "保存率、分享率、替换类评论、关注转化"
    },
    risks: [
      { name: "价格争议", why: "不同地区价格差异会影响可信度。", mitigation: "使用区间、注明假设，并鼓励本地替换。" },
      { name: "过度理性", why: "只谈价格会降低内容温度。", mitigation: "加入真实通勤和早晨压力场景。" },
      { name: "执行成本高", why: "每篇都需要成本核算和证据检查。", mitigation: "先建立固定模板和价格口径。" }
    ]
  }
];

const topicOptions = ["办公室人群健康早餐"];
const platformOptions = ["小红书"];
const trendOptions = ["平价高蛋白早餐", "五分钟早餐系统", "无烹饪备餐"];
const timeRangeOptions = ["本月", "本周", "近 90 天"];

export default function ContentStrategyPage() {
  const [selectedStrategyId, setSelectedStrategyId] = useState("recommended");
  const [selectedPillarId, setSelectedPillarId] = useState("fast-systems");
  const [topic, setTopic] = useState(topicOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [trend, setTrend] = useState(trendOptions[0]);
  const [timeRange, setTimeRange] = useState(timeRangeOptions[0]);
  const [strategyConfirmed, setStrategyConfirmed] = useState(false);

  const selectedStrategy = strategies.find((strategy) => strategy.id === selectedStrategyId) ?? strategies[1];
  const selectedPillar =
    selectedStrategy.pillars.find((pillar) => pillar.id === selectedPillarId) ?? selectedStrategy.pillars[0];
  const visibleFormats = useMemo(
    () => selectedStrategy.formats.filter((format) => format.pillarIds.includes(selectedPillar.id)),
    [selectedPillar.id, selectedStrategy.formats]
  );
  const selectedFormats = visibleFormats.length > 0 ? visibleFormats : selectedStrategy.formats;

  const selectStrategy = (strategy: Strategy) => {
    setSelectedStrategyId(strategy.id);
    setSelectedPillarId(strategy.pillars[0].id);
    setTrend(strategy.trend);
    setStrategyConfirmed(false);
  };

  const selectGap = (gap: string) => {
    const nextStrategy = strategies.find((strategy) => strategy.gap === gap);

    if (nextStrategy) {
      selectStrategy(nextStrategy);
    }
  };

  return (
    <AppShell title="内容策略">
      <div className="space-y-5">
        <section className="animate-floatIn rounded-3xl border border-white/80 bg-white/82 p-5 shadow-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-blue">内容策略</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">我们的内容方向是什么？</h1>
              <p className="mt-3 text-sm leading-6 text-ink-500">
                把趋势和竞品洞察转化为清晰的内容方向。
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ContextChip label="已选趋势" value={trend} />
                <ContextChip label="机会缺口" value={selectedStrategy.gap} />
              </div>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:max-w-3xl xl:grid-cols-3 2xl:grid-cols-5">
              <FieldSelect label="研究主题" value={topic} options={topicOptions} onChange={setTopic} />
              <FieldSelect label="平台" value={platform} options={platformOptions} onChange={setPlatform} />
              <FieldSelect label="选中趋势" value={trend} options={trendOptions} onChange={setTrend} />
              <FieldSelect label="机会缺口" value={selectedStrategy.gap} options={strategies.map((strategy) => strategy.gap)} onChange={selectGap} />
              <FieldSelect label="时间范围" value={timeRange} options={timeRangeOptions} onChange={setTimeRange} />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-5">
            <StrategyRecommendation strategy={selectedStrategy} />
            <PositioningOptions selectedId={selectedStrategy.id} onSelect={selectStrategy} />
            <ContentPillars strategy={selectedStrategy} selectedPillarId={selectedPillar.id} onSelect={setSelectedPillarId} />
          </section>

          <aside className="space-y-5 xl:sticky xl:top-0 xl:self-start">
            <AIDecisionPanel data={selectedStrategy.decision} compact className="xl:col-span-1" />
            <button
              className={`focus-ring w-full rounded-2xl border px-5 py-3 text-center text-sm font-semibold transition hover:-translate-y-0.5 ${
                strategyConfirmed
                  ? "border-green-100 bg-green-50 text-brand-green hover:bg-green-100"
                  : "border-gray-200 bg-white text-ink-700 hover:bg-surface-soft"
              }`}
              onClick={() => setStrategyConfirmed(true)}
            >
              {strategyConfirmed ? "策略方向已确认" : "确认策略方向"}
            </button>
            <FirstBriefCard pillar={selectedPillar} format={selectedFormats[0]} />
          </aside>
        </div>

        <StrategyBrief strategy={selectedStrategy} selectedPillar={selectedPillar} selectedFormats={selectedFormats} />
        <StrategyTransition strategy={selectedStrategy} selectedPillar={selectedPillar} selectedFormat={selectedFormats[0]} />
      </div>
    </AppShell>
  );
}

function ContextChip({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">{label}: {value}</span>;
}

function StrategyRecommendation({ strategy }: { strategy: Strategy }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm text-blue-100">推荐内容方向</p>
          <h2 className="mt-3 text-2xl font-semibold leading-8">{strategy.direction}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">{strategy.why}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">信心分数</p>
          <p className="mt-1 text-2xl font-semibold">{strategy.confidence}%</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        <DarkInfo label="为什么推荐" value={strategy.whyWorks} />
        <DarkInfo label="目标受众" value={strategy.audience} />
        <DarkInfo label="核心痛点" value={strategy.painPoint} />
        <DarkInfo label="差异化" value={strategy.differentiation} />
        <DarkInfo label="预期结果" value={strategy.expectedOutcome} />
      </div>
    </section>
  );
}

function AudienceDecision({ strategy }: { strategy: Strategy }) {
  const items = [
    { label: "我们在对谁说话", value: strategy.audienceDecision.who },
    { label: "他们关心什么", value: strategy.audienceDecision.cares },
    { label: "真实张力", value: strategy.audienceDecision.tension },
    { label: "需要改变的认知", value: strategy.audienceDecision.belief },
    { label: "必须处理的反对意见", value: strategy.audienceDecision.objection }
  ];

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-base font-semibold">受众决策</h2>
        <p className="mt-1 text-sm text-ink-500">先明确受众张力，再进入内容简报。</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {items.map((item) => (
          <InfoBlock key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </Card>
  );
}

function PositioningOptions({ selectedId, onSelect }: { selectedId: string; onSelect: (strategy: Strategy) => void }) {
  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-base font-semibold">定位方向对比</h2>
        <p className="mt-1 text-sm text-ink-500">选择策略强度，相关内容支柱、格式建议和策略简报会同步更新。</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {strategies.map((strategy) => {
          const selected = strategy.id === selectedId;
          const tone = strategy.mode === "推荐方向" ? "blue" : strategy.mode === "大胆方向" ? "purple" : "neutral";

          return (
            <button
              key={strategy.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(strategy)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{strategy.mode}</span>
                {selected ? <span className="rounded-full bg-brand-blue px-2.5 py-1 text-xs font-semibold text-white">已选中</span> : null}
              </div>
              <h3 className="mt-4 text-sm font-semibold leading-5">{strategy.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-600">{strategy.angle}</p>
              <div className="mt-4 space-y-3">
                <InfoLine label="为什么可能有效" value={strategy.whyWorks} />
                <InfoLine label="风险" value={strategy.risk} />
                <InfoLine label="适用场景" value={strategy.useCase} />
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function ContentPillars({
  strategy,
  selectedPillarId,
  onSelect
}: {
  strategy: Strategy;
  selectedPillarId: string;
  onSelect: (pillarId: string) => void;
}) {
  return (
    <Card>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">内容支柱</h2>
          <p className="mt-1 text-sm text-ink-500">把策略方向拆成可持续生产的内容领地。</p>
        </div>
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">{strategy.mode}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {strategy.pillars.map((pillar) => {
          const selected = pillar.id === selectedPillarId;

          return (
            <button
              key={pillar.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(pillar.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold leading-5">{pillar.name}</h3>
                {selected ? <span className="rounded-full bg-brand-blue px-2 py-1 text-[11px] font-semibold text-white">已选中</span> : null}
              </div>
              <p className="mt-3 text-xs font-semibold text-ink-500">受众需求</p>
              <p className="mt-1 text-sm leading-6 text-ink-700">{pillar.need}</p>
              <p className="mt-3 text-xs font-semibold text-ink-500">示例选题</p>
              <p className="mt-1 text-sm leading-6 text-ink-700">{pillar.topics.slice(0, 2).join(" / ")}</p>
              <p className="mt-3 text-xs font-semibold text-ink-500">适合格式</p>
              <p className="mt-1 text-sm font-semibold text-brand-blue">{pillar.format}</p>
              <p className="mt-3 text-xs font-semibold text-ink-500">商业价值</p>
              <p className="mt-1 text-sm leading-6 text-ink-700">{pillar.value}</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function FormatRecommendation({ selectedPillar, formats }: { selectedPillar: Pillar; formats: Format[] }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">格式建议</h2>
        <p className="mt-1 text-sm text-ink-500">
          基于已选内容支柱：<span className="font-medium text-ink-700">{selectedPillar.name}</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {formats.map((format) => (
          <div key={format.id} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-brand-purple">{format.name}</span>
            <p className="mt-4 text-xs font-semibold text-ink-500">为什么适合</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{format.why}</p>
            <p className="mt-3 text-xs font-semibold text-ink-500">支持的用户行为</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{format.behavior}</p>
            <p className="mt-3 text-xs font-semibold text-brand-blue">示例用法</p>
            <p className="mt-1 text-sm font-medium leading-6 text-ink-950">{format.example}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StrategyBrief({
  strategy,
  selectedPillar,
  selectedFormats
}: {
  strategy: Strategy;
  selectedPillar: Pillar;
  selectedFormats: Format[];
}) {
  const rows = [
    { label: "目标", value: strategy.brief.objective },
    { label: "受众", value: strategy.audience },
    { label: "关键洞察", value: strategy.brief.insight },
    { label: "内容方向", value: strategy.direction },
    { label: "差异化", value: strategy.differentiation },
    { label: "内容支柱", value: strategy.pillars.map((pillar) => pillar.name).join("、") },
    { label: "格式组合", value: selectedFormats.map((format) => format.name).join("、") },
    { label: "语气", value: strategy.brief.tone },
    { label: "CTA", value: strategy.brief.cta },
    { label: "衡量指标", value: strategy.brief.metrics }
  ];

  return (
    <Card>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-base font-semibold">策略简报</h2>
          <p className="mt-1 text-sm text-ink-500">可直接进入内容工作室的执行摘要。</p>
        </div>
        <div className="rounded-2xl bg-blue-50 px-4 py-3">
          <p className="text-xs font-semibold text-brand-blue">建议第一份内容简报</p>
          <p className="mt-1 text-sm font-semibold leading-5 text-ink-950">{selectedPillar.firstBrief}</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {rows.map((row) => (
          <InfoBlock key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </Card>
  );
}

function RiskReview({ strategy }: { strategy: Strategy }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">风险检查</h2>
        <p className="mt-1 text-sm text-ink-500">只保留会影响策略执行的关键风险。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {strategy.risks.map((risk) => (
          <div key={risk.name} className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4">
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand-amber">{risk.name}</span>
            <p className="mt-4 text-xs font-semibold text-ink-500">为什么重要</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{risk.why}</p>
            <p className="mt-3 text-xs font-semibold text-brand-blue">如何规避</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{risk.mitigation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function StrategyTransition({
  strategy,
  selectedPillar,
  selectedFormat
}: {
  strategy: Strategy;
  selectedPillar: Pillar;
  selectedFormat: Format;
}) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">下一步</p>
          <h2 className="mt-2 text-2xl font-semibold">把策略转化为可执行内容简报</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <DarkInfo label="当前推荐方向" value={strategy.direction} />
            <DarkInfo label="推荐首个内容支柱" value={selectedPillar.name} />
            <DarkInfo label="推荐首个内容格式" value={selectedFormat.name} />
            <DarkInfo label="建议第一份内容简报" value={selectedPillar.firstBrief} />
          </div>
        </div>
        <Link
          href="/studio"
          className="focus-ring rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-ink-950 shadow-card transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          生成内容简报
        </Link>
      </div>
    </section>
  );
}

function FirstBriefCard({ pillar, format }: { pillar: Pillar; format: Format }) {
  return (
    <Card>
      <p className="text-sm font-semibold">当前执行建议</p>
      <p className="mt-1 text-xs text-ink-500">选择内容支柱后，第一份内容简报会同步更新。</p>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue">建议第一份内容简报</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-ink-950">{pillar.firstBrief}</p>
      </div>
      <div className="mt-4 grid gap-3">
        <InfoLine label="首个内容支柱" value={pillar.name} />
        <InfoLine label="首个内容格式" value={format.name} />
      </div>
    </Card>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-gray-100 bg-surface-soft p-4">
      <p className="break-words text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-400 [overflow-wrap:anywhere]">{label}</p>
      <p className="mt-2 break-words text-sm font-medium leading-6 text-ink-700 [overflow-wrap:anywhere]">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-surface-soft px-3 py-2">
      <p className="break-words text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-400 [overflow-wrap:anywhere]">{label}</p>
      <p className="mt-1 break-words text-xs font-medium leading-5 text-ink-700 [overflow-wrap:anywhere]">{value}</p>
    </div>
  );
}

function DarkInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="break-words text-xs font-semibold uppercase tracking-[0.08em] text-gray-400 [overflow-wrap:anywhere]">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold leading-6 text-white [overflow-wrap:anywhere]">{value}</p>
    </div>
  );
}
