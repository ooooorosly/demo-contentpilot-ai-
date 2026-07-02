"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AIDecisionPanel, AppShell, Card, FieldSelect, toneClasses, type DecisionPanelData } from "@/components/workspace";

type PlanStatus = "待准备" | "待审核" | "已安排" | "已发布";
type ChecklistStatus = "Ready" | "Needed" | "Optional";

type CalendarItem = {
  id: string;
  title: string;
  platform: string;
  publishAt: string;
  format: string;
  status: PlanStatus;
  owner: string;
  campaign: string;
  pillar: string;
  version: string;
  hook: string;
  cta: string;
  metrics: string;
  assetStatus: string;
  timing: TimingRecommendation;
  decision: DecisionPanelData;
  checklist: ChecklistItem[];
  tests: TestIdea[];
};

type TimingRecommendation = {
  day: string;
  window: string;
  why: string;
  audienceAssumption: string;
  formatFit: string;
  confidence: number;
  risk: string;
};

type ChecklistItem = {
  id: string;
  label: string;
  status: ChecklistStatus;
};

type TestIdea = {
  id: string;
  name: string;
  hypothesis: string;
  versionA: string;
  versionB: string;
  metrics: string;
  rule: string;
  reviewTime: string;
  decision: DecisionPanelData;
};

