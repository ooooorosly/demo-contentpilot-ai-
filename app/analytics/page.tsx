"use client";

import Link from "next/link";
import { useState } from "react";
import { AIDecisionPanel, AppShell, Card, FieldSelect, toneClasses, type DecisionPanelData } from "@/components/workspace";

type MetricTone = "primary" | "secondary" | "neutral";
type ValidationStatus = "已验证" | "部分验证" | "未验证";

type PerformanceMetric = {
  id: string;
  label: string;
  value: string;
  benchmark: string;
  tone: MetricTone;
  insight: string;
  diagnosis: Diagnosis;
  decision: DecisionPanelData;
};

type Diagnosis = {
  reached: string;
  supports: string;
  issues: string;
  meaning: string;
};

type BreakdownItem = {
  label: string;
  worked: string;
  notWorked: string;
  reason: string;
  suggestion: string;
};

type TestResult = {
  id: string;
  name: string;
  hypothesis: string;
  versionA: string;
  versionB: string;
  result: string;
  judgment: string;
  nextAction: string;
  opportunity: string;
  decision: DecisionPanelData;
};

type AudienceSignal = {
  id: string;
  signal: string;
  meaning: string;
  why: string;
  opportunity: string;
  validationImpact: string;
  decision: DecisionPanelData;
};

type Optimization = {
  title: string;
  why: string;
  evidence: string;
  priority: "High" | "Medium" | "Low";
  action: string;
  metricIds: string[];
};

