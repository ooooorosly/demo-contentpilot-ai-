"use client";

import Link from "next/link";
import { useState } from "react";
import { AIDecisionPanel, AppShell, Card, FieldSelect, toneClasses, type DecisionPanelData } from "@/components/workspace";

type AssetStatus = "Needed" | "Ready" | "Optional";

type StudioPillar = {
  id: string;
  name: string;
  format: string;
  direction: string;
  brief: ContentBrief;
  assets: AssetItem[];
  drafts: DraftVariant[];
};

type ContentBrief = {
  objective: string;
  audience: string;
  painPoint: string;
  message: string;
  structure: string;
  hookDirection: string;
  visualDirection: string;
  cta: string;
  metrics: string;
};

type DraftVariant = {
  id: string;
  name: string;
  title: string;
  hook: string;
  outline: string[];
  body: string;
  caption: string;
  visual: string;
  useCase: string;
  strategyFit: string;
  hashtags: string;
  scores: {
    strategy: number;
    hook: number;
    clarity: number;
    platform: number;
    differentiation: number;
    conversion: number;
  };
  decision: DecisionPanelData;
};

type AssetItem = {
  name: string;
  status: AssetStatus;
};

type EditableDraft = {
  title: string;
  hook: string;
  body: string;
  caption: string;
  cta: string;
  hashtags: string;
  visual: string;
};