const calendarItems: CalendarItem[] = [
  {
    id: "office-breakfast-interactive",
    title: "别再收藏做不到的健康早餐了",
    platform: "小红书",
    publishAt: "周日晚 20:30",
    format: "清单轮播",
    status: "待准备",
    owner: "Yichen",
    campaign: "Office Breakfast System",
    pillar: "五分钟早餐系统",
    version: "高互动版本",
    hook: "你不是不自律，是你收藏的早餐根本不适合上班前 5 分钟。",
    cta: "评论告诉我你的早餐限制，我下一篇做对应版本。",
    metrics: "保存率、评论提问、完读率、关注转化",
    assetStatus: "封面图、步骤图、清单截图待准备",
    timing: {
      day: "工作日前一晚",
      window: "20:30–22:00",
      why: "这类内容依赖保存和第二天使用，前一晚发布更容易进入用户的规划场景。",
      audienceAssumption: "办公室人群会在晚上为第二天做准备，而不是早上临时查找复杂内容。",
      formatFit: "清单轮播需要完整阅读和保存，晚间规划时段比碎片化早高峰更适合。",
      confidence: 91,
      risk: "不要太早在早晨发布，用户可能没有足够时间保存、准备和评论限制。"
    },
    decision: {
      recommendation: "将这条内容安排在工作日前一晚 20:30–22:00 发布。",
      why: "内容目标是保存和次日使用，晚间发布更贴合受众的早餐规划行为。",
      evidence: ["保存意图强", "评论引导需要用户有时间思考", "清单轮播适合晚间完整阅读", "周日晚具备一周计划语境"],
      confidence: 91,
      risk: "不要把发布时间放到早高峰，用户可能只浏览不保存。",
      nextAction: "追踪发布后保存与评论"
    },
    checklist: [
      { id: "title", label: "标题已确认", status: "Ready" },
      { id: "hook", label: "Hook 已确认", status: "Ready" },
      { id: "cover", label: "封面图已准备", status: "Needed" },
      { id: "checklist", label: "清单截图已准备", status: "Needed" },
      { id: "caption", label: "配文已确认", status: "Ready" },
      { id: "hashtags", label: "Hashtags 已确认", status: "Ready" },
      { id: "comment", label: "评论引导语已准备", status: "Ready" },
      { id: "time", label: "发布时间已确认", status: "Needed" },
      { id: "tracking", label: "数据追踪方式已确认", status: "Needed" },
      { id: "repurpose", label: "复用计划已确认", status: "Optional" }
    ],
    tests: []
  },
  {
    id: "budget-swap-carousel",
    title: "别先买蛋白粉，先看这 3 个早餐替换",
    platform: "小红书",
    publishAt: "周三晚 21:00",
    format: "对比轮播",
    status: "待审核",
    owner: "Mia",
    campaign: "Budget Protein",
    pillar: "平价蛋白质替换",
    version: "高互动版本",
    hook: "很多人不是蛋白质吃不够，是早餐预算被想复杂了。",
    cta: "评论你的早餐预算，我按 10/15/20 元做三个版本。",
    metrics: "保存率、分享率、替换类评论、关注转化",
    assetStatus: "成本对比图待审核",
    timing: {
      day: "周三晚",
      window: "20:45–21:45",
      why: "周中用户更容易意识到早餐重复和预算压力，对替换方案更敏感。",
      audienceAssumption: "用户会在周中重新评估本周饮食成本，并准备下一次采购。",
      formatFit: "对比轮播适合晚间做预算判断，评论区也更容易收集替换需求。",
      confidence: 86,
      risk: "价格信息需要写清假设，否则容易引发质疑。"
    },
    decision: {
      recommendation: "安排在周三晚 20:45–21:45，用预算讨论带动评论。",
      why: "周中发布能触发用户对早餐重复和成本的即时反馈。",
      evidence: ["预算评论入口明确", "对比格式需要用户完整阅读", "周中具备调整行为场景"],
      confidence: 86,
      risk: "成本表达要避免过度精确。",
      nextAction: "确认价格口径"
    },
    checklist: [
      { id: "title", label: "标题已确认", status: "Ready" },
      { id: "hook", label: "Hook 已确认", status: "Ready" },
      { id: "cover", label: "封面图已准备", status: "Ready" },
      { id: "cost", label: "成本对比图已准备", status: "Needed" },
      { id: "caption", label: "配文已确认", status: "Ready" },
      { id: "hashtags", label: "Hashtags 已确认", status: "Needed" },
      { id: "comment", label: "评论引导语已准备", status: "Ready" },
      { id: "time", label: "发布时间已确认", status: "Ready" },
      { id: "tracking", label: "数据追踪方式已确认", status: "Needed" },
      { id: "repurpose", label: "复用计划已确认", status: "Optional" }
    ],
    tests: []
  },
  {
    id: "weekday-office-system",
    title: "上班前 5 分钟也能完成的早餐系统",
    platform: "小红书",
    publishAt: "周一晚 20:30",
    format: "清单轮播",
    status: "已安排",
    owner: "Chen",
    campaign: "Office Breakfast System",
    pillar: "五分钟早餐系统",
    version: "稳妥版本",
    hook: "如果你每天 8:30 前出门，这套早餐系统可以直接保存。",
    cta: "保存到明天早上用。",
    metrics: "保存率、完读率、关注转化",
    assetStatus: "素材已准备",
    timing: {
      day: "周一晚",
      window: "20:30–21:30",
      why: "周一晚能承接一周计划场景，适合稳定型清单内容。",
      audienceAssumption: "用户在周一晚更愿意调整本周剩余工作日早餐。",
      formatFit: "稳妥版清单适合低风险发布，并作为后续高互动版本的基准。",
      confidence: 82,
      risk: "互动张力较弱，需要在评论区补充限制问题。"
    },
    decision: {
      recommendation: "保留周一晚发布，用作清单轮播的基准内容。",
      why: "稳妥版本适合测试保存率基线。",
      evidence: ["清单结构稳定", "一周计划语境明确", "风险较低"],
      confidence: 82,
      risk: "评论量可能不如高互动版本。",
      nextAction: "观察保存率基线"
    },
    checklist: [
      { id: "title", label: "标题已确认", status: "Ready" },
      { id: "hook", label: "Hook 已确认", status: "Ready" },
      { id: "cover", label: "封面图已准备", status: "Ready" },
      { id: "checklist", label: "清单截图已准备", status: "Ready" },
      { id: "caption", label: "配文已确认", status: "Ready" },
      { id: "hashtags", label: "Hashtags 已确认", status: "Ready" },
      { id: "comment", label: "评论引导语已准备", status: "Needed" },
      { id: "time", label: "发布时间已确认", status: "Ready" },
      { id: "tracking", label: "数据追踪方式已确认", status: "Ready" },
      { id: "repurpose", label: "复用计划已确认", status: "Optional" }
    ],
    tests: []
  },
  {
    id: "breakfast-mistake",
    title: "为什么你 10 点就饿了",
    platform: "小红书",
    publishAt: "周四晚 21:15",
    format: "误区解析",
    status: "待准备",
    owner: "Yichen",
    campaign: "Breakfast Mistakes",
    pillar: "早餐失败原因",
    version: "品牌专业版本",
    hook: "你的早餐不是太少，而是缺少一个稳定器。",
    cta: "保存这张替换表，明天先改一个。",
    metrics: "保存率、完读率、评论提问",
    assetStatus: "替换表待准备",
    timing: {
      day: "周四晚",
      window: "21:00–22:00",
      why: "周四用户对本周早餐疲劳感更强，更容易接受误区纠正内容。",
      audienceAssumption: "工作周后半段更容易出现能量下滑和早餐失败感。",
      formatFit: "误区解析需要解释时间，晚间更适合完整阅读。",
      confidence: 80,
      risk: "专业语气不能过重，否则会降低评论意愿。"
    },
    decision: {
      recommendation: "周四晚发布，用误区内容承接工作周疲劳场景。",
      why: "用户在周四更容易感受到早餐系统失效，纠错内容更有进入点。",
      evidence: ["疲劳场景强", "误区内容适合晚间阅读", "保存价值明确"],
      confidence: 80,
      risk: "避免营养承诺过度。",
      nextAction: "准备替换表素材"
    },
    checklist: [
      { id: "title", label: "标题已确认", status: "Ready" },
      { id: "hook", label: "Hook 已确认", status: "Ready" },
      { id: "cover", label: "封面图已准备", status: "Needed" },
      { id: "steps", label: "清单截图已准备", status: "Needed" },
      { id: "caption", label: "配文已确认", status: "Optional" },
      { id: "hashtags", label: "Hashtags 已确认", status: "Needed" },
      { id: "comment", label: "评论引导语已准备", status: "Needed" },
      { id: "time", label: "发布时间已确认", status: "Ready" },
      { id: "tracking", label: "数据追踪方式已确认", status: "Needed" },
      { id: "repurpose", label: "复用计划已确认", status: "Optional" }
    ],
    tests: []
  },
  {
    id: "grocery-list",
    title: "一张购物清单，五顿办公室早餐",
    platform: "小红书",
    publishAt: "周六晚 20:45",
    format: "规划模板轮播",
    status: "已发布",
    owner: "Mia",
    campaign: "Grocery Planning",
    pillar: "购物清单规划",
    version: "品牌专业版本",
    hook: "买一次食材，解决五个工作日早餐。",
    cta: "保存到周末买菜前。",
    metrics: "保存率、复用率、关注转化",
    assetStatus: "已发布，等待复盘",
    timing: {
      day: "周六晚",
      window: "20:30–22:00",
      why: "周末晚间贴合采购和下周规划场景。",
      audienceAssumption: "用户周末更愿意做一周食材规划。",
      formatFit: "规划模板轮播和购物清单天然适合周末保存。",
      confidence: 88,
      risk: "如果发布时间过晚，评论讨论可能延后到第二天。"
    },
    decision: {
      recommendation: "保留周六晚发布逻辑，并在周日追踪复用评论。",
      why: "购物清单内容最适合周末计划场景。",
      evidence: ["采购场景明确", "保存意图强", "适合复用为微信图文"],
      confidence: 88,
      risk: "需要第二天继续追评论。",
      nextAction: "进入数据复盘"
    },
    checklist: [
      { id: "title", label: "标题已确认", status: "Ready" },
      { id: "hook", label: "Hook 已确认", status: "Ready" },
      { id: "cover", label: "封面图已准备", status: "Ready" },
      { id: "checklist", label: "清单截图已准备", status: "Ready" },
      { id: "caption", label: "配文已确认", status: "Ready" },
      { id: "hashtags", label: "Hashtags 已确认", status: "Ready" },
      { id: "comment", label: "评论引导语已准备", status: "Ready" },
      { id: "time", label: "发布时间已确认", status: "Ready" },
      { id: "tracking", label: "数据追踪方式已确认", status: "Ready" },
      { id: "repurpose", label: "复用计划已确认", status: "Ready" }
    ],
    tests: []
  }
];