const metrics: PerformanceMetric[] = [
  {
    id: "impressions",
    label: "曝光量",
    value: "18,400",
    benchmark: "+12%",
    tone: "neutral",
    insight: "曝光达标，但不是判断策略是否成立的核心指标。",
    diagnosis: {
      reached: "部分达到",
      supports: "曝光高于近期同类内容，说明选题具备基本进入流量池的能力。",
      issues: "曝光不能证明用户真的把内容当成规划工具使用。",
      meaning: "需要结合保存率和评论提问判断策略有效性。"
    },
    decision: {
      recommendation: "不要用曝光量单独判断成败，继续看保存和评论信号。",
      why: "这类内容的价值在于规划使用，而不是单纯触达。",
      evidence: ["曝光达标", "保存率更能代表规划意图", "评论中出现真实限制场景"],
      confidence: 82,
      risk: "过度关注曝光会让下一轮内容偏向泛化选题。",
      nextAction: "切换到保存率复盘"
    }
  },
  {
    id: "reads",
    label: "阅读 / 播放",
    value: "9,860",
    benchmark: "53.5%",
    tone: "neutral",
    insight: "阅读转化稳定，说明标题和封面能带来基本点击。",
    diagnosis: {
      reached: "达到基础目标",
      supports: "超过一半曝光进入阅读，封面和标题没有明显拖累。",
      issues: "阅读量不能解释用户是否完成内容消费。",
      meaning: "需要结合完读率判断内容结构是否清晰。"
    },
    decision: {
      recommendation: "阅读表现稳定，但下一步应优化完读和保存。",
      why: "用户愿意点进来，说明入口有效；是否形成策略价值还要看后续行为。",
      evidence: ["阅读率稳定", "完读率高于预期", "保存率明显高于基准"],
      confidence: 84,
      risk: "如果只优化点击，可能牺牲内容实用性。",
      nextAction: "复盘内容结构"
    }
  },
  {
    id: "saves",
    label: "保存率",
    value: "18.6%",
    benchmark: "+6.8 pts",
    tone: "primary",
    insight: "保存率显著高于同类内容，说明用户把内容当作可执行规划工具。",
    diagnosis: {
      reached: "已达到目标",
      supports: "保存率高于同类内容基准，评论也出现“明早照做”“能不能做无冰箱版”等规划型反馈。",
      issues: "用户保存后仍需要更具体的食材替代和预算清单。",
      meaning: "策略方向成立，但下一篇需要从五分钟系统延伸到更具体的限制场景。"
    },
    decision: {
      recommendation: "当前推荐动作：继续做成系列，下一篇转向无冰箱办公室早餐规划。",
      why: "保存率证明规划价值成立，评论信号说明用户需要更具体的限制场景。",
      evidence: ["保存率 18.6%", "评论提问集中在食材替代", "完读率高于预期", "关注转化稳定"],
      confidence: 92,
      risk: "如果下一篇只重复同样的清单格式，可能出现主题疲劳。",
      nextAction: "把结论沉淀到 AI 策略中心"
    }
  },
  {
    id: "likes",
    label: "点赞",
    value: "1,420",
    benchmark: "+9%",
    tone: "neutral",
    insight: "点赞正常，但不应作为本策略的核心判断依据。",
    diagnosis: {
      reached: "参考指标正常",
      supports: "点赞没有拖累整体表现。",
      issues: "点赞无法说明内容是否被用于次日早餐规划。",
      meaning: "当前策略应避免被点赞优化牵引。"
    },
    decision: {
      recommendation: "点赞作为健康信号即可，不要作为下一轮优化主目标。",
      why: "规划型内容更应优化保存、评论提问和复用。",
      evidence: ["点赞正常", "保存率更强", "评论质量高"],
      confidence: 80,
      risk: "追求点赞可能导致 Hook 泛化。",
      nextAction: "回到保存率和评论提问"
    }
  },
  {
    id: "comments",
    label: "评论提问数",
    value: "132",
    benchmark: "+41%",
    tone: "secondary",
    insight: "评论提问数强，说明 Hook 成功激发了真实限制场景。",
    diagnosis: {
      reached: "超过目标",
      supports: "评论集中在没冰箱、预算、食材替代和一周计划，都是后续内容机会。",
      issues: "部分用户认为 Hook 语气略强，需要降低责备感。",
      meaning: "高互动版本成立，但下一轮要保留限制场景表达，降低指责感。"
    },
    decision: {
      recommendation: "保留限制场景 Hook，但降低责备感。",
      why: "评论数量证明互动方向有效，但语气风险需要控制。",
      evidence: ["132 条提问评论", "限制场景重复出现", "部分评论反馈语气偏强"],
      confidence: 88,
      risk: "继续强化反常识语气可能损害品牌信任。",
      nextAction: "优化下一篇 Hook 语气"
    }
  },
  {
    id: "shares",
    label: "分享",
    value: "386",
    benchmark: "+18%",
    tone: "neutral",
    insight: "分享表现不错，适合把内容复用为群体场景。",
    diagnosis: {
      reached: "表现良好",
      supports: "分享说明主题对同类上班族有传播价值。",
      issues: "分享原因需要进一步从评论中验证。",
      meaning: "可以把内容复用为办公室早餐清单或团队场景。"
    },
    decision: {
      recommendation: "将早餐清单复用为更适合转发的图文模板。",
      why: "分享行为说明内容具备外部传播价值。",
      evidence: ["分享高于基准", "清单格式可复用", "评论出现同事/室友场景"],
      confidence: 82,
      risk: "复用时不要只搬运原图，需要补充场景解释。",
      nextAction: "生成复用版本"
    }
  },
  {
    id: "follows",
    label: "关注转化",
    value: "241",
    benchmark: "+27%",
    tone: "secondary",
    insight: "关注转化说明用户期待后续系列，而不是只看单篇内容。",
    diagnosis: {
      reached: "超过目标",
      supports: "关注增长和评论追问同时出现，说明系列化潜力成立。",
      issues: "需要尽快发布下一篇，避免关注意图衰减。",
      meaning: "应把复盘结论沉淀为系列 playbook。"
    },
    decision: {
      recommendation: "尽快推出下一篇限制场景内容，承接关注转化。",
      why: "关注行为说明用户对系列有期待，需要及时兑现。",
      evidence: ["新增关注 241", "评论要求下一篇", "保存率高"],
      confidence: 89,
      risk: "如果下一篇间隔太久，系列心智会变弱。",
      nextAction: "排期下一篇无冰箱早餐"
    }
  },
  {
    id: "completion",
    label: "完读率 / 完播率",
    value: "64%",
    benchmark: "+11%",
    tone: "secondary",
    insight: "完读率高于预期，说明清单结构能被完整消费。",
    diagnosis: {
      reached: "达到目标",
      supports: "用户愿意读完整套清单，说明结构清晰。",
      issues: "部分评论希望食材分组更清楚。",
      meaning: "格式成立，但视觉分组仍可优化。"
    },
    decision: {
      recommendation: "保留清单轮播格式，但优化食材分组视觉。",
      why: "完读率证明格式成立，评论指出视觉信息还可以更清楚。",
      evidence: ["完读率 64%", "保存率高", "食材分组问题重复出现"],
      confidence: 87,
      risk: "继续堆信息会降低完读率。",
      nextAction: "优化封面和分组页"
    }
  }
];