const studioPillars: StudioPillar[] = [
  {
    id: "fast-systems",
    name: "五分钟早餐系统",
    format: "清单轮播",
    direction: "预算友好 + 五分钟 + 办公室场景的早餐规划系统",
    brief: {
      objective: "让上班族保存一套明天就能执行的五分钟早餐系统。",
      audience: "时间有限、预算有限的办公室人群",
      painPoint: "早晨太赶，健康早餐看起来要么太贵，要么太麻烦。",
      message: "健康早餐不是灵感问题，而是一个可重复的工作日系统。",
      structure: "痛点开场 → 三步公式 → 五个组合 → 保存理由 → 评论引导",
      hookDirection: "先点名早晨时间压力，再给出可执行系统。",
      visualDirection: "清爽表格、食材分组、时间标签和保存友好的 checklist 版式。",
      cta: "保存到明天早上用。",
      metrics: "保存率、评论提问、关注转化、轮播完读率"
    },
    assets: [
      { name: "封面图", status: "Needed" },
      { name: "食材图片", status: "Ready" },
      { name: "步骤图", status: "Needed" },
      { name: "成本对比图", status: "Optional" },
      { name: "清单截图", status: "Needed" },
      { name: "用户场景图", status: "Optional" },
      { name: "补充镜头", status: "Optional" },
      { name: "评论引导语", status: "Ready" }
    ],
    drafts: [
      {
        id: "safe",
        name: "稳妥版本",
        title: "上班前 5 分钟也能完成的早餐系统",
        hook: "如果你每天 8:30 前出门，这套早餐系统可以直接保存。",
        outline: ["先承认早晨时间紧", "给出 1+1+1 早餐公式", "列出五个工作日组合", "标注准备时间和适合场景", "引导用户留言自己的限制"],
        body:
          "不要再把健康早餐想成复杂食谱。工作日早餐只需要一个稳定公式：一个蛋白质来源，一个耐饿碳水，一个可以带走的补充。周一酸奶燕麦，周二鸡蛋全麦卷，周三豆浆香蕉，周四低糖面包加奶酪，周五便利店组合。重点不是精致，而是明天早上真的能做。",
        caption:
          "这不是早餐灵感清单，而是一套给上班族的五分钟早餐系统。先保存，下次不知道吃什么时直接照着组合。",
        visual: "白底清单轮播，封面突出“5 分钟 / 工作日 / 可保存”，每页一个组合，底部标注时间与预算等级。",
        useCase: "适合首发验证，风险低，能够清楚传达策略。",
        strategyFit: "它直接服务于“可重复早餐系统”的策略，不追求夸张互动，而是稳定建立保存价值。",
        hashtags: "#上班族早餐 #五分钟早餐 #健康早餐 #早餐规划",
        scores: { strategy: 92, hook: 82, clarity: 91, platform: 88, differentiation: 78, conversion: 84 },
        decision: {
          recommendation: "稳妥版本适合作为策略首发，用来验证保存率和基础评论需求。",
          why: "它最清楚地把策略上下文转成可执行内容，适合先验证用户是否需要早餐系统。",
          evidence: ["结构清晰", "保存价值明确", "平台适配稳定", "差异化略保守"],
          confidence: 86,
          risk: "互动张力不够强，可能评论量低于高互动版本。",
          nextAction: "准备清单轮播素材"
        }
      },
      {
        id: "interactive",
        name: "高互动版本",
        title: "别再收藏做不到的健康早餐了",
        hook: "你不是不自律，是你收藏的早餐根本不适合上班前 5 分钟。",
        outline: ["挑战常见早餐灵感", "指出上班族真实限制", "给出五分钟早餐公式", "展示三个预算友好组合", "用问题引导评论"],
        body:
          "很多健康早餐看起来很美，但不适合真正的工作日早晨。你需要的不是更多灵感，而是一套能在 5 分钟内完成、不会太贵、还能带走的系统。公式很简单：蛋白质 + 耐饿碳水 + 便携补充。今天先从三个组合开始：豆浆香蕉全麦包、鸡蛋奶酪卷、酸奶燕麦杯。评论区告诉我你的限制：没冰箱、没时间，还是预算太低？",
        caption:
          "如果你的早餐收藏夹很好看但用不上，这篇更适合你。评论告诉我你的早餐限制，我下一篇做对应版本。",
        visual: "封面用强对比标题，第二页展示“收藏夹早餐 vs 上班前早餐”，后续用矩阵呈现限制和解决方案。",
        useCase: "适合需要评论和系列选题反馈时发布。",
        strategyFit: "这个版本把策略中的预算、时间和真实场景限制直接变成评论入口，能为下一轮内容收集证据。",
        hashtags: "#上班族早餐 #健康早餐现实版 #早餐系统 #小红书运营",
        scores: { strategy: 94, hook: 94, clarity: 88, platform: 92, differentiation: 87, conversion: 91 },
        decision: {
          recommendation: "优先使用高互动版本，因为当前策略依赖保存和评论信号，而不只是点赞。",
          why: "它把用户限制变成评论入口，能同时验证早餐系统、素材需求和下一篇选题。",
          evidence: ["Hook 张力强", "评论引导明确", "策略约束清晰", "能产生下一轮证据"],
          confidence: 91,
          risk: "开头语气更强，需要避免让用户觉得被指责。",
          nextAction: "创建发布计划"
        }
      },
      {
        id: "brand",
        name: "品牌专业版本",
        title: "给忙碌上班族的工作日早餐规划方法",
        hook: "真正可持续的健康早餐，应该同时满足时间、预算和饱腹感。",
        outline: ["定义工作日早餐标准", "解释三个决策维度", "给出公式和组合", "说明如何复用食材", "用温和 CTA 引导保存"],
        body:
          "对办公室人群来说，早餐不是单一食谱选择，而是一个小型规划问题。一个可持续的早餐方案，需要同时满足三点：准备时间短、预算可控、上午不容易饿。建议使用“蛋白质 + 主食 + 便携补充”的组合逻辑，并优先选择可以在一周内复用的食材。这样既能降低早晨决策成本，也能减少浪费。",
        caption:
          "适合工作日长期执行的早餐，往往不是最精致的，而是最稳定的。把这套标准保存下来，下次买菜前可以直接参考。",
        visual: "更克制的品牌信息图风格，使用三维度框架和食材复用路径，适合品牌账号建立专业感。",
        useCase: "适合品牌账号、合作内容或需要建立专业可信度时使用。",
        strategyFit: "它用清晰框架承接策略证据，强调平台适配和长期信任，而不是短期互动。",
        hashtags: "#早餐规划 #上班族健康 #内容策略 #健康生活方式",
        scores: { strategy: 90, hook: 78, clarity: 94, platform: 85, differentiation: 83, conversion: 86 },
        decision: {
          recommendation: "品牌专业版本适合后续建立信任，但不建议作为第一条测试内容。",
          why: "它的策略一致性和清晰度高，但互动入口弱于高互动版本。",
          evidence: ["专业感强", "框架清楚", "评论刺激较弱", "适合品牌长期资产"],
          confidence: 84,
          risk: "如果首发使用，可能难以快速收集用户限制和评论信号。",
          nextAction: "作为第二阶段内容储备"
        }
      }
    ]
  },
  {
    id: "budget-swaps",
    name: "平价蛋白质替换",
    format: "对比轮播",
    direction: "用预算友好的蛋白质替换降低健康早餐行动门槛",
    brief: {
      objective: "让用户理解不用昂贵补剂也能做出耐饿早餐。",
      audience: "对早餐预算敏感的上班族和入门健康饮食人群",
      painPoint: "高蛋白早餐经常被包装成昂贵、健身化或难坚持的选择。",
      message: "平价食材也能搭建稳定早餐，关键是替换逻辑。",
      structure: "成本误区 → 三组替换 → 适用场景 → 购物清单 → 保存 CTA",
      hookDirection: "先回应预算焦虑，再给替代方案。",
      visualDirection: "左右对比、价格区间标签、替换箭头和购物篮视觉。",
      cta: "保存到下次买菜前。",
      metrics: "保存率、分享率、替换类评论、关注转化"
    },
    assets: [
      { name: "封面图", status: "Needed" },
      { name: "食材图片", status: "Ready" },
      { name: "步骤图", status: "Optional" },
      { name: "成本对比图", status: "Needed" },
      { name: "清单截图", status: "Needed" },
      { name: "用户场景图", status: "Optional" },
      { name: "补充镜头", status: "Optional" },
      { name: "评论引导语", status: "Ready" }
    ],
    drafts: [
      {
        id: "safe",
        name: "稳妥版本",
        title: "不用蛋白粉，也能做高蛋白早餐",
        hook: "预算有限时，先从这些平价蛋白质替换开始。",
        outline: ["点出蛋白粉不是唯一选择", "给出三组替换", "说明适合场景", "补充购物清单", "引导保存"],
        body:
          "高蛋白早餐不一定要靠补剂。更适合工作日的方式，是选择便宜、好买、能复用的食材。比如鸡蛋替代高价即食蛋白产品，豆浆替代含糖饮料，酸奶燕麦替代外卖早餐。关键不是追求最高蛋白，而是在预算和时间内稳定执行。",
        caption: "把这组三种平价替换保存下来，下次买菜前直接参考。",
        visual: "三组左右对比卡片，左侧高价选择，右侧平价替换，底部标注适用场景。",
        useCase: "适合稳定解释预算策略。",
        strategyFit: "它把预算缺口转化为清晰替换逻辑，符合策略中的证据导向。",
        hashtags: "#平价早餐 #高蛋白早餐 #早餐替换 #上班族早餐",
        scores: { strategy: 90, hook: 80, clarity: 92, platform: 88, differentiation: 82, conversion: 86 },
        decision: {
          recommendation: "稳妥版本适合做知识型铺垫，但首发互动不如高互动版本。",
          why: "它解释清晰，但评论入口不够主动。",
          evidence: ["替换逻辑明确", "预算证据清楚", "保存价值稳定"],
          confidence: 84,
          risk: "标题略常规，可能被同类内容淹没。",
          nextAction: "强化开头问题"
        }
      },
      {
        id: "interactive",
        name: "高互动版本",
        title: "别先买蛋白粉，先看这 3 个早餐替换",
        hook: "很多人不是蛋白质吃不够，是早餐预算被想复杂了。",
        outline: ["挑战昂贵补剂假设", "给出三组平价替换", "展示适用人群", "邀请用户说预算", "承诺下一篇清单"],
        body:
          "如果你想让早餐更耐饿，不一定要先买蛋白粉。对多数上班族来说，先把早餐换成更稳定的组合就够了：鸡蛋 + 全麦、豆浆 + 香蕉、酸奶 + 燕麦。它们的优势不是多高级，而是便宜、好买、能重复。评论告诉我你的早餐预算，我可以按预算做下一版清单。",
        caption: "你的早餐预算是多少？我下一篇可以按 10/15/20 元做三个版本。",
        visual: "强 Hook 封面 + 三组替换矩阵 + 预算评论引导页。",
        useCase: "适合收集预算区间和下一篇选题。",
        strategyFit: "它把成本焦虑转成评论变量，能为后续内容策略提供证据。",
        hashtags: "#平价高蛋白 #早餐预算 #上班族早餐 #早餐规划",
        scores: { strategy: 93, hook: 92, clarity: 88, platform: 91, differentiation: 86, conversion: 90 },
        decision: {
          recommendation: "使用高互动版本测试预算区间，因为它最能收集下一轮内容证据。",
          why: "策略依赖预算信号，这个版本直接邀请用户给出预算限制。",
          evidence: ["预算评论入口明确", "替换逻辑清楚", "差异化强于普通清单"],
          confidence: 90,
          risk: "需要避免对蛋白粉或高价产品做绝对化否定。",
          nextAction: "创建发布计划"
        }
      },
      {
        id: "brand",
        name: "品牌专业版本",
        title: "平价早餐的蛋白质替换框架",
        hook: "早餐是否可持续，取决于食材是否好买、可复用、预算稳定。",
        outline: ["解释替换标准", "三类食材框架", "适用场景", "购物建议", "保存 CTA"],
        body:
          "平价高蛋白早餐的重点不是单个食材，而是替换框架。优先选择好买、可复用、准备时间短的食材，再根据通勤、冰箱和预算限制组合。这样可以降低一周早餐的决策成本，也能减少买了不用的浪费。",
        caption: "这是一套更适合长期执行的早餐替换框架。",
        visual: "品牌化框架图，三维度：好买、可复用、预算稳定。",
        useCase: "适合品牌账号建立专业可信度。",
        strategyFit: "它强化了策略中的证据和框架感，但短期互动较弱。",
        hashtags: "#早餐策略 #健康早餐 #食材替换 #内容简报",
        scores: { strategy: 89, hook: 76, clarity: 93, platform: 84, differentiation: 82, conversion: 84 },
        decision: {
          recommendation: "品牌专业版本适合做系列中段内容，用来沉淀方法论。",
          why: "它能建立长期信任，但不适合作为第一条互动测试。",
          evidence: ["框架完整", "专业感强", "互动入口较弱"],
          confidence: 82,
          risk: "过于理性，可能降低评论意愿。",
          nextAction: "补充用户问题入口"
        }
      }
    ]
  }
];