const testIdeas: TestIdea[] = [
  {
    id: "hook",
    name: "Hook 测试",
    hypothesis: "带有限制场景的 Hook 比泛泛健康承诺更容易引发保存和评论。",
    versionA: "上班前 5 分钟也能完成的早餐系统",
    versionB: "别再收藏做不到的健康早餐了",
    metrics: "保存率、评论提问数、完读率",
    rule: "如果 B 的评论数更高，下一篇继续强化限制场景和反常识表达。",
    reviewTime: "发布后 24 小时",
    decision: {
      recommendation: "优先测试 Hook，因为当前策略需要验证保存意图和评论提问。",
      why: "不同 Hook 会直接影响用户是否把内容理解为“明天能用的计划”。",
      evidence: ["高互动版本评论入口更强", "清单内容依赖保存", "限制场景能筛选真实受众"],
      confidence: 90,
      risk: "反常识语气不能太强，避免让用户感到被指责。",
      nextAction: "发布后重点追踪保存率和评论问题"
    }
  },
  {
    id: "cover",
    name: "封面测试",
    hypothesis: "带有时间和场景标签的封面比普通早餐图更能提升点击和完读。",
    versionA: "封面突出食材组合",
    versionB: "封面突出“8:30 前出门 / 5 分钟 / 可保存”",
    metrics: "点击率、完读率、保存率",
    rule: "如果 B 的完读率更高，后续封面统一强化场景标签。",
    reviewTime: "发布后 48 小时",
    decision: {
      recommendation: "将封面测试作为第二优先级，验证平台适配和清单可读性。",
      why: "封面决定用户是否进入轮播，但发布时间仍是本页最关键决策。",
      evidence: ["平台依赖封面点击", "场景标签能增强受众识别", "清单截图需要视觉秩序"],
      confidence: 84,
      risk: "封面信息过多会降低质感。",
      nextAction: "准备两版封面"
    }
  },
  {
    id: "time",
    name: "发布时间测试",
    hypothesis: "工作日前一晚比当天早晨更适合规划型早餐内容。",
    versionA: "周日晚 20:30",
    versionB: "周一早 07:40",
    metrics: "保存率、评论提问数、次日复访",
    rule: "如果晚间保存率更高，系列内容优先锁定晚间规划时段。",
    reviewTime: "发布后 7 天",
    decision: {
      recommendation: "保留发布时间测试，但不要牺牲首条内容的晚间发布优先级。",
      why: "策略假设依赖晚间规划场景，需要用后续内容验证早晚差异。",
      evidence: ["内容用于次日早餐", "晚间更适合完整阅读", "早晨可能只有快速浏览"],
      confidence: 87,
      risk: "早晨测试可能降低首条内容表现。",
      nextAction: "第二条内容再测试早晨窗口"
    }
  }
];