const breakdown: BreakdownItem[] = [
  {
    label: "标题表现",
    worked: "“收藏做不到”击中了用户已有行为，能快速制造识别感。",
    notWorked: "语气略强，少数用户反馈有被指责感。",
    reason: "标题挑战了泛泛健康灵感，但也提高了情绪强度。",
    suggestion: "下一篇保留限制场景，改成“如果你没有冰箱，先看这一版”。"
  },
  {
    label: "Hook 表现",
    worked: "Hook 把“不自律”重构为“场景不匹配”，引发评论。",
    notWorked: "需要更快给出解决方案，避免停留在否定。",
    reason: "用户愿意参与讨论，但也期待马上看到替代路径。",
    suggestion: "Hook 后第一屏直接给出公式或场景选择。"
  },
  {
    label: "内容结构表现",
    worked: "痛点 → 公式 → 组合 → 评论引导的结构支持完读。",
    notWorked: "预算和无冰箱场景没有展开足够细。",
    reason: "结构清楚，但限制场景需要更具体。",
    suggestion: "下一篇按“无冰箱 / 低预算 / 无时间”分支组织。"
  },
  {
    label: "视觉表现",
    worked: "清单样式提升保存意图。",
    notWorked: "食材分组不够清晰，用户问替代项较多。",
    reason: "信息密度高，但视觉层级不够强。",
    suggestion: "加入食材类别色块和替代箭头。"
  },
  {
    label: "CTA 表现",
    worked: "要求用户评论限制，带来了有效提问。",
    notWorked: "没有明确引导用户保存到买菜前。",
    reason: "评论 CTA 强，保存 CTA 可以更具体。",
    suggestion: "使用双 CTA：保存到明早 + 评论你的限制。"
  },
  {
    label: "评论区表现",
    worked: "评论暴露出预算、无冰箱、替代食材等下一轮机会。",
    notWorked: "需要更快回复并沉淀成选题池。",
    reason: "用户在用评论补充自己的实际约束。",
    suggestion: "24 小时内整理评论簇，并生成下一篇 brief。"
  }
];