const topicOptions = ["办公室人群健康早餐"];
const platformOptions = ["小红书"];
const directionOptions = ["预算友好的办公室早餐规划系统", "简单工作日早餐灵感", "单份成本早餐规划系统"];

export default function ContentStudioPage() {
  const [topic, setTopic] = useState(topicOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [direction, setDirection] = useState(directionOptions[0]);
  const [selectedPillarId, setSelectedPillarId] = useState(studioPillars[0].id);
  const [selectedDraftId, setSelectedDraftId] = useState(studioPillars[0].drafts[1].id);
  const [editableDraft, setEditableDraft] = useState<EditableDraft>(() => draftToEditable(studioPillars[0].drafts[1], studioPillars[0].brief.cta));
  const [briefGenerated, setBriefGenerated] = useState(false);

  const selectedPillar = studioPillars.find((pillar) => pillar.id === selectedPillarId) ?? studioPillars[0];
  const selectedDraft = selectedPillar.drafts.find((draft) => draft.id === selectedDraftId) ?? selectedPillar.drafts[0];

  const pillarOptions = studioPillars.map((pillar) => pillar.name);
  const selectedFormat = selectedPillar.format;
  const neededAssets = selectedPillar.assets.filter((asset) => asset.status === "Needed").map((asset) => asset.name);

  const selectPillarByName = (pillarName: string) => {
    const nextPillar = studioPillars.find((pillar) => pillar.name === pillarName) ?? studioPillars[0];
    const preferredDraft = nextPillar.drafts.find((draft) => draft.id === "interactive") ?? nextPillar.drafts[0];

    setSelectedPillarId(nextPillar.id);
    setSelectedDraftId(preferredDraft.id);
    setEditableDraft(draftToEditable(preferredDraft, nextPillar.brief.cta));
    setBriefGenerated(false);
  };

  const selectDraft = (draft: DraftVariant) => {
    setSelectedDraftId(draft.id);
    setEditableDraft(draftToEditable(draft, selectedPillar.brief.cta));
  };

  const updateEditable = (field: keyof EditableDraft, value: string) => {
    setEditableDraft((current) => ({ ...current, [field]: value }));
  };

  return (
    <AppShell title="内容工作室">
      <div className="space-y-5">
        <section className="animate-floatIn rounded-3xl border border-white/80 bg-white/82 p-5 shadow-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-blue">内容工作室</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">具体内容应该怎么做？</h1>
              <p className="mt-3 text-sm leading-6 text-ink-500">基于已确认策略生成内容简报、版本和素材清单。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ContextChip label="内容方向" value={direction} />
                <ContextChip label="内容支柱" value={selectedPillar.name} />
                <ContextChip label="推荐格式" value={selectedFormat} />
              </div>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:max-w-3xl xl:grid-cols-3 2xl:grid-cols-5">
              <FieldSelect label="研究课题" value={topic} options={topicOptions} onChange={setTopic} />
              <FieldSelect label="平台" value={platform} options={platformOptions} onChange={setPlatform} />
              <FieldSelect label="内容方向" value={direction} options={directionOptions} onChange={setDirection} />
              <FieldSelect label="内容支柱" value={selectedPillar.name} options={pillarOptions} onChange={selectPillarByName} />
              <FieldSelect label="内容格式" value={selectedFormat} options={[selectedFormat]} onChange={() => undefined} />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-5">
            <StrategyLockPanel pillar={selectedPillar} direction={direction} />
            <ContentBriefGenerator brief={selectedPillar.brief} generated={briefGenerated} onGenerate={() => setBriefGenerated(true)} />
            <DraftVariants drafts={selectedPillar.drafts} selectedId={selectedDraft.id} onSelect={selectDraft} />
          </section>

          <aside className="space-y-5 xl:sticky xl:top-0 xl:self-start">
            <AIDecisionPanel data={selectedDraft.decision} compact className="xl:col-span-1" />
          </aside>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)]">
          <EditingWorkspace editableDraft={editableDraft} onChange={updateEditable} />
          <AssetChecklist assets={selectedPillar.assets} compact />
        </div>
        <PublishingTransition selectedDraft={selectedDraft} neededAssets={neededAssets} selectedPillar={selectedPillar} />
      </div>
    </AppShell>
  );
}