const repurposeIdeas = [
  {
    source: "小红书清单轮播",
    format: "抖音短视频脚本",
    why: "清单步骤可以转成 15 秒准备过程，证明内容可执行。",
    action: "把每页清单改成一个镜头。"
  },
  {
    source: "小红书评论问题",
    format: "下一篇选题",
    why: "评论里的没冰箱、预算低、没时间都是高价值限制场景。",
    action: "发布后 24 小时整理评论信号。"
  },
  {
    source: "早餐清单",
    format: "微信图文",
    why: "长图文更适合解释一周规划逻辑和食材复用。",
    action: "将五个组合扩展为一周计划表。"
  },
  {
    source: "成本对比图",
    format: "B站短视频片段",
    why: "成本拆解适合做解释型视频的中段证据。",
    action: "保留价格假设并加入替换说明。"
  },
  {
    source: "用户限制场景",
    format: "系列内容主题",
    why: "限制场景能自然形成后续内容支柱。",
    action: "按没冰箱、没时间、低预算拆成三篇。"
  }
];

const topicOptions = ["办公室人群健康早餐"];
const platformOptions = ["小红书"];
const versionOptions = ["高互动版本", "稳妥版本", "品牌专业版本"];
const formatOptions = ["清单轮播", "对比轮播", "误区解析", "规划模板轮播"];
const timeRangeOptions = ["本周", "本月", "近 90 天"];