const tests: TestResult[] = [
  {
    id: "hook",
    name: "Hook 测试",
    hypothesis: "带有限制场景的 Hook 比泛泛健康承诺更容易引发保存。",
    versionA: "上班前 5 分钟也能完成的早餐系统",
    versionB: "别再收藏做不到的健康早餐了",
    result: "B 带来更多评论提问，A 的保存率略高。",
    judgment: "规划型内容用 A 做主线，讨论型 follow-up 用 B。",
    nextAction: "下一篇使用更温和的限制场景 Hook。",
    opportunity: "无冰箱办公室早餐清单",
    decision: {
      recommendation: "Hook 测试部分验证：保留限制场景，但降低责备感。",
      why: "B 证明互动有效，A 说明清晰规划更利于保存。",
      evidence: ["B 评论更高", "A 保存略高", "用户反馈限制场景有用"],
      confidence: 88,
      risk: "如果继续提高情绪强度，可能影响品牌信任。",
      nextAction: "生成温和版限制场景 Hook"
    }
  },
  {
    id: "cover",
    name: "封面测试",
    hypothesis: "带有时间和场景标签的封面比普通早餐图更能提升点击和完读。",
    versionA: "封面突出食材组合",
    versionB: "封面突出“8:30 前出门 / 5 分钟 / 可保存”",
    result: "B 的点击更高，A 的质感反馈更好。",
    judgment: "保留 B 的场景标签，但降低封面信息密度。",
    nextAction: "下一版封面使用一个主标签 + 一个保存理由。",
    opportunity: "五分钟早餐封面模板",
    decision: {
      recommendation: "封面测试部分验证：场景标签有效，但需要更克制。",
      why: "用户需要快速识别内容是否适合自己，过多标签会降低质感。",
      evidence: ["B 点击更高", "完读保持稳定", "评论提到信息密度高"],
      confidence: 84,
      risk: "过度标签化会让页面像广告。",
      nextAction: "沉淀封面模板规则"
    }
  },
  {
    id: "time",
    name: "发布时间测试",
    hypothesis: "工作日前一晚比当天早晨更适合规划型早餐内容。",
    versionA: "周日晚 20:30",
    versionB: "周一早 07:40",
    result: "晚间保存率明显更高，早晨二次曝光带来少量评论。",
    judgment: "主发布时间保留晚间，次日早晨做评论唤醒。",
    nextAction: "发布后第二天早晨追加置顶评论。",
    opportunity: "次日早晨评论唤醒机制",
    decision: {
      recommendation: "发布时间测试部分验证：晚间发布成立，但需要早晨二次触达。",
      why: "晚间更适合保存，早晨更适合提醒用户实际执行。",
      evidence: ["晚间保存更高", "早晨评论仍有价值", "内容用于次日早餐"],
      confidence: 86,
      risk: "如果只依赖晚间发布，可能错过早晨执行场景。",
      nextAction: "加入次日评论唤醒"
    }
  }
];