function draftToEditable(draft: DraftVariant, cta: string): EditableDraft {
  return {
    title: draft.title,
    hook: draft.hook,
    body: draft.body,
    caption: draft.caption,
    cta,
    hashtags: draft.hashtags,
    visual: draft.visual
  };
}

function ContextChip({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">{label}: {value}</span>;
}

function StrategyLockPanel({ pillar, direction }: { pillar: StudioPillar; direction: string }) {
  const items = [
    { label: "目标受众", value: pillar.brief.audience },
    { label: "核心洞察", value: "AI 当前生成内容必须回应时间、预算和办公室场景限制，而不是随机写早餐灵感。" },
    { label: "内容方向", value: direction },
    { label: "成功指标", value: pillar.brief.metrics }
  ];

  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">策略上下文</p>
          <h2 className="mt-2 text-2xl font-semibold">AI 正在基于已确认策略生成内容</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">
            这里锁定策略证据，确保内容简报、Hook 和初稿都服务于同一个内容方向。
          </p>
        </div>
        <span className="w-fit rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-semibold text-blue-100">
          策略已锁定
        </span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <DarkInfo key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
    </section>
  );
}

function ContentBriefGenerator({ brief, generated, onGenerate }: { brief: ContentBrief; generated: boolean; onGenerate: () => void }) {
  const rows = [
    { label: "内容目标", value: brief.objective },
    { label: "目标受众", value: brief.audience },
    { label: "用户痛点", value: brief.painPoint },
    { label: "核心信息", value: brief.message },
    { label: "内容结构", value: brief.structure },
    { label: "开头方向", value: brief.hookDirection },
    { label: "视觉方向", value: brief.visualDirection },
    { label: "CTA", value: brief.cta },
    { label: "成功指标", value: brief.metrics }
  ];

  return (
    <Card>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-base font-semibold">内容简报生成器</h2>
          <p className="mt-1 text-sm text-ink-500">根据策略上下文生成结构化执行简报。</p>
        </div>
        <button
          className="focus-ring w-fit rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-ink-700 transition hover:-translate-y-0.5 hover:bg-surface-soft"
          onClick={onGenerate}
        >
          {generated ? "重新生成内容简报" : "生成内容简报"}
        </button>
      </div>
      {generated ? (
        <div className="mb-4 rounded-2xl border border-green-100 bg-green-50/70 px-4 py-3 text-sm font-semibold text-brand-green">
          内容简报已根据当前策略上下文生成。
        </div>
      ) : null}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((row) => (
          <InfoBlock key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </Card>
  );
}

function DraftVariants({
  drafts,
  selectedId,
  onSelect
}: {
  drafts: DraftVariant[];
  selectedId: string;
  onSelect: (draft: DraftVariant) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">内容版本</h2>
        <p className="mt-1 text-sm text-ink-500">选择一个版本后，AI 决策、编辑区和素材清单会同步更新。</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {drafts.map((draft) => {
          const selected = draft.id === selectedId;

          return (
            <button
              key={draft.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(draft)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(draft.id === "interactive" ? "blue" : draft.id === "brand" ? "purple" : "neutral")}`}>
                  {draft.name}
                </span>
                {selected ? <span className="rounded-full bg-brand-blue px-2.5 py-1 text-xs font-semibold text-white">已选中</span> : null}
              </div>
              <h3 className="mt-4 text-sm font-semibold leading-5">{draft.title}</h3>
              <p className="mt-2 text-sm font-medium leading-6 text-brand-blue">{draft.hook}</p>
              <div className="mt-4 grid gap-3">
                <InfoLine label="适用场景" value={draft.useCase} />
                <InfoLine label="为什么符合策略" value={draft.strategyFit} />
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function WhyNotOtherVersions({ selectedDraft }: { selectedDraft: DraftVariant }) {
  const reason =
    selectedDraft.id === "interactive"
      ? "稳妥版本更稳定但互动证据较弱；品牌专业版本适合沉淀方法论，但不适合优先验证保存和评论信号。"
      : selectedDraft.id === "safe"
        ? "高互动版本更适合收集评论，但语气更强；品牌专业版本更适合后续建立信任。"
        : "高互动版本更适合首发测试，稳妥版本更适合低风险验证；当前版本更适合品牌专业表达。";

  return (
    <Card>
      <p className="text-sm font-semibold">为什么不是其他版本？</p>
      <p className="mt-2 text-sm leading-6 text-ink-700">{reason}</p>
    </Card>
  );
}

function QualityScorePanel({ scores }: { scores: Array<{ label: string; value: number }> }) {
  return (
    <Card>
      <h2 className="text-base font-semibold">AI 内容质量评分</h2>
      <p className="mt-1 text-sm text-ink-500">基于已选版本与策略上下文计算。</p>
      <div className="mt-4 space-y-3">
        {scores.map((score) => (
          <div key={score.label}>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-ink-500">{score.label}</span>
              <span className="text-ink-950">{score.value}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-brand-blue" style={{ width: `${score.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EditingWorkspace({
  editableDraft,
  onChange
}: {
  editableDraft: EditableDraft;
  onChange: (field: keyof EditableDraft, value: string) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">编辑工作区</h2>
        <p className="mt-1 text-sm text-ink-500">本地编辑已选版本，当前不调用真实 AI 编辑。</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <TextField label="标题" value={editableDraft.title} onChange={(value) => onChange("title", value)} />
        <TextField label="Hook" value={editableDraft.hook} onChange={(value) => onChange("hook", value)} />
        <TextArea label="正文 / 脚本" value={editableDraft.body} onChange={(value) => onChange("body", value)} className="lg:col-span-2" />
        <TextArea label="配文" value={editableDraft.caption} onChange={(value) => onChange("caption", value)} />
        <TextArea label="视觉备注" value={editableDraft.visual} onChange={(value) => onChange("visual", value)} />
        <TextField label="CTA" value={editableDraft.cta} onChange={(value) => onChange("cta", value)} />
        <TextField label="Hashtags" value={editableDraft.hashtags} onChange={(value) => onChange("hashtags", value)} />
      </div>
    </Card>
  );
}

function AssetChecklist({ assets, compact = false }: { assets: AssetItem[]; compact?: boolean }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">素材清单</h2>
        <p className="mt-1 text-sm text-ink-500">根据内容支柱和格式生成的拍摄与设计准备项。</p>
      </div>
      <div className={`grid gap-3 ${compact ? "" : "md:grid-cols-2 xl:grid-cols-4"}`}>
        {assets.map((asset) => (
          <div key={asset.name} className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-surface-soft p-3">
            <span className="text-sm font-medium text-ink-700">{asset.name}</span>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${assetStatusClass(asset.status)}`}>
              {assetStatusLabel(asset.status)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PublishingTransition({
  selectedDraft,
  neededAssets,
  selectedPillar
}: {
  selectedDraft: DraftVariant;
  neededAssets: string[];
  selectedPillar: StudioPillar;
}) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">下一步</p>
          <h2 className="mt-2 text-2xl font-semibold">创建发布计划</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <DarkInfo label="已选内容版本" value={selectedDraft.name} />
            <DarkInfo label="推荐发布时间方向" value="工作日前一晚或周日规划时段，贴合保存和次日执行场景。" />
            <DarkInfo label="需要准备的素材" value={neededAssets.join("、") || "当前素材已准备充分"} />
            <DarkInfo label="需要测试的变量" value={`Hook 强度、${selectedPillar.format}封面、评论引导语`} />
          </div>
        </div>
        <Link
          href="/planner"
          className="focus-ring rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-ink-950 shadow-card transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          创建发布计划
        </Link>
      </div>
    </section>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-500">{label}</span>
      <input
        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium outline-none transition focus:border-blue-200 focus:bg-blue-50/30"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  className = ""
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-ink-500">{label}</span>
      <textarea
        className="min-h-32 w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium leading-6 outline-none transition focus:border-blue-200 focus:bg-blue-50/30"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
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

function assetStatusLabel(status: AssetStatus) {
  const labels: Record<AssetStatus, string> = {
    Needed: "待准备",
    Ready: "已准备",
    Optional: "可选"
  };

  return labels[status];
}

function assetStatusClass(status: AssetStatus) {
  const classes: Record<AssetStatus, string> = {
    Needed: toneClasses("amber"),
    Ready: toneClasses("green"),
    Optional: toneClasses("neutral")
  };

  return classes[status];
}