export default function PublishingPlannerPage() {
  const [selectedItemId, setSelectedItemId] = useState(calendarItems[0].id);
  const [selectedTestId, setSelectedTestId] = useState(testIdeas[0].id);
  const [decisionMode, setDecisionMode] = useState<"calendar" | "test">("calendar");
  const [topic, setTopic] = useState(topicOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [version, setVersion] = useState(versionOptions[0]);
  const [format, setFormat] = useState(formatOptions[0]);
  const [timeRange, setTimeRange] = useState(timeRangeOptions[0]);
  const [planConfirmed, setPlanConfirmed] = useState(false);
  const [checklistState, setChecklistState] = useState<Record<string, ChecklistStatus>>(() =>
    Object.fromEntries(calendarItems[0].checklist.map((item) => [item.id, item.status]))
  );

  const selectedItem = calendarItems.find((item) => item.id === selectedItemId) ?? calendarItems[0];
  const selectedTest = testIdeas.find((test) => test.id === selectedTestId) ?? testIdeas[0];
  const activeDecision = decisionMode === "test" ? selectedTest.decision : selectedItem.decision;
  const readyCount = Object.values(checklistState).filter((status) => status === "Ready").length;
  const checklistTotal = selectedItem.checklist.length;

  const selectCalendarItem = (item: CalendarItem) => {
    setSelectedItemId(item.id);
    setSelectedTestId(testIdeas[0].id);
    setVersion(item.version);
    setFormat(item.format);
    setPlatform(item.platform);
    setDecisionMode("calendar");
    setPlanConfirmed(false);
    setChecklistState(Object.fromEntries(item.checklist.map((checklistItem) => [checklistItem.id, checklistItem.status])));
  };

  const toggleChecklist = (item: ChecklistItem) => {
    setChecklistState((current) => {
      const currentStatus = current[item.id] ?? item.status;
      const nextStatus = currentStatus === "Ready" ? item.status === "Optional" ? "Optional" : "Needed" : "Ready";

      return { ...current, [item.id]: nextStatus };
    });
  };

  const metrics = useMemo(
    () => [
      {
        label: "主指标",
        value: "保存率",
        why: "规划型内容的核心价值是用户愿不愿意保存到下次使用。"
      },
      {
        label: "关键信号",
        value: "评论提问数",
        why: selectedTest.id === "hook" ? "评论能判断限制场景 Hook 是否激发真实需求。" : "评论能暴露下一篇内容需要解决的限制。"
      },
      {
        label: "关键信号",
        value: "关注转化",
        why: "如果用户认为系列有持续规划价值，会更愿意关注账号。"
      },
      {
        label: "关键信号",
        value: "完读率 / 完播率",
        why: "清单和对比内容需要完整消费，才能证明结构清晰。"
      },
      {
        label: "背景指标",
        value: "复用率",
        why: "被复用到其他平台或系列内容，说明素材资产具备长期价值。"
      }
    ],
    [selectedTest.id]
  );

  return (
    <AppShell title="发布计划">
      <div className="space-y-5">
        <section className="animate-floatIn rounded-3xl border border-white/80 bg-white/82 p-5 shadow-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-blue">发布计划</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">什么时候发布最合适？</h1>
              <p className="mt-3 text-sm leading-6 text-ink-500">制定发布时间、发布检查项和测试计划。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ContextChip label="已选版本" value={selectedItem.version} />
                <ContextChip label="内容格式" value={selectedItem.format} />
                <ContextChip label="内容方向" value="预算友好的办公室早餐规划系统" />
              </div>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:max-w-3xl xl:grid-cols-3 2xl:grid-cols-5">
              <FieldSelect label="研究主题" value={topic} options={topicOptions} onChange={setTopic} />
              <FieldSelect label="平台" value={platform} options={platformOptions} onChange={setPlatform} />
              <FieldSelect label="已选内容版本" value={version} options={versionOptions} onChange={setVersion} />
              <FieldSelect label="内容格式" value={format} options={formatOptions} onChange={setFormat} />
              <FieldSelect label="时间范围" value={timeRange} options={timeRangeOptions} onChange={setTimeRange} />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-5">
            <SelectedDraftSummary item={selectedItem} readyCount={readyCount} total={checklistTotal} />
            <RecommendedTime timing={selectedItem.timing} />
          </section>
          <aside className="space-y-5 xl:sticky xl:top-0 xl:self-start">
            <AIDecisionPanel data={activeDecision} compact className="xl:col-span-1" />
            <button
              className={`focus-ring w-full rounded-2xl border px-5 py-3 text-center text-sm font-semibold transition hover:-translate-y-0.5 ${
                planConfirmed
                  ? "border-green-100 bg-green-50 text-brand-green hover:bg-green-100"
                  : "border-gray-200 bg-white text-ink-700 hover:bg-surface-soft"
              }`}
              onClick={() => setPlanConfirmed(true)}
            >
              {planConfirmed ? "发布计划已确认" : "确认发布计划"}
            </button>
            {planConfirmed ? (
              <div className="rounded-2xl border border-green-100 bg-green-50/70 px-4 py-3 text-xs font-semibold leading-5 text-brand-green">
                已确认发布时间、测试变量和素材准备状态。下一步进入数据复盘。
              </div>
            ) : null}
            <PreparationStatus readyCount={readyCount} total={checklistTotal} />
          </aside>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,.8fr)]">
          <DistributionChecklist items={selectedItem.checklist} state={checklistState} onToggle={toggleChecklist} />
          <TestPlan
            selectedId={selectedTest.id}
            onSelect={(testId) => {
              setSelectedTestId(testId);
              setDecisionMode("test");
            }}
          />
        </div>
        <AnalyticsTransition item={selectedItem} selectedTest={selectedTest} />
      </div>
    </AppShell>
  );
}