const signals: AudienceSignal[] = [
  {
    id: "time",
    signal: "时间限制",
    meaning: "用户真正关心的是上班前能不能完成，而不是早餐是否精致。",
    why: "时间限制决定内容是否可执行。",
    opportunity: "三分钟、五分钟、前一晚准备三个系列分支。",
    validationImpact: "强化了五分钟早餐系统的内容方向。",
    decision: {
      recommendation: "继续围绕时间限制做系列分支。",
      why: "时间是评论中最直接的执行阻碍。",
      evidence: ["多条评论提到赶时间", "五分钟表达带来保存", "完读率稳定"],
      confidence: 89,
      risk: "不要把时间承诺写得过度绝对。",
      nextAction: "生成三分钟早餐选题"
    }
  },
  {
    id: "budget",
    signal: "预算限制",
    meaning: "用户需要知道健康早餐是否真的负担得起。",
    why: "预算焦虑会影响保存后的执行。",
    opportunity: "加入成本区间和一周购物清单。",
    validationImpact: "验证了竞品机会缺口中的预算维度。",
    decision: {
      recommendation: "下一轮加入成本区间，而不是只给组合。",
      why: "预算问题重复出现，说明用户需要更具体的决策证据。",
      evidence: ["预算评论重复", "平价替换需求强", "保存率高但采购问题未解决"],
      confidence: 90,
      risk: "价格要用区间和假设，避免被城市差异挑战。",
      nextAction: "补充成本区间"
    }
  },
  {
    id: "substitute",
    signal: "食材替代",
    meaning: "用户想根据自己能买到的食材调整早餐系统。",
    why: "替代需求决定内容能否被不同人群复用。",
    opportunity: "做一张食材替代矩阵。",
    validationImpact: "说明推荐格式需要更强的视觉分组。",
    decision: {
      recommendation: "把下一篇做成食材替代矩阵。",
      why: "评论里的替代问题说明当前清单还不够可迁移。",
      evidence: ["替代问题高频", "清单结构被保存", "视觉分组有优化空间"],
      confidence: 87,
      risk: "矩阵过复杂会降低完读率。",
      nextAction: "设计替代矩阵"
    }
  },
  {
    id: "no-fridge",
    signal: "无冰箱场景",
    meaning: "办公室人群需要能承受通勤和办公桌存放的早餐方案。",
    why: "这是比普通健康早餐更具体、更可拥有的场景。",
    opportunity: "无冰箱办公室早餐清单。",
    validationImpact: "让内容方向从泛早餐系统进一步收窄到高差异化场景。",
    decision: {
      recommendation: "下一篇优先做无冰箱办公室早餐清单。",
      why: "这个信号具体、可执行，并且能明显区别于普通早餐灵感。",
      evidence: ["无冰箱评论重复", "办公室场景清晰", "适合清单轮播"],
      confidence: 93,
      risk: "需要避免食品安全承诺过度。",
      nextAction: "生成无冰箱早餐内容简报"
    }
  },
  {
    id: "week-plan",
    signal: "想要一周计划",
    meaning: "用户不只需要单篇早餐组合，还需要一周可执行安排。",
    why: "一周计划能提升系列复访和关注转化。",
    opportunity: "一张购物清单，五顿办公室早餐。",
    validationImpact: "支持把内容做成系列和 playbook。",
    decision: {
      recommendation: "把一周计划作为第二篇或第三篇内容。",
      why: "它能承接保存和关注转化，但制作成本高于无冰箱清单。",
      evidence: ["关注转化强", "一周计划评论出现", "购物清单适合周末发布"],
      confidence: 86,
      risk: "信息量过大可能压低完读率。",
      nextAction: "排期周末购物清单"
    }
  },
  {
    id: "trust",
    signal: "对健康承诺不信任",
    meaning: "用户对“健康”“耐饿”等表述需要更具体证据。",
    why: "信任会影响用户是否愿意长期关注系列。",
    opportunity: "用普通食材解释饱腹逻辑，避免夸张健康承诺。",
    validationImpact: "提醒下一轮要控制表达风险。",
    decision: {
      recommendation: "保留健康表达，但转成决策证据和普通食材逻辑。",
      why: "用户需要可信解释，不需要夸张承诺。",
      evidence: ["健康承诺被追问", "普通食材接受度高", "品牌信任仍需维护"],
      confidence: 83,
      risk: "过度承诺会损害信任。",
      nextAction: "补充证据型说明"
    }
  }
];

const validations = [
  { label: "选定趋势是否成立", status: "已验证" as ValidationStatus, reason: "保存率和评论提问数都说明用户确实需要可执行的早餐规划内容。" },
  { label: "竞品机会缺口是否成立", status: "已验证" as ValidationStatus, reason: "预算、食材替代和无冰箱评论重复出现，证明竞品未充分解决限制场景。" },
  { label: "内容方向是否成立", status: "已验证" as ValidationStatus, reason: "五分钟系统被保存和提问，说明方向具备系列化价值。" },
  { label: "推荐格式是否成立", status: "已验证" as ValidationStatus, reason: "清单轮播完读率 64%，说明用户能完整消费结构化内容。" },
  { label: "发布时间是否成立", status: "部分验证" as ValidationStatus, reason: "晚上发布带来了较高保存率，但早晨二次曝光不足，需要测试次日评论唤醒。" },
  { label: "是否值得继续做成系列", status: "已验证" as ValidationStatus, reason: "关注转化和评论问题都指向下一篇内容机会。" }
];

const optimizations: Optimization[] = [
  {
    title: "单独做无冰箱办公室早餐",
    why: "这是最具体、重复度最高的受众限制场景。",
    evidence: "无冰箱评论和通勤存放问题重复出现。",
    priority: "High",
    action: "生成无冰箱办公室早餐清单内容简报。",
    metricIds: ["saves", "comments", "completion"]
  },
  {
    title: "加入成本区间",
    why: "预算是保存后能否执行的关键阻碍。",
    evidence: "预算限制和替代食材评论集中出现。",
    priority: "High",
    action: "为每个组合增加价格区间与替代项。",
    metricIds: ["saves", "comments"]
  },
  {
    title: "把评论问题转成下一篇选题",
    why: "评论已经形成自然的内容需求池。",
    evidence: "132 条评论提问中限制场景高度集中。",
    priority: "High",
    action: "按时间、预算、无冰箱整理三篇后续内容。",
    metricIds: ["comments", "follows"]
  },
  {
    title: "保留限制场景 Hook，但降低责备感",
    why: "高互动 Hook 有效，但需要保护品牌信任。",
    evidence: "B 版本评论更高，但部分反馈语气偏强。",
    priority: "Medium",
    action: "改写为“如果你没有 X，试试这一版”。",
    metricIds: ["comments", "likes"]
  },
  {
    title: "优化食材分组视觉",
    why: "完读率不错，但替代问题说明视觉分组还不够清晰。",
    evidence: "用户问食材替代和分类逻辑。",
    priority: "Medium",
    action: "加入颜色分组和替代箭头。",
    metricIds: ["completion", "saves"]
  }
];

const topicOptions = ["办公室人群健康早餐"];
const platformOptions = ["小红书"];
const versionOptions = ["高互动版本", "稳妥版本", "品牌专业版本"];
const publishOptions = ["工作日前一晚 20:30", "周三晚 21:00", "周六晚 20:45"];
const timeRangeOptions = ["发布后 24 小时", "发布后 72 小时", "近 7 天"];

export default function AnalyticsPage() {
  const [topic, setTopic] = useState(topicOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [version, setVersion] = useState(versionOptions[0]);
  const [publishTime, setPublishTime] = useState(publishOptions[0]);
  const [timeRange, setTimeRange] = useState(timeRangeOptions[1]);
  const [selectedMetricId, setSelectedMetricId] = useState("saves");

  const selectedMetric = metrics.find((metric) => metric.id === selectedMetricId) ?? metrics[2];
  const selectedTest = tests[0];
  const selectedSignal = signals[3];
  const activeDecision = selectedMetric.decision;
  const filteredOptimizations = optimizations.filter((item) => item.metricIds.includes(selectedMetric.id)).slice(0, 4);

  return (
    <AppShell title="数据复盘">
      <div className="space-y-5">
        <section className="animate-floatIn rounded-3xl border border-white/80 bg-white/82 p-5 shadow-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-blue">数据复盘</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">有没有效果？</h1>
              <p className="mt-3 text-sm leading-6 text-ink-500">判断内容是否验证了策略，并找到下一轮优化方向。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ContextChip label="已发布内容" value="别再收藏做不到的健康早餐了" />
                <ContextChip label="发布时间" value="工作日前一晚 20:30" />
                <ContextChip label="测试变量" value={selectedTest.name} />
                <ContextChip label="主要指标" value="保存率" />
              </div>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:max-w-3xl xl:grid-cols-3 2xl:grid-cols-5">
              <FieldSelect label="研究主题" value={topic} options={topicOptions} onChange={setTopic} />
              <FieldSelect label="平台" value={platform} options={platformOptions} onChange={setPlatform} />
              <FieldSelect label="内容版本" value={version} options={versionOptions} onChange={setVersion} />
              <FieldSelect label="发布时间" value={publishTime} options={publishOptions} onChange={setPublishTime} />
              <FieldSelect label="时间范围" value={timeRange} options={timeRangeOptions} onChange={setTimeRange} />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-5">
            <PerformanceOverview selectedId={selectedMetric.id} onSelect={(id) => {
              setSelectedMetricId(id);
            }} />
            <GoalFitDiagnosis metric={selectedMetric} />
          </section>
          <aside className="space-y-5 xl:sticky xl:top-0 xl:self-start">
            <AIDecisionPanel data={activeDecision} compact className="xl:col-span-1" />
          </aside>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <StrategyValidation signal={selectedSignal} />
          <OptimizationRecommendations items={filteredOptimizations.length > 0 ? filteredOptimizations : optimizations.slice(0, 4)} />
        </div>
        <StrategyHubTransition signal={selectedSignal} test={selectedTest} />
      </div>
    </AppShell>
  );
}

function ContextChip({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">{label}: {value}</span>;
}

function PerformanceOverview({ selectedId, onSelect }: { selectedId: string; onSelect: (metricId: string) => void }) {
  const coreMetricIds = ["saves", "comments", "completion", "follows"];
  const backgroundMetricIds = ["impressions", "reads", "likes", "shares"];
  const coreMetrics = coreMetricIds
    .map((id) => metrics.find((metric) => metric.id === id))
    .filter(Boolean) as PerformanceMetric[];
  const backgroundMetrics = backgroundMetricIds
    .map((id) => metrics.find((metric) => metric.id === id))
    .filter(Boolean) as PerformanceMetric[];

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">核心指标概览</h2>
        <p className="mt-1 text-sm text-ink-500">这页重点判断策略是否被验证，优先看保存、评论、完读和关注转化。</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {coreMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} selected={metric.id === selectedId} onSelect={() => onSelect(metric.id)} />
        ))}
      </div>
      <details className="mt-4 rounded-2xl border border-gray-100 bg-surface-soft p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink-700">背景指标</summary>
        <p className="mt-1 text-xs leading-5 text-ink-500">曝光、阅读、点赞和分享只作为辅助判断，不作为本策略成败的主依据。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {backgroundMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} selected={metric.id === selectedId} onSelect={() => onSelect(metric.id)} secondary />
          ))}
        </div>
      </details>
    </Card>
  );
}