function ContextChip({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">{label}: {value}</span>;
}

function SelectedDraftSummary({ item, readyCount, total }: { item: CalendarItem; readyCount: number; total: number }) {
  const rows = [
    { label: "标题", value: item.title },
    { label: "Hook", value: item.hook },
    { label: "内容格式", value: item.format },
    { label: "内容支柱", value: item.pillar },
    { label: "推荐平台", value: item.platform },
    { label: "CTA", value: item.cta },
    { label: "成功指标", value: item.metrics },
    { label: "素材准备状态", value: `${readyCount}/${total} 已准备 · ${item.assetStatus}` }
  ];

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">已选内容版本摘要</h2>
        <p className="mt-1 text-sm text-ink-500">确认正在为哪个内容版本制定发布计划。</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((row) => (
          <InfoBlock key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </Card>
  );
}

function RecommendedTime({ timing }: { timing: TimingRecommendation }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">推荐发布时间</p>
          <h2 className="mt-2 text-2xl font-semibold">{timing.day} · {timing.window}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">{timing.why}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">信心分数</p>
          <p className="mt-1 text-2xl font-semibold">{timing.confidence}%</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <DarkInfo label="受众行为假设" value={timing.audienceAssumption} />
        <DarkInfo label="内容类型匹配原因" value={timing.formatFit} />
        <DarkInfo label="风险提示" value={timing.risk} />
      </div>
    </section>
  );
}

function PublishingSchedulePreview({
  selectedId,
  onSelect
}: {
  selectedId: string;
  onSelect: (item: CalendarItem) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">发布排期预览</h2>
        <p className="mt-1 text-sm text-ink-500">选择一个计划项会更新摘要、推荐时间、检查项和测试计划。</p>
      </div>
      <div className="grid gap-3">
        {calendarItems.map((item) => {
          const selected = item.id === selectedId;

          return (
            <button
              key={item.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(item)}
            >
              <div className="grid gap-3 lg:grid-cols-[1.4fr_.8fr_.7fr_.7fr_.7fr_.7fr_.7fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold leading-5">{item.title}</p>
                  <p className="mt-1 text-xs text-ink-500">{item.campaign}</p>
                </div>
                <SmallMeta label="平台" value={item.platform} />
                <SmallMeta label="发布时间" value={item.publishAt} />
                <SmallMeta label="格式" value={item.format} />
                <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(item.status)}`}>{item.status}</span>
                <SmallMeta label="负责人" value={item.owner} />
                <span className="text-xs font-semibold text-brand-blue">{selected ? "当前计划" : "查看计划"}</span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function DistributionChecklist({
  items,
  state,
  onToggle
}: {
  items: ChecklistItem[];
  state: Record<string, ChecklistStatus>;
  onToggle: (item: ChecklistItem) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">发布检查项</h2>
        <p className="mt-1 text-sm text-ink-500">点击检查项可在已准备与待准备状态之间切换。</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => {
          const status = state[item.id] ?? item.status;

          return (
            <button
              key={item.id}
              className="focus-ring flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-surface-soft p-3 text-left transition hover:-translate-y-0.5 hover:shadow-card"
              onClick={() => onToggle(item)}
            >
              <span className="text-sm font-medium text-ink-700">{item.label}</span>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${checklistClass(status)}`}>{checklistStatusLabel(status)}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function TestPlan({ selectedId, onSelect }: { selectedId: string; onSelect: (testId: string) => void }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">测试计划</h2>
        <p className="mt-1 text-sm text-ink-500">选择测试想法会更新指标观察重点和 AI 决策面板。</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {testIdeas.map((test) => {
          const selected = test.id === selectedId;

          return (
            <button
              key={test.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(test.id)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(test.id === "hook" ? "blue" : test.id === "time" ? "purple" : "neutral")}`}>{test.name}</span>
                {selected ? <span className="rounded-full bg-brand-blue px-2.5 py-1 text-xs font-semibold text-white">已选中</span> : null}
              </div>
              <p className="mt-4 text-sm font-semibold leading-6">{test.hypothesis}</p>
              <div className="mt-4 space-y-3">
                <InfoLine label="A 版本" value={test.versionA} />
                <InfoLine label="B 版本" value={test.versionB} />
                <InfoLine label="观察指标" value={test.metrics} />
                <InfoLine label="决策规则" value={test.rule} />
                <InfoLine label="复盘时间" value={test.reviewTime} />
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function RepurposePlan() {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">内容复用建议</h2>
        <p className="mt-1 text-sm text-ink-500">把一次发布变成后续平台分发、复盘和系列选题资产。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {repurposeIdeas.map((idea) => (
          <div key={`${idea.source}-${idea.format}`} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-brand-purple">{idea.format}</span>
            <p className="mt-4 text-xs font-semibold text-ink-500">原始内容</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{idea.source}</p>
            <p className="mt-3 text-xs font-semibold text-ink-500">为什么值得复用</p>
            <p className="mt-1 text-sm leading-6 text-ink-700">{idea.why}</p>
            <p className="mt-3 text-xs font-semibold text-brand-blue">下一步动作</p>
            <p className="mt-1 text-sm font-medium leading-6 text-ink-950">{idea.action}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MetricsToWatch({ metrics, selectedTest }: { metrics: Array<{ label: string; value: string; why: string }>; selectedTest: TestIdea }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">需要观察的指标</h2>
        <p className="mt-1 text-sm text-ink-500">因为这是规划型内容，保存和后续提问比点赞更能说明策略价值。</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <div className="rounded-2xl border border-green-100 bg-green-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">主指标</p>
          <p className="mt-2 text-2xl font-semibold text-ink-950">保存率</p>
          <p className="mt-2 text-sm leading-6 text-ink-700">成功标准：保存率高于近期同类内容 15%，且评论中出现可复用的限制场景。</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {metrics.slice(1).map((metric) => (
            <div key={metric.value} className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-xs font-semibold text-ink-500">{metric.label}</p>
              <p className="mt-2 text-lg font-semibold text-ink-950">{metric.value}</p>
              <p className="mt-2 text-sm leading-6 text-ink-700">{metric.why}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <p className="text-xs font-semibold text-brand-blue">当前测试重点</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-ink-950">{selectedTest.name}: {selectedTest.rule}</p>
      </div>
    </Card>
  );
}

function AnalyticsTransition({ item, selectedTest }: { item: CalendarItem; selectedTest: TestIdea }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">下一步</p>
          <h2 className="mt-2 text-2xl font-semibold">发布后进入数据复盘</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <DarkInfo label="已确认发布时间" value={`${item.timing.day} ${item.timing.window}`} />
            <DarkInfo label="主要观察指标" value="保存率、评论提问数、完读率 / 完播率、关注转化" />
            <DarkInfo label="测试变量" value={selectedTest.name} />
            <DarkInfo label="预计复盘时间" value="发布后 24 小时做初步复盘，72 小时确认系列方向。" />
          </div>
        </div>
        <Link
          href="/analytics"
          className="focus-ring rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-ink-950 shadow-card transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          进入数据复盘
        </Link>
      </div>
    </section>
  );
}

function PreparationStatus({ readyCount, total }: { readyCount: number; total: number }) {
  const percent = Math.round((readyCount / total) * 100);

  return (
    <Card>
      <p className="text-sm font-semibold">发布准备状态</p>
      <p className="mt-1 text-xs text-ink-500">检查项切换会同步更新这里。</p>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <p className="text-xs font-semibold text-brand-blue">已准备</p>
        <p className="mt-1 text-2xl font-semibold text-ink-950">{readyCount}/{total}</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full rounded-full bg-brand-blue" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </Card>
  );
}

function SmallMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-400">{label}</p>
      <p className="mt-1 text-xs font-medium leading-5 text-ink-700">{value}</p>
    </div>
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

function statusClass(status: PlanStatus) {
  const classes: Record<PlanStatus, string> = {
    待准备: toneClasses("amber"),
    待审核: toneClasses("purple"),
    已安排: toneClasses("blue"),
    已发布: toneClasses("green")
  };

  return classes[status];
}

function checklistClass(status: ChecklistStatus) {
  const classes: Record<ChecklistStatus, string> = {
    Ready: toneClasses("green"),
    Needed: toneClasses("amber"),
    Optional: toneClasses("neutral")
  };

  return classes[status];
}

function checklistStatusLabel(status: ChecklistStatus) {
  const labels: Record<ChecklistStatus, string> = {
    Ready: "已准备",
    Needed: "待准备",
    Optional: "可选"
  };

  return labels[status];
}