function MetricCard({
  metric,
  selected,
  onSelect,
  secondary = false
}: {
  metric: PerformanceMetric;
  selected: boolean;
  onSelect: () => void;
  secondary?: boolean;
}) {
  const tone = metric.tone === "primary" ? "green" : metric.tone === "secondary" ? "blue" : "neutral";

  return (
    <button
      className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
        selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-ink-500">{metric.label}</p>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClasses(tone)}`}>
          {secondary ? "背景指标" : metric.tone === "primary" ? "主指标" : "关键信号"}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold text-ink-950">{metric.value}</p>
      <p className="mt-1 text-xs font-semibold text-brand-blue">{metric.benchmark}</p>
      <p className="mt-3 text-sm leading-6 text-ink-700">{metric.insight}</p>
    </button>
  );
}

function GoalFitDiagnosis({ metric }: { metric: PerformanceMetric }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">目标匹配诊断</h2>
        <p className="mt-1 text-sm text-ink-500">原始目标：让上班族保存一套明天就能执行的五分钟早餐系统。</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <InfoBlock label="是否达到目标" value={metric.diagnosis.reached} />
        <InfoBlock label="支持判断的指标" value={metric.diagnosis.supports} />
        <InfoBlock label="存在的问题" value={metric.diagnosis.issues} />
        <InfoBlock label="结果说明" value={metric.diagnosis.meaning} />
      </div>
    </Card>
  );
}

function ContentResultSummary({ metric, signal }: { metric: PerformanceMetric; signal: AudienceSignal }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <p className="text-sm text-blue-100">复盘结论</p>
      <h2 className="mt-2 text-2xl font-semibold">有效，但下一轮要从“五分钟系统”收窄到“{signal.opportunity}”。</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
        {metric.diagnosis.meaning} 当前最值得沉淀的内容机会是：{signal.opportunity}。
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <DarkInfo label="最关键指标" value="保存率 18.6%，说明内容被当作规划工具使用。" />
        <DarkInfo label="受众信号" value={signal.meaning} />
        <DarkInfo label="下一步" value="把评论限制场景转成下一篇内容简报，并沉淀为策略资产。" />
      </div>
    </section>
  );
}

function ContentBreakdown() {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">内容拆解</h2>
        <p className="mt-1 text-sm text-ink-500">逐项判断标题、Hook、结构、视觉、CTA 和评论区表现。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {breakdown.map((item) => (
          <div key={item.label} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-blue">{item.label}</span>
            <InfoLine label="有效点" value={item.worked} />
            <InfoLine label="问题" value={item.notWorked} />
            <InfoLine label="原因" value={item.reason} />
            <InfoLine label="下一步" value={item.suggestion} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function TestResultReview({ selectedId, onSelect }: { selectedId: string; onSelect: (testId: string) => void }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">测试结果复盘</h2>
        <p className="mt-1 text-sm text-ink-500">选择测试卡会更新 AI 决策和下一轮内容机会。</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        {tests.map((test) => {
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
                <InfoLine label="结果" value={test.result} />
                <InfoLine label="判断" value={test.judgment} />
                <InfoLine label="下一步动作" value={test.nextAction} />
                <InfoLine label="下一轮内容机会" value={test.opportunity} />
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function AudienceSignals({ selectedId, onSelect }: { selectedId: string; onSelect: (signalId: string) => void }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">受众信号分析</h2>
        <p className="mt-1 text-sm text-ink-500">用信号簇代替单条评论，判断下一轮内容机会。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {signals.map((signal) => {
          const selected = signal.id === selectedId;

          return (
            <button
              key={signal.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(signal.id)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-brand-green">{signal.signal}</span>
                {selected ? <span className="rounded-full bg-brand-blue px-2.5 py-1 text-xs font-semibold text-white">已选中</span> : null}
              </div>
              <InfoLine label="用户真正关心什么" value={signal.meaning} />
              <InfoLine label="为什么重要" value={signal.why} />
              <InfoLine label="可以延伸成什么内容" value={signal.opportunity} />
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function StrategyValidation({ signal }: { signal: AudienceSignal }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-white/86 p-5 shadow-card">
      <div className="mb-5">
        <h2 className="text-base font-semibold">策略验证</h2>
        <p className="mt-1 text-sm text-ink-500">判断趋势、竞品缺口、内容方向、格式和发布时间是否成立。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {validations.map((item) => (
          <div key={item.label} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold">{item.label}</p>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${validationClass(item.status)}`}>{item.status}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-700">{item.reason}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <p className="text-xs font-semibold text-brand-blue">当前受众信号对验证的影响</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-ink-950">{signal.validationImpact}</p>
      </div>
    </section>
  );
}

function OptimizationRecommendations({ items }: { items: Optimization[] }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">下一轮优化建议</h2>
        <p className="mt-1 text-sm text-ink-500">基于当前选中的关键指标动态调整优先级。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(item.priority === "High" ? "green" : item.priority === "Medium" ? "amber" : "neutral")}`}>
              {item.priority}
            </span>
            <h3 className="mt-4 text-sm font-semibold leading-5">{item.title}</h3>
            <InfoLine label="为什么" value={item.why} />
            <InfoLine label="证据" value={item.evidence} />
            <InfoLine label="下一步动作" value={item.action} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function StrategyHubTransition({ signal, test }: { signal: AudienceSignal; test: TestResult }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">下一步</p>
          <h2 className="mt-2 text-2xl font-semibold">把复盘结果沉淀为策略资产</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <DarkInfo label="已验证的策略" value="预算友好的办公室早餐规划系统值得继续做成系列。" />
            <DarkInfo label="未解决的问题" value="食材替代、无冰箱场景、成本区间仍需具体化。" />
            <DarkInfo label="下一轮内容机会" value={signal.opportunity || test.opportunity} />
            <DarkInfo label="建议沉淀的 playbook" value="规划型内容优先看保存率，用评论限制场景决定下一篇。" />
          </div>
        </div>
        <Link
          href="/hub"
          className="focus-ring rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-ink-950 shadow-card transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          进入 AI 策略中心
        </Link>
      </div>
    </section>
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
    <div className="mt-3 min-w-0 rounded-xl bg-white px-3 py-2">
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

function validationClass(status: ValidationStatus) {
  const classes: Record<ValidationStatus, string> = {
    已验证: toneClasses("green"),
    部分验证: toneClasses("amber"),
    未验证: toneClasses("red")
  };

  return classes[status];
}
