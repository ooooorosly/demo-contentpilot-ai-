import type { DecisionPanelData } from "@/components/workspace";

export type TrendStage = "Early" | "Rising" | "Saturated" | "Declining";
export type CompetitionLevel = "Low" | "Medium" | "High";
export type Strength = "Strong" | "Medium" | "Watch";
export type AngleType = "教育型" | "情绪型" | "对比型" | "故事型" | "实用指南" | "Educational" | "Emotional" | "Comparison" | "Story" | "Practical guide";

export type EvidenceSignal = {
  name: string;
  explanation: string;
  strength: Strength;
  detail: string;
};

export type ContentAngle = {
  type: AngleType;
  title: string;
  why: string;
  example: string;
};

export type RiskNote = {
  risk: string;
  level: CompetitionLevel;
  note: string;
};

export type TrendOpportunity = {
  id: string;
  title: string;
  platform: string;
  category: string;
  audience: string;
  stage: TrendStage;
  growthScore: number;
  audienceFitScore: number;
  competition: CompetitionLevel;
  opportunityScore: number;
  level: "High" | "Medium" | "Low";
  explanation: string;
  whyGrowing: string;
  whoEngages: string;
  workingFormats: string;
  painPoint: string;
  opportunity: string;
  decision: DecisionPanelData;
  evidence: EvidenceSignal[];
  angles: ContentAngle[];
  risks: RiskNote[];
};

export const trends: TrendOpportunity[] = [
  {
    id: "office-breakfast",
    title: "五分钟办公室早餐系统",
    platform: "小红书",
    category: "食品与健康",
    audience: "上班族",
    stage: "Rising",
    growthScore: 88,
    audienceFitScore: 94,
    competition: "Medium",
    opportunityScore: 92,
    level: "High",
    explanation: "具体、低门槛的早餐系统比泛泛健康建议更容易产生保存和计划意图。",
    whyGrowing: "用户需要真实可执行的工作日早餐系统，减少早晨决策负担，而不是追求完美备餐。",
    whoEngages: "关注精力、时间节省和可重复小习惯的办公室人群。",
    workingFormats: "清单笔记、对比拆解和低门槛购物清单框架。",
    painPoint: "健康早餐在工作日看起来要么太耗时，要么太贵，难以长期维持。",
    opportunity: "在话题变成泛健康内容前，占领实用早餐系统角度。",
    decision: {
      recommendation: "优先研究五分钟早餐系统，而不是泛健康生活方式内容。",
      why: "受众对具体、低门槛、可重复的早餐系统反应更强。",
      evidence: ["保存意图更强", "评论更偏向实用问题", "办公室人群匹配度高", "格式具备系列化潜力"],
      confidence: 91,
      risk: "竞品容易模仿，需要在视觉结构和限制条件上形成差异。",
      nextAction: "分析这个趋势"
    },
    evidence: [
      {
        name: "关键词信号",
        explanation: "搜索语言集中在快速、健康和办公室友好的早餐系统。",
        strength: "Strong",
        detail: "用户更想要可重复的工作日系统，而不是单个食谱。"
      },
      {
        name: "互动信号",
        explanation: "以保存为目标的内容表现强于泛灵感内容。",
        strength: "Strong",
        detail: "清单和购物框架更容易被反复查看。"
      },
      {
        name: "受众评论信号",
        explanation: "评论经常提到时间、成本和早晨决策疲劳。",
        strength: "Strong",
        detail: "最强痛点不是新鲜感，而是可持续执行。"
      },
      {
        name: "格式信号",
        explanation: "步骤化系统和视觉化结构更容易快速理解。",
        strength: "Medium",
        detail: "对比式方案能更清楚地呈现价值。"
      },
      {
        name: "发布时间信号",
        explanation: "工作日前一晚和周日准备窗口更适合发布。",
        strength: "Medium",
        detail: "该主题天然适合一周规划周期。"
      }
    ],
    angles: [
      {
        type: "教育型",
        title: "五分钟早餐公式",
        why: "把趋势转化为可重复使用的决策框架。",
        example: "一份蛋白质、一份耐饿主食、一份便携补充：五个工作日组合。"
      },
      {
        type: "情绪型",
        title: "别再因为早晨太乱而跳过早餐",
        why: "把早餐系统连接到真实工作日压力。",
        example: "给赶时间出门人群的一套稳定早晨系统。"
      },
      {
        type: "对比型",
        title: "精致早餐 vs 工作日早餐",
        why: "突出为什么实用内容比生活方式图片更有保存价值。",
        example: "好看的早餐碗，对比真正适合通勤携带的早餐。"
      },
      {
        type: "故事型",
        title: "我如何解决 9:30 就饿的问题",
        why: "让策略更有代入感，同时避免变成泛建议。",
        example: "连续一周五分钟早餐后，工作日上午状态发生了什么变化。"
      },
      {
        type: "实用指南",
        title: "周日准备五顿办公室早餐",
        why: "制造保存意图，并给出清晰下一步。",
        example: "一张购物清单和低门槛早餐准备顺序。"
      }
    ],
    risks: [
      { risk: "竞争风险", level: "Medium", note: "早餐系统内容容易被模仿。" },
      { risk: "趋势疲劳风险", level: "Medium", note: "避免重复同一种清单结构。" },
      { risk: "品牌相关性风险", level: "Low", note: "适合健康、食品和生活方式品牌。" },
      { risk: "执行难度", level: "Medium", note: "需要清晰视觉和真实限制条件。" },
      { risk: "转化不确定性", level: "Medium", note: "互动可能先体现为保存，而不是立即购买意图。" }
    ]
  },
  {
    id: "no-cook-meal-prep",
    title: "No-cook summer meal prep",
    platform: "TikTok",
    category: "Food & wellness",
    audience: "Busy professionals",
    stage: "Rising",
    growthScore: 82,
    audienceFitScore: 86,
    competition: "Medium",
    opportunityScore: 84,
    level: "High",
    explanation: "Seasonal heat and convenience needs make no-cook prep feel immediately useful.",
    whyGrowing: "Warm weather increases demand for lighter meals that avoid cooking time.",
    whoEngages: "Busy professionals and students looking for low-friction summer routines.",
    workingFormats: "Ingredient boards, fridge reset videos and three-step prep walkthroughs.",
    painPoint: "People want healthy options without cooking, cleanup or complicated planning.",
    opportunity: "Frame the trend around comfort and practicality, not diet culture.",
    decision: {
      recommendation: "Explore no-cook meal prep as a seasonal opportunity, but differentiate with constraints.",
      why: "The trend has useful timing, but format competition is rising quickly.",
      evidence: ["Seasonal relevance", "Strong convenience signal", "Repeatable visual format", "Medium competition"],
      confidence: 82,
      risk: "The topic can become visually repetitive unless each angle has a clear audience constraint.",
      nextAction: "Compare seasonal competitor formats"
    },
    evidence: [
      { name: "Keyword signal", explanation: "No-cook, heatwave and easy lunch terms cluster together.", strength: "Strong", detail: "Seasonality gives the trend a clear trigger." },
      { name: "Engagement signal", explanation: "Short videos with visible assembly steps perform well.", strength: "Medium", detail: "Simple transformation is the engagement driver." },
      { name: "Audience comment signal", explanation: "Users ask for affordable ingredient swaps.", strength: "Medium", detail: "Cost and availability shape the next angle." },
      { name: "Format signal", explanation: "Fridge-reset and lunchbox formats are recognizable.", strength: "Strong", detail: "The format is easy to understand in seconds." },
      { name: "Timing signal", explanation: "Best timing aligns with warm-weather planning.", strength: "Strong", detail: "Seasonal urgency is present but time-limited." }
    ],
    angles: [
      { type: "Educational", title: "No-cook prep formula", why: "Gives users a framework beyond recipes.", example: "Base, protein, crunch, sauce: four-part summer meals." },
      { type: "Emotional", title: "When it is too hot to cook", why: "Names the seasonal frustration directly.", example: "Three dinners for heatwave weeks." },
      { type: "Comparison", title: "Takeout vs no-cook prep", why: "Makes the value tradeoff visible.", example: "Cost and energy comparison across three meals." },
      { type: "Story", title: "My fridge reset before a busy week", why: "Works as a relatable routine narrative.", example: "Sunday reset using only ready-to-eat ingredients." },
      { type: "Practical guide", title: "Five no-cook lunches", why: "Creates immediate save value.", example: "A one-board plan for workweek lunches." }
    ],
    risks: [
      { risk: "Competition risk", level: "Medium", note: "Many creators can reproduce the format." },
      { risk: "Trend fatigue risk", level: "High", note: "Seasonal videos can saturate fast." },
      { risk: "Brand relevance risk", level: "Low", note: "Good fit for food, wellness and retail brands." },
      { risk: "Execution difficulty", level: "Low", note: "Simple visuals are enough if structured well." },
      { risk: "Conversion uncertainty", level: "Medium", note: "May drive saves more than direct product action." }
    ]
  },
  {
    id: "no-fridge-office-breakfast",
    title: "无冰箱办公室早餐清单",
    platform: "小红书",
    category: "食品与健康",
    audience: "上班族",
    stage: "Early",
    growthScore: 81,
    audienceFitScore: 93,
    competition: "Low",
    opportunityScore: 89,
    level: "High",
    explanation: "无冰箱限制把早餐选题从泛健康建议收窄成真实办公室场景，适合做差异化系列。",
    whyGrowing: "评论里反复出现通勤、工位存放和食材替代问题，说明用户需要更具体的执行条件。",
    whoEngages: "没有办公室冰箱、早上通勤时间紧、希望早餐能稳定执行的上班族。",
    workingFormats: "清单轮播、替代矩阵、桌面储备清单和风险提示卡。",
    painPoint: "很多健康早餐需要冷藏或现场加工，用户保存后仍然不知道如何在办公室执行。",
    opportunity: "把无冰箱、低预算和五分钟准备整合成一套可拥有的办公室早餐清单。",
    decision: {
      recommendation: "把无冰箱办公室早餐作为下一轮高差异化机会继续验证。",
      why: "这个趋势比普通早餐系统更具体，能直接回应评论里的真实限制。",
      evidence: ["无冰箱问题重复出现", "办公室场景明确", "竞争度较低", "清单格式具备保存价值"],
      confidence: 88,
      risk: "需要控制食品安全表达，避免给出过度承诺。",
      nextAction: "分析竞品"
    },
    evidence: [
      { name: "评论信号", explanation: "用户反复问没有冰箱怎么带早餐。", strength: "Strong", detail: "限制条件清晰，适合转成系列内容。" },
      { name: "受众匹配", explanation: "上班族通勤和工位场景高度具体。", strength: "Strong", detail: "比泛健康早餐更容易形成识别。" },
      { name: "格式信号", explanation: "清单和替代矩阵适合保存。", strength: "Medium", detail: "用户可以按自己的条件快速选择。" }
    ],
    angles: [
      { type: "实用指南", title: "无冰箱早餐清单", why: "直接解决最强限制场景。", example: "按常温保存、通勤携带和准备时间分组。" },
      { type: "对比型", title: "需要冰箱 vs 不需要冰箱", why: "让用户快速判断哪些方案适合办公室。", example: "同样是高蛋白早餐，哪些适合工位保存。" },
      { type: "教育型", title: "办公室早餐安全边界", why: "增加信任感并降低表达风险。", example: "哪些食材适合短时间携带，哪些不建议。" }
    ],
    risks: [
      { risk: "食品安全风险", level: "Medium", note: "避免绝对化保存承诺。" },
      { risk: "信息复杂风险", level: "Medium", note: "矩阵不要过于密集。" },
      { risk: "品牌信任风险", level: "Low", note: "用条件和假设表达更稳妥。" }
    ]
  },
  {
    id: "protein-breakfast",
    title: "经济实惠的蛋白质早餐",
    platform: "小红书",
    category: "食品与健康",
    audience: "上班族",
    stage: "Early",
    growthScore: 74,
    audienceFitScore: 88,
    competition: "Low",
    opportunityScore: 81,
    level: "High",
    explanation: "预算约束让蛋白质早餐比泛健康早餐更具体，也更适合形成保存和评论。",
    whyGrowing: "用户想要不依赖昂贵补剂的健康早餐，并希望知道普通食材是否足够实用。",
    whoEngages: "预算敏感、早晨时间有限、希望上午更稳定的办公室人群。",
    workingFormats: "成本拆解、购物清单、平价替换和早餐组合对比。",
    painPoint: "蛋白质早餐常被包装得昂贵、健身化或难以长期坚持。",
    opportunity: "占领预算优先、普通食材可执行的办公室早餐策略。",
    decision: {
      recommendation: "推荐优先做经济实惠的蛋白质早餐，用预算作为主要决策线索。",
      why: "预算焦虑能把受众需求、竞品缺口和内容格式连接起来，最适合进入竞品分析。",
      evidence: ["预算评论高频", "竞争度较低", "购物清单格式清晰", "办公室人群匹配度高"],
      confidence: 79,
      risk: "成本表达需要使用区间和假设，避免看起来过度精确。",
      nextAction: "分析竞品"
    },
    evidence: [
      { name: "关键词信号", explanation: "预算和蛋白质早餐形成实用搜索簇。", strength: "Medium", detail: "主题更垂直，但策略更清楚。" },
      { name: "互动信号", explanation: "购物清单和替换内容更容易获得保存。", strength: "Strong", detail: "受众需要可重复采购建议。" },
      { name: "评论信号", explanation: "预算顾虑经常出现在健康饮食讨论中。", strength: "Strong", detail: "负担得起是实际行动阻碍。" },
      { name: "格式信号", explanation: "单份成本和替换卡片更容易说明价值。", strength: "Medium", detail: "避免虚假的精确价格。" },
      { name: "发布时间信号", explanation: "周末采购和工作日前一晚是关键窗口。", strength: "Medium", detail: "主题适合做成 recurring 系列。" }
    ],
    angles: [
      { type: "教育型", title: "不用补剂的蛋白质早餐", why: "移除常见行动阻碍。", example: "用普通食材搭出五个工作日早餐。" },
      { type: "情绪型", title: "健康早餐不该让预算有压力", why: "连接真实预算焦虑。", example: "预算紧的一周也能执行的早餐方案。" },
      { type: "对比型", title: "咖啡店早餐 vs 买菜早餐", why: "让节省价值更可见。", example: "从成本、饱腹感和准备时间对比三组替换。" },
      { type: "故事型", title: "我的一周办公室早餐轮换", why: "更贴近上班族语境。", example: "一次购物解决五个工作日早餐。" },
      { type: "实用指南", title: "平价蛋白质购物清单", why: "制造强保存价值。", example: "按保质期和复用场景组织购物清单。" }
    ],
    risks: [
      { risk: "Competition risk", level: "Low", note: "The budget constraint narrows competition." },
      { risk: "Trend fatigue risk", level: "Medium", note: "Breakfast rotations need fresh constraints." },
      { risk: "Brand relevance risk", level: "Medium", note: "Best fit for affordable food or student brands." },
      { risk: "Execution difficulty", level: "Medium", note: "Cost framing must feel believable." },
      { risk: "Conversion uncertainty", level: "Medium", note: "Good for trust; less direct for premium products." }
    ]
  },
  {
    id: "student-ai-workflows",
    title: "AI productivity workflows for students",
    platform: "TikTok",
    category: "Education",
    audience: "Students",
    stage: "Saturated",
    growthScore: 79,
    audienceFitScore: 91,
    competition: "High",
    opportunityScore: 76,
    level: "Medium",
    explanation: "Audience demand is strong, but broad AI-tool lists are crowded.",
    whyGrowing: "Students want practical study systems, not abstract AI tool awareness.",
    whoEngages: "College students managing notes, research, planning and exam prep.",
    workingFormats: "Workflow breakdowns, before-after study systems and tool-stack comparisons.",
    painPoint: "Students know AI tools exist but do not know how to use them responsibly in workflows.",
    opportunity: "Shift from tool discovery to study-system decision support.",
    decision: {
      recommendation: "Pursue student AI workflows only with a specific study constraint.",
      why: "The category is saturated, but workflows tied to exams, notes or research still provide decision value.",
      evidence: ["High audience fit", "High competition", "Tool-list fatigue", "Workflow demand"],
      confidence: 74,
      risk: "Generic AI productivity content will blend into existing tool-list posts.",
      nextAction: "Analyze competitor workflow structures"
    },
    evidence: [
      { name: "Keyword signal", explanation: "Study workflow and AI notes terms remain active.", strength: "Medium", detail: "Interest exists, but specificity matters." },
      { name: "Engagement signal", explanation: "Before-after systems perform better than tool lists.", strength: "Strong", detail: "The audience wants applied use cases." },
      { name: "Audience comment signal", explanation: "Users ask about responsible and practical use.", strength: "Medium", detail: "Ethical boundaries can be a differentiator." },
      { name: "Format signal", explanation: "Screen-recorded workflows and templates are working.", strength: "Strong", detail: "Process visibility builds trust." },
      { name: "Timing signal", explanation: "Exam seasons and semester starts create spikes.", strength: "Medium", detail: "Timing should follow academic cycles." }
    ],
    angles: [
      { type: "Educational", title: "AI study workflow, not AI shortcuts", why: "Positions AI as strategy support.", example: "How to use AI to organize lecture notes responsibly." },
      { type: "Emotional", title: "When your notes are everywhere", why: "Names student overwhelm.", example: "A workflow for turning scattered notes into a study plan." },
      { type: "Comparison", title: "Tool list vs study system", why: "Differentiates from saturated content.", example: "Why five tools are less useful than one repeatable workflow." },
      { type: "Story", title: "How I planned exam week with AI", why: "Makes the use case concrete.", example: "A day-by-day revision planning process." },
      { type: "Practical guide", title: "Research paper workflow", why: "Solves a specific academic job.", example: "From source notes to outline without losing citations." }
    ],
    risks: [
      { risk: "Competition risk", level: "High", note: "The AI student topic is crowded." },
      { risk: "Trend fatigue risk", level: "High", note: "Generic AI hacks feel repetitive." },
      { risk: "Brand relevance risk", level: "Medium", note: "Good fit for education and productivity brands." },
      { risk: "Execution difficulty", level: "High", note: "Needs credible workflow detail." },
      { risk: "Conversion uncertainty", level: "Medium", note: "High interest may not convert without trust." }
    ]
  },
  {
    id: "commuter-skincare",
    title: "Skincare routines for commuters",
    platform: "Xiaohongshu",
    category: "Beauty",
    audience: "Urban commuters",
    stage: "Rising",
    growthScore: 81,
    audienceFitScore: 87,
    competition: "Medium",
    opportunityScore: 83,
    level: "High",
    explanation: "Commuting creates specific skin concerns that make routine advice more concrete.",
    whyGrowing: "Heat, pollution, masks and long workdays create practical skincare questions.",
    whoEngages: "Urban commuters looking for durable, simple routines.",
    workingFormats: "Morning routine maps, bag essentials and problem-solution notes.",
    painPoint: "Generic skincare routines do not account for commute conditions.",
    opportunity: "Frame skincare around daily environment and routine constraints.",
    decision: {
      recommendation: "Use commute context to make skincare advice more specific and useful.",
      why: "Audience fit improves when the routine responds to environment, schedule and friction.",
      evidence: ["Specific pain points", "Routine format fit", "Strong urban audience match", "Medium competition"],
      confidence: 84,
      risk: "Claims should stay practical and avoid overpromising results.",
      nextAction: "Review commuter skincare competitor notes"
    },
    evidence: [
      { name: "Keyword signal", explanation: "Commuting and summer skincare concerns cluster around durability.", strength: "Medium", detail: "The context makes the query more specific." },
      { name: "Engagement signal", explanation: "Routine maps and bag checklists support saves.", strength: "Strong", detail: "Users want portable decisions." },
      { name: "Audience comment signal", explanation: "Questions focus on oil, sweat and reapplication.", strength: "Strong", detail: "The pain points are concrete." },
      { name: "Format signal", explanation: "Morning-to-evening routine sequences work well.", strength: "Medium", detail: "Time-based structures improve clarity." },
      { name: "Timing signal", explanation: "Summer heat and commute seasons create relevance.", strength: "Medium", detail: "Seasonality supports urgency." }
    ],
    angles: [
      { type: "Educational", title: "Commuter skincare routine map", why: "Turns advice into a usable system.", example: "Before commute, during workday, after commute." },
      { type: "Emotional", title: "When your skin feels tired before work starts", why: "Names an everyday frustration.", example: "A routine for long subway mornings." },
      { type: "Comparison", title: "Home-day routine vs commute-day routine", why: "Highlights why context changes strategy.", example: "What to add, skip or carry." },
      { type: "Story", title: "My commute changed my skincare routine", why: "Makes the pain point personal.", example: "What changed after a month of office commuting." },
      { type: "Practical guide", title: "Commuter skincare bag checklist", why: "Creates save intent.", example: "Three small products for midday reset." }
    ],
    risks: [
      { risk: "Competition risk", level: "Medium", note: "Beauty routine content is crowded." },
      { risk: "Trend fatigue risk", level: "Medium", note: "Needs fresh context beyond product lists." },
      { risk: "Brand relevance risk", level: "Low", note: "Strong fit for skincare brands." },
      { risk: "Execution difficulty", level: "Medium", note: "Requires careful claims and product framing." },
      { risk: "Conversion uncertainty", level: "Low", note: "Routine context can support product consideration." }
    ]
  },
  {
    id: "home-fitness",
    title: "Beginner-friendly home fitness plans",
    platform: "Instagram",
    category: "Fitness",
    audience: "Beginners",
    stage: "Declining",
    growthScore: 58,
    audienceFitScore: 76,
    competition: "High",
    opportunityScore: 61,
    level: "Low",
    explanation: "Demand remains, but the broad topic is crowded and needs a sharper constraint.",
    whyGrowing: "Interest persists among beginners, but growth is weaker than newer routine categories.",
    whoEngages: "Beginners who feel intimidated by gyms or complex plans.",
    workingFormats: "Challenge calendars, beginner mistakes and confidence-building guides.",
    painPoint: "People want accessible plans but distrust generic fitness promises.",
    opportunity: "Only pursue if tied to a specific barrier such as small spaces, low impact or consistency.",
    decision: {
      recommendation: "Do not prioritize broad beginner home fitness without a sharper constraint.",
      why: "The audience exists, but competition and fatigue reduce the strategic upside.",
      evidence: ["High competition", "Lower growth signal", "Broad topic fatigue", "Needs narrow positioning"],
      confidence: 72,
      risk: "Generic beginner plans may underperform against established fitness creators.",
      nextAction: "Refine the audience constraint before analysis"
    },
    evidence: [
      { name: "Keyword signal", explanation: "Search remains stable but not strongly accelerating.", strength: "Watch", detail: "The topic may be evergreen rather than trending." },
      { name: "Engagement signal", explanation: "Challenge formats still work but are common.", strength: "Medium", detail: "Differentiation is difficult." },
      { name: "Audience comment signal", explanation: "Beginners ask for confidence and safety.", strength: "Medium", detail: "Emotional barriers may be stronger than workout choice." },
      { name: "Format signal", explanation: "Calendar plans and mistake posts are familiar formats.", strength: "Watch", detail: "The formats need a unique premise." },
      { name: "Timing signal", explanation: "New-year and seasonal reset moments matter most.", strength: "Watch", detail: "Current timing may not be ideal." }
    ],
    angles: [
      { type: "Educational", title: "The first-week movement plan", why: "Narrows the promise.", example: "Seven days of low-pressure starter movement." },
      { type: "Emotional", title: "For people nervous to start exercising", why: "Targets the actual barrier.", example: "A confidence-first home routine." },
      { type: "Comparison", title: "Beginner plan vs influencer plan", why: "Challenges unrealistic standards.", example: "What to ignore when starting from zero." },
      { type: "Story", title: "Starting again after a long break", why: "Relatable and less intimidating.", example: "The first three workouts I could actually finish." },
      { type: "Practical guide", title: "Small-space home plan", why: "Adds a needed constraint.", example: "No-jump movements for apartments." }
    ],
    risks: [
      { risk: "Competition risk", level: "High", note: "Established creators own the broad category." },
      { risk: "Trend fatigue risk", level: "High", note: "Generic plans feel familiar." },
      { risk: "Brand relevance risk", level: "Medium", note: "Works if the brand can own beginner trust." },
      { risk: "Execution difficulty", level: "High", note: "Needs credible expertise and careful safety framing." },
      { risk: "Conversion uncertainty", level: "Medium", note: "Beginners may need trust before action." }
    ]
  }
];

export type WinningPost = {
  id: string;
  title: string;
  platform: string;
  format: string;
  hook: string;
  topic: string;
  emotionalTrigger: string;
  visualStyle: string;
  cta: string;
  whyWorked: string;
  responseSignal: string;
  patternInsight: string;
};

export type PatternExtraction = {
  label: string;
  pattern: string;
  evidence: string;
};

export type OpportunityGap = {
  overused: string;
  ignored: string;
  unanswered: string;
  ownableAngle: string;
  copyRisk: string;
};

export type CommentSignal = {
  cluster: string;
  asking: string;
  why: string;
  opportunity: string;
};

export type CompetitorProfile = {
  id: string;
  name: string;
  platform: string;
  type: string;
  positioning: string;
  audience: string;
  contentStyle: string;
  strongestTopic: string;
  strength: string;
  weakness: string;
  opportunityGap: string;
  bestFormat: string;
  decision: DecisionPanelData;
  winningPosts: WinningPost[];
  patterns: PatternExtraction[];
  gap: OpportunityGap;
  comments: CommentSignal[];
  strategyTransition: {
    selectedGap: string;
    positioning: string;
    direction: string;
  };
};

export const competitors: CompetitorProfile[] = [
  {
    id: "daily-office-meals",
    name: "Daily Office Meals",
    platform: "小红书",
    type: "创作者账号",
    positioning: "实用工作日饮食系统",
    audience: "上班族",
    contentStyle: "清单笔记和简单餐食板",
    strongestTopic: "低门槛早餐系统",
    strength: "工作日限制条件清晰",
    weakness: "预算表达不足",
    opportunityGap: "面向办公室人群的成本感早餐规划",
    bestFormat: "清单笔记",
    decision: {
      recommendation: "借鉴工作日限制条件，而不是照搬早餐系统格式。",
      why: "它们表现好的原因是用户能立刻识别早晨决策问题。",
      evidence: ["时间压力评论重复", "清单格式容易获得保存", "办公室人群场景具体"],
      confidence: 88,
      risk: "过度复制版式会让策略显得缺少差异。",
      nextAction: "生成内容策略"
    },
    winningPosts: [
      {
        id: "office-1",
        title: "上班前能做的五种早餐",
        platform: "小红书",
        format: "清单笔记",
        hook: "如果你 8:30 前出门，先保存这套早餐系统。",
        topic: "快速工作日早餐",
        emotionalTrigger: "早晨时间压力",
        visualStyle: "按准备时间分组的清爽网格",
        cta: "保存到下个工作日使用",
        whyWorked: "它给用户一套可重复系统，而不是另一个早餐灵感。",
        responseSignal: "评论询问更便宜的替换方案和无冰箱选项。",
        patternInsight: "时间限制加可保存结构，是可以复用的内容模式。"
      },
      {
        id: "office-2",
        title: "让你 10 点就饿的办公室早餐误区",
        platform: "小红书",
        format: "问题解决轮播",
        hook: "你的早餐不是太少，而是缺少一个稳定器。",
        topic: "饱腹感和精力",
        emotionalTrigger: "上午能量下滑的挫败感",
        visualStyle: "前后对比餐食图",
        cta: "明天先加一个稳定器",
        whyWorked: "它把常见痛点重新解释成一个可执行决策。",
        responseSignal: "受众询问哪些选择最便宜、最容易携带。",
        patternInsight: "纠错型 Hook 在能导向简单行动时更有效。"
      }
    ],
    patterns: [
      { label: "重复主题", pattern: "工作日限制和早晨决策", evidence: "高表现内容会提到出门时间、办公室节奏和精力。" },
      { label: "重复 Hook", pattern: "如果你早晨很赶，先保存这套系统", evidence: "Hook 会先点名具体条件，再给建议。" },
      { label: "重复格式", pattern: "清单和前后对比", evidence: "受众能快速浏览并保存。" },
      { label: "受众痛点", pattern: "时间压力和上午能量下滑", evidence: "评论重复出现赶时间、容易饿和准备问题。" },
      { label: "评论信号", pattern: "预算和携带问题仍未解决", evidence: "用户询问更便宜、更适合通勤携带的选项。" }
    ],
    gap: {
      overused: "缺少成本背景的五项早餐清单",
      ignored: "单份成本和无冰箱限制",
      unanswered: "如何用一张平价购物清单做一周早餐",
      ownableAngle: "预算友好的办公室早餐系统",
      copyRisk: "只复刻清单样式，却缺少更强证据角度"
    },
    comments: [
      { cluster: "成本顾虑", asking: "不用昂贵食材也能做到吗？", why: "预算是决策阻碍。", opportunity: "单份成本对比内容。" },
      { cluster: "时间压力", asking: "五分钟内能准备什么？", why: "速度决定系统是否可用。", opportunity: "限时早餐系统格式。" },
      { cluster: "食材困惑", asking: "酸奶、蛋白粉或牛油果能换成什么？", why: "替换需求会驱动保存。", opportunity: "替换矩阵内容。" },
      { cluster: "信任顾虑", asking: "这真的能撑到上午吗？", why: "用户需要证据，而不是审美图片。", opportunity: "围绕饱腹感的解释内容。" },
      { cluster: "日常疲劳", asking: "如何避免每天吃一样的？", why: "可重复系统需要变化。", opportunity: "早餐轮换系统。" }
    ],
    strategyTransition: {
      selectedGap: "预算友好的办公室早餐规划",
      positioning: "为关注成本和稳定执行的办公室人群提供实用早餐系统。",
      direction: "围绕成本、时间和饱腹感建立对比型内容策略。"
    }
  },
  {
    id: "budget-wellness-lab",
    name: "Budget Wellness Lab",
    platform: "Instagram",
    type: "垂直媒体号",
    positioning: "平价健康决策",
    audience: "预算敏感的入门健康饮食人群",
    contentStyle: "成本拆解和对比卡片",
    strongestTopic: "平价蛋白质替换",
    strength: "预算信号强",
    weakness: "情绪叙事较弱",
    opportunityGap: "预算决策背后的真实工作日场景",
    bestFormat: "成本对比轮播",
    decision: {
      recommendation: "Use cost-per-serving comparisons, but add workday context and emotional friction.",
      why: "Their evidence framing is strong, but it does not fully connect to office-worker routines.",
      evidence: ["Budget anxiety in comments", "Comparison format clarity", "Weak routine storytelling"],
      confidence: 84,
      risk: "Over-indexing on price can make content feel transactional.",
      nextAction: "Build strategy around cost plus routine fit"
    },
    winningPosts: [
      {
        id: "budget-1",
        title: "Stop buying expensive protein powders before watching this",
        platform: "Instagram",
        format: "Comparison carousel",
        hook: "Stop buying expensive protein powders before watching this.",
        topic: "Protein swaps",
        emotionalTrigger: "Budget anxiety",
        visualStyle: "Side-by-side cost and ingredient comparison",
        cta: "Save before your next grocery run",
        whyWorked: "It reframes the audience's cost concern and gives them a practical alternative.",
        responseSignal: "Comments ask for breakfast-specific swaps.",
        patternInsight: "Cost objection plus practical alternative creates strong decision value."
      },
      {
        id: "budget-2",
        title: "Three cheap foods that make breakfast more filling",
        platform: "Instagram",
        format: "Educational carousel",
        hook: "You do not need a premium routine to feel full before work.",
        topic: "Affordable satiety",
        emotionalTrigger: "Relief",
        visualStyle: "Minimal ingredient cards with short explanations",
        cta: "Try one swap this week",
        whyWorked: "It reduces shame around budget choices and gives a simple next step.",
        responseSignal: "Audience asks for grocery list versions.",
        patternInsight: "Budget reassurance works best when paired with a concrete action."
      }
    ],
    patterns: [
      { label: "Repeated topics", pattern: "Affordable swaps and grocery decisions", evidence: "Top content is anchored in price anxiety." },
      { label: "Repeated hooks", pattern: "Stop overpaying for X", evidence: "Hooks challenge assumptions about premium products." },
      { label: "Repeated formats", pattern: "Cost comparison carousel", evidence: "Visual contrast makes the decision easy." },
      { label: "Pain points", pattern: "Budget anxiety and ingredient uncertainty", evidence: "Comments ask for substitutions and lists." },
      { label: "Comment signals", pattern: "Users want routines, not only ingredients", evidence: "Requests ask how to use swaps across a week." }
    ],
    gap: {
      overused: "Generic cheap swap lists",
      ignored: "Workday breakfast use cases",
      unanswered: "How to turn budget swaps into a repeatable morning system",
      ownableAngle: "Cost-per-serving office breakfast routines",
      copyRisk: "Price-only framing can weaken brand trust"
    },
    comments: [
      { cluster: "Cost objection", asking: "Which option is actually cheaper over a week?", why: "Users compare total routine cost.", opportunity: "Weekly grocery cost breakdown." },
      { cluster: "Time pressure", asking: "Can this work before class or work?", why: "Affordability alone is not enough.", opportunity: "Fast budget breakfast systems." },
      { cluster: "Ingredient confusion", asking: "What if I cannot buy these ingredients?", why: "Accessibility shapes trust.", opportunity: "Substitution ladders." },
      { cluster: "Trust concern", asking: "Is this enough protein?", why: "Users want confidence without supplements.", opportunity: "Plain-language nutrition evidence." },
      { cluster: "Routine fatigue", asking: "How many ways can I use the same ingredients?", why: "Variation protects consistency.", opportunity: "One grocery list, five breakfasts." }
    ],
    strategyTransition: {
      selectedGap: "Cost plus routine fit",
      positioning: "Budget breakfast planning that still works in rushed mornings.",
      direction: "Build a comparison series around weekly cost, time and ingredient reuse."
    }
  },
  {
    id: "student-protein-kitchen",
    name: "Student Protein Kitchen",
    platform: "TikTok",
    type: "Creator account",
    positioning: "Student-friendly high-protein meals",
    audience: "College students",
    contentStyle: "Fast videos with shopping and prep cuts",
    strongestTopic: "Cheap dorm-friendly breakfasts",
    strength: "Strong student specificity",
    weakness: "Low brand polish",
    opportunityGap: "More credible structure and evidence",
    bestFormat: "Fast prep video",
    decision: {
      recommendation: "Borrow the student constraint, but improve structure and evidence.",
      why: "Their content wins on relatability, but leaves room for clearer planning frameworks.",
      evidence: ["Student comments are specific", "Fast prep keeps attention", "Low structure creates differentiation gap"],
      confidence: 80,
      risk: "Too much polish may reduce relatability for student audiences.",
      nextAction: "Translate student patterns into a strategy brief"
    },
    winningPosts: [
      {
        id: "student-1",
        title: "Dorm breakfast with no blender and no powder",
        platform: "TikTok",
        format: "Fast prep video",
        hook: "No blender, no protein powder, no problem.",
        topic: "Dorm-friendly breakfast",
        emotionalTrigger: "Constraint relief",
        visualStyle: "Handheld cuts and quick ingredient labels",
        cta: "Save this for grocery day",
        whyWorked: "It directly removes common student barriers.",
        responseSignal: "Comments ask for microwave-only versions.",
        patternInsight: "Constraint-first hooks create immediate audience fit."
      },
      {
        id: "student-2",
        title: "Protein breakfast from one convenience store run",
        platform: "TikTok",
        format: "Shopping walkthrough",
        hook: "If your campus store is your grocery store, try this.",
        topic: "Accessible ingredients",
        emotionalTrigger: "Practical relief",
        visualStyle: "Store clips followed by final meal assembly",
        cta: "Comment your campus store options",
        whyWorked: "It reflects the audience's real environment.",
        responseSignal: "Users share ingredient constraints and ask for swaps.",
        patternInsight: "Environment-specific content earns useful comment signals."
      }
    ],
    patterns: [
      { label: "Repeated topics", pattern: "Dorm, campus and convenience constraints", evidence: "Winning posts start with student limitations." },
      { label: "Repeated hooks", pattern: "No X, no Y, still works", evidence: "Hooks remove perceived barriers." },
      { label: "Repeated formats", pattern: "Fast prep and shopping walkthroughs", evidence: "Low friction matches TikTok behavior." },
      { label: "Pain points", pattern: "Limited tools and limited grocery access", evidence: "Comments mention dorm, microwave and campus store." },
      { label: "Comment signals", pattern: "Users request substitutions by environment", evidence: "Comment prompts produce useful constraints." }
    ],
    gap: {
      overused: "Chaotic quick-prep videos",
      ignored: "Clear weekly planning framework",
      unanswered: "How to build a realistic student breakfast rotation",
      ownableAngle: "Student breakfast systems with credible structure",
      copyRisk: "Over-polishing can feel disconnected from student reality"
    },
    comments: [
      { cluster: "Cost objection", asking: "Can this fit my campus budget?", why: "Student budget is central.", opportunity: "Budget tier versions." },
      { cluster: "Time pressure", asking: "Can I make it before class?", why: "Class schedules define usability.", opportunity: "Pre-class breakfast plans." },
      { cluster: "Ingredient confusion", asking: "What if my store does not sell this?", why: "Access varies by campus.", opportunity: "Ingredient swap map." },
      { cluster: "Trust concern", asking: "Is this enough for a full morning?", why: "Satiety matters for students.", opportunity: "Energy and fullness framing." },
      { cluster: "Routine fatigue", asking: "What else can I make with the same items?", why: "Ingredient reuse helps budget.", opportunity: "One grocery run, multiple meals." }
    ],
    strategyTransition: {
      selectedGap: "Structured student breakfast rotation",
      positioning: "Campus-realistic protein breakfasts with clear planning logic.",
      direction: "Create a format series around constraints: dorm, campus store, no blender, no powder."
    }
  },
  {
    id: "morning-routine-notes",
    name: "Morning Routine Notes",
    platform: "小红书",
    type: "编辑型账号",
    positioning: "平静生活方式与晨间仪式",
    audience: "年轻上班族",
    contentStyle: "审美化晨间笔记",
    strongestTopic: "慢晨间仪式",
    strength: "情绪氛围强",
    weakness: "实用性不足",
    opportunityGap: "可执行的晨间证据",
    bestFormat: "编辑型笔记",
    decision: {
      recommendation: "Avoid copying aesthetic-only routines; keep the calm tone but add evidence and constraints.",
      why: "Their content creates aspiration, but the opportunity gap is practical execution.",
      evidence: ["Strong visual identity", "Weak constraint handling", "Comments ask how to make routines realistic"],
      confidence: 76,
      risk: "A purely practical response may lose emotional appeal.",
      nextAction: "Position strategy between calm and practical"
    },
    winningPosts: [
      {
        id: "routine-1",
        title: "A calm breakfast before a chaotic workday",
        platform: "Xiaohongshu",
        format: "Editorial note",
        hook: "Your morning does not need to be perfect to feel calmer.",
        topic: "Calm routine",
        emotionalTrigger: "Control",
        visualStyle: "Soft lighting and minimal layout",
        cta: "Save for Monday morning",
        whyWorked: "It sells an emotional state rather than a meal idea.",
        responseSignal: "Comments ask how to make it faster.",
        patternInsight: "Emotion attracts attention, but practicality drives saves."
      },
      {
        id: "routine-2",
        title: "Three tiny rituals before opening your laptop",
        platform: "Xiaohongshu",
        format: "Ritual list",
        hook: "Do this before the workday starts asking for everything.",
        topic: "Morning calm",
        emotionalTrigger: "Overwhelm",
        visualStyle: "Clean list with lifestyle photography",
        cta: "Choose one ritual tomorrow",
        whyWorked: "It connects a small action to a felt workday problem.",
        responseSignal: "Audience asks for versions with less time.",
        patternInsight: "Tiny rituals work when paired with a realistic constraint."
      }
    ],
    patterns: [
      { label: "Repeated topics", pattern: "Calm, control and workday transition", evidence: "Posts frame morning as emotional preparation." },
      { label: "Repeated hooks", pattern: "Your morning does not need to be perfect", evidence: "Hooks reduce pressure." },
      { label: "Repeated formats", pattern: "Editorial notes and ritual lists", evidence: "Aesthetic consistency is strong." },
      { label: "Pain points", pattern: "Overwhelm and lack of control", evidence: "Comments describe rushed workdays." },
      { label: "Comment signals", pattern: "Users want faster practical versions", evidence: "Questions ask for shorter routines." }
    ],
    gap: {
      overused: "Aesthetic rituals without constraints",
      ignored: "Time-boxed practical routines",
      unanswered: "What works when you only have five minutes?",
      ownableAngle: "Calm but realistic breakfast systems",
      copyRisk: "Copying visuals without practical evidence"
    },
    comments: [
      { cluster: "Cost objection", asking: "Do I need all these products or ingredients?", why: "Aesthetic routines can look expensive.", opportunity: "Minimal routine versions." },
      { cluster: "Time pressure", asking: "What if I only have five minutes?", why: "The core friction is time.", opportunity: "Five-minute calm systems." },
      { cluster: "Ingredient confusion", asking: "What can I prepare ahead?", why: "Planning reduces morning stress.", opportunity: "Prep-light breakfast rituals." },
      { cluster: "Trust concern", asking: "Will this actually help my morning?", why: "Emotional claims need proof.", opportunity: "Before/after routine evidence." },
      { cluster: "Routine fatigue", asking: "How do I keep it from feeling repetitive?", why: "Routine content needs variation.", opportunity: "Rotating ritual frameworks." }
    ],
    strategyTransition: {
      selectedGap: "Calm routines with practical constraints",
      positioning: "Morning systems that feel calm but still work on real office days.",
      direction: "Combine emotional hooks with time-boxed breakfast evidence."
    }
  }
];

export type AudienceDecision = {
  audience: string;
  caresAbout: string;
  painPoint: string;
  beliefShift: string;
  objection: string;
};

export type StrategyPillar = {
  id: string;
  name: string;
  audienceNeed: string;
  exampleTopics: string[];
  format: string;
  businessValue: string;
  suggestedBrief: string;
};

export type StrategyFormat = {
  id: string;
  type: string;
  why: string;
  behavior: string;
  example: string;
  pillarIds: string[];
};

export type StrategyMetric = {
  label: string;
  value: string;
  why: string;
};

export type StrategyRisk = {
  risk: string;
  why: string;
  watchFor: string;
  mitigation: string;
};

export type PositioningOption = {
  id: string;
  mode: "Safe direction" | "Recommended direction" | "Bold direction";
  title: string;
  angle: string;
  why: string;
  risk: string;
  useCase: string;
  recommended: boolean;
};

export type StrategyDirection = {
  id: string;
  researchTopic: string;
  platform: string;
  selectedTrend: string;
  selectedGap: string;
  timeRange: string;
  recommendation: {
    coreDirection: string;
    why: string;
    audience: string;
    painPoint: string;
    differentiation: string;
    expectedOutcome: string;
    confidence: number;
  };
  audienceDecision: AudienceDecision;
  positioning: PositioningOption;
  decision: DecisionPanelData;
  pillars: StrategyPillar[];
  formats: StrategyFormat[];
  brief: {
    objective: string;
    keyInsight: string;
    tone: string;
    cta: string;
  };
  metrics: {
    primary: StrategyMetric;
    secondary: StrategyMetric[];
  };
  risks: StrategyRisk[];
};

const sharedRisks: StrategyRisk[] = [
  {
    risk: "Weak differentiation risk",
    why: "Breakfast advice can become interchangeable if the content only lists ideas.",
    watchFor: "Posts that could be published by any generic wellness account.",
    mitigation: "Anchor each brief in cost, time and office constraints."
  },
  {
    risk: "Topic fatigue risk",
    why: "Routine content repeats quickly when every post uses the same structure.",
    watchFor: "Declining saves or comments asking for new variations.",
    mitigation: "Rotate between planning systems, comparisons, mistakes and audience scenarios."
  },
  {
    risk: "Overly promotional risk",
    why: "Budget-aware audiences are sensitive to advice that feels like disguised selling.",
    watchFor: "Comments challenging ingredient cost or product necessity.",
    mitigation: "Lead with evidence, substitutions and practical tradeoffs before product mentions."
  },
  {
    risk: "Platform mismatch risk",
    why: "Xiaohongshu users reward clear utility, not only polished lifestyle framing.",
    watchFor: "High impressions but weak save rate.",
    mitigation: "Use scan-friendly layouts, checklists and comparison tables."
  },
  {
    risk: "Execution difficulty",
    why: "The strategy depends on believable cost and routine evidence.",
    watchFor: "Overly exact price claims or unrealistic prep steps.",
    mitigation: "Use ranges, normal grocery items and clearly stated assumptions."
  },
  {
    risk: "Message oversimplification risk",
    why: "Health and nutrition content can lose trust if it overpromises results.",
    watchFor: "Claims that imply guaranteed energy, satiety or wellness outcomes.",
    mitigation: "Frame content around decisions and routines, not medical claims."
  }
];

export const strategyDirections: StrategyDirection[] = [
  {
    id: "practical-office-systems",
    researchTopic: "Healthy breakfast for office workers",
    platform: "Xiaohongshu",
    selectedTrend: "Budget-friendly protein breakfasts",
    selectedGap: "Budget-aware breakfast planning for office workers",
    timeRange: "This month",
    recommendation: {
      coreDirection: "Own the budget-aware breakfast planning angle for office workers.",
      why: "Trend and competitor signals both point to practical routines, cost anxiety and morning time pressure.",
      audience: "Office workers with limited time and budget",
      painPoint: "Healthy breakfast advice feels unrealistic, expensive or hard to repeat during workweeks.",
      differentiation: "Combine cost-per-serving evidence with five-minute office-friendly routine systems.",
      expectedOutcome: "Increase saves, comments asking for variations and repeat visits to planning content.",
      confidence: 89
    },
    audienceDecision: {
      audience: "Office workers who want healthier mornings without adding planning stress.",
      caresAbout: "Time, cost, satiety, portability and routines that survive busy workdays.",
      painPoint: "They want to eat better, but most advice assumes extra time, money or ingredients.",
      beliefShift: "Healthy routines can be practical, affordable and repeatable.",
      objection: "I do not have time, money or ingredients for this."
    },
    positioning: {
      id: "recommended",
      mode: "Recommended direction",
      title: "Practical breakfast systems for busy office workers",
      angle: "Turn healthy breakfast from inspiration into a repeatable weekday planning system.",
      why: "It connects trend demand with the strongest competitor gap: budget plus routine fit.",
      risk: "Needs specific evidence to avoid sounding like generic meal prep.",
      useCase: "Best default direction for the first content series.",
      recommended: true
    },
    decision: {
      recommendation: "Own the budget-aware breakfast planning angle instead of generic healthy breakfast inspiration.",
      why: "The selected gap has clear audience tension: people want healthier mornings, but cost and time block execution.",
      evidence: ["Budget comments remain unanswered", "Checklist formats drive saves", "Office-worker context sharpens audience fit", "Cost comparisons create decision value"],
      confidence: 89,
      risk: "The strategy will weaken if every post becomes a simple recipe list without planning evidence.",
      nextAction: "Convert this direction into content briefs"
    },
    pillars: [
      {
        id: "fast-systems",
        name: "Fast breakfast systems",
        audienceNeed: "Reduce morning decision fatigue.",
        exampleTopics: ["Five breakfasts before leaving at 8:30", "The two-minute office breakfast formula", "Sunday setup for rushed mornings"],
        format: "Checklist carousel",
        businessValue: "Builds save behavior around repeatable routines.",
        suggestedBrief: "Create a five-slide checklist for a workweek breakfast system under five minutes."
      },
      {
        id: "budget-swaps",
        name: "Budget-aware protein swaps",
        audienceNeed: "Eat enough without expensive supplements.",
        exampleTopics: ["Protein without powders", "Cafe breakfast vs grocery breakfast", "Three cheap foods that keep you full"],
        format: "Comparison carousel",
        businessValue: "Turns cost concern into brand trust.",
        suggestedBrief: "Compare three affordable protein swaps against common premium breakfast choices."
      },
      {
        id: "office-constraints",
        name: "No-fridge office breakfast ideas",
        audienceNeed: "Find portable options that work at a desk or commute.",
        exampleTopics: ["No-fridge breakfast matrix", "Commuter-safe breakfast kits", "Desk drawer breakfast backups"],
        format: "Grocery-list explainer",
        businessValue: "Differentiates through real workday constraints.",
        suggestedBrief: "Build a no-fridge breakfast matrix organized by cost, prep time and satiety."
      },
      {
        id: "breakfast-mistakes",
        name: "Common breakfast mistakes",
        audienceNeed: "Understand why routines fail by mid-morning.",
        exampleTopics: ["Why you are hungry by 10", "Breakfast mistakes office workers repeat", "Pretty breakfast vs useful breakfast"],
        format: "Myth vs reality post",
        businessValue: "Creates authority without heavy promotion.",
        suggestedBrief: "Explain three workday breakfast mistakes and one practical replacement for each."
      },
      {
        id: "planning-routines",
        name: "Grocery-list planning routines",
        audienceNeed: "Turn one grocery run into multiple breakfasts.",
        exampleTopics: ["One list, five breakfasts", "Budget breakfast planning under one basket", "Ingredient reuse map"],
        format: "Planning worksheet carousel",
        businessValue: "Supports repeat engagement and series depth.",
        suggestedBrief: "Design a one-grocery-list system that creates five office breakfasts with repeated ingredients."
      }
    ],
    formats: [
      {
        id: "checklist-carousel",
        type: "Checklist carousel",
        why: "It makes a planning system easy to scan and save.",
        behavior: "Supports save intent and weekly reuse.",
        example: "Save this if you leave home before 8:30.",
        pillarIds: ["fast-systems", "planning-routines"]
      },
      {
        id: "comparison-carousel",
        type: "Comparison carousel",
        why: "Competitor analysis shows cost comparisons clarify decisions.",
        behavior: "Supports cost evaluation and comment discussion.",
        example: "Cafe breakfast vs grocery breakfast across cost, protein and prep time.",
        pillarIds: ["budget-swaps", "breakfast-mistakes"]
      },
      {
        id: "short-routine-video",
        type: "Short routine video",
        why: "Visual proof helps routines feel realistic.",
        behavior: "Supports completion rate and trust.",
        example: "Pack a five-minute office breakfast before leaving for work.",
        pillarIds: ["fast-systems", "office-constraints"]
      },
      {
        id: "grocery-explainer",
        type: "Grocery-list explainer",
        why: "The selected gap is planning-oriented, so ingredient reuse matters.",
        behavior: "Supports saves and follow-up questions.",
        example: "One grocery list, five breakfasts, three reusable ingredients.",
        pillarIds: ["budget-swaps", "planning-routines", "office-constraints"]
      },
      {
        id: "myth-reality",
        type: "Myth vs reality post",
        why: "It reframes common breakfast assumptions without sounding promotional.",
        behavior: "Supports comments and belief change.",
        example: "Myth: healthy breakfast needs premium ingredients. Reality: routine design matters more.",
        pillarIds: ["breakfast-mistakes", "budget-swaps"]
      }
    ],
    brief: {
      objective: "Build a content series that helps office workers plan affordable, realistic breakfasts.",
      keyInsight: "The audience does not need more inspiration; they need constraints, substitutions and routines.",
      tone: "Practical, evidence-led, calm and non-judgmental.",
      cta: "Save for your next grocery run."
    },
    metrics: {
      primary: {
        label: "Primary metric",
        value: "Saves",
        why: "This strategy is planning-oriented, so saves indicate utility better than likes."
      },
      secondary: [
        { label: "Secondary signal", value: "Comments", why: "Questions reveal unresolved objections and next content angles." },
        { label: "Secondary signal", value: "Follows", why: "Recurring planning value should convert casual viewers into return audiences." },
        { label: "Secondary signal", value: "Completion rate", why: "Step-by-step formats need people to finish the sequence." }
      ]
    },
    risks: sharedRisks
  },
  {
    id: "simple-weekday-inspiration",
    researchTopic: "Healthy breakfast for office workers",
    platform: "Xiaohongshu",
    selectedTrend: "Five-minute breakfast systems",
    selectedGap: "Simple weekday breakfast inspiration",
    timeRange: "This month",
    recommendation: {
      coreDirection: "Publish simple weekday breakfast inspiration with light planning guidance.",
      why: "This direction is safer and easier to execute, but it has weaker differentiation.",
      audience: "Busy office workers seeking low-friction breakfast ideas",
      painPoint: "They want healthier options but do not want a complex system.",
      differentiation: "Use calm visual inspiration supported by quick practical notes.",
      expectedOutcome: "Improve reach and light saves while testing audience appetite.",
      confidence: 73
    },
    audienceDecision: {
      audience: "Office workers browsing for easy morning inspiration.",
      caresAbout: "Low effort, calm visuals and ideas that feel immediately doable.",
      painPoint: "Breakfast feels repetitive, but planning systems may feel too heavy.",
      beliefShift: "A healthier morning can start with one easy swap.",
      objection: "I do not want to think too hard before work."
    },
    positioning: {
      id: "safe",
      mode: "Safe direction",
      title: "Simple weekday breakfast inspiration",
      angle: "Make breakfast feel easier and calmer without asking for major behavior change.",
      why: "It is accessible and easy to execute across formats.",
      risk: "Weak differentiation against broad wellness and lifestyle content.",
      useCase: "Useful for early audience testing or lighter editorial calendars.",
      recommended: false
    },
    decision: {
      recommendation: "Use this safe direction only to test visual language, not as the main strategy.",
      why: "The angle is easy to publish but does not fully answer the strongest budget and planning signals.",
      evidence: ["Broad audience appeal", "Low execution effort", "Weak gap ownership", "Lower strategic defensibility"],
      confidence: 73,
      risk: "The content may look pleasant but fail to create a clear reason to follow.",
      nextAction: "Sharpen with one planning constraint"
    },
    pillars: [
      {
        id: "easy-ideas",
        name: "Easy weekday ideas",
        audienceNeed: "Find fast breakfast options without heavy planning.",
        exampleTopics: ["Three calm breakfast ideas", "Five breakfasts with no cooking", "Monday morning breakfast reset"],
        format: "Editorial note",
        businessValue: "Tests top-of-funnel interest with low production burden.",
        suggestedBrief: "Create a calm editorial note with three breakfast ideas and one practical constraint."
      },
      {
        id: "small-swaps",
        name: "Small healthy swaps",
        audienceNeed: "Improve breakfast without changing the whole routine.",
        exampleTopics: ["Swap your cafe pastry for this", "One protein add-on", "Small breakfast fixes"],
        format: "Before/after carousel",
        businessValue: "Creates low-friction education.",
        suggestedBrief: "Show three simple swaps with time and effort notes."
      },
      {
        id: "morning-calm",
        name: "Morning calm routines",
        audienceNeed: "Feel more in control before work.",
        exampleTopics: ["A calmer desk breakfast", "Tiny rituals before opening laptop", "Breakfast for rushed mornings"],
        format: "Routine note",
        businessValue: "Builds emotional resonance.",
        suggestedBrief: "Frame one breakfast routine around reducing morning pressure."
      }
    ],
    formats: [
      {
        id: "editorial-note",
        type: "Editorial note",
        why: "Fits calm inspiration and low-friction browsing.",
        behavior: "Supports reach and light saves.",
        example: "Three calm breakfast ideas for Monday morning.",
        pillarIds: ["easy-ideas", "morning-calm"]
      },
      {
        id: "before-after",
        type: "Before/after carousel",
        why: "Makes simple swaps concrete.",
        behavior: "Supports quick understanding.",
        example: "Breakfast that looks healthy vs breakfast that keeps you full.",
        pillarIds: ["small-swaps"]
      },
      {
        id: "routine-note",
        type: "Routine note",
        why: "Connects breakfast to emotional morning context.",
        behavior: "Supports affinity and comments.",
        example: "A two-step desk breakfast routine for rushed days.",
        pillarIds: ["morning-calm", "easy-ideas"]
      }
    ],
    brief: {
      objective: "Test simple breakfast inspiration for busy office-worker audiences.",
      keyInsight: "Low-friction ideas can attract attention, but need constraints to become useful.",
      tone: "Calm, simple and lightly practical.",
      cta: "Pick one idea for tomorrow morning."
    },
    metrics: {
      primary: {
        label: "Primary metric",
        value: "Save rate",
        why: "Even inspiration-led content should prove it is useful enough to revisit."
      },
      secondary: [
        { label: "Secondary signal", value: "Reach", why: "Safe inspiration can validate broad interest." },
        { label: "Secondary signal", value: "Comments", why: "Questions reveal whether users need stronger planning help." }
      ]
    },
    risks: sharedRisks
  },
  {
    id: "cost-serving-system",
    researchTopic: "Healthy breakfast for office workers",
    platform: "Xiaohongshu",
    selectedTrend: "Budget-friendly protein breakfasts",
    selectedGap: "Cost-per-serving breakfast planning",
    timeRange: "This month",
    recommendation: {
      coreDirection: "Lead with a cost-per-serving breakfast planning system.",
      why: "This is the most differentiated direction and directly answers budget anxiety.",
      audience: "Budget-conscious office workers and entry-level professionals",
      painPoint: "They distrust healthy advice that hides the true cost of routines.",
      differentiation: "Make cost, satiety and ingredient reuse visible in every content decision.",
      expectedOutcome: "Drive high-intent saves and comment discussion around substitutions.",
      confidence: 82
    },
    audienceDecision: {
      audience: "Office workers who actively compare grocery cost against convenience food.",
      caresAbout: "Total weekly cost, fullness, ingredient reuse and practical swaps.",
      painPoint: "Healthy routines feel financially unrealistic or wasteful.",
      beliefShift: "A breakfast system can be affordable without feeling like a compromise.",
      objection: "Cheap options will not keep me full or taste good."
    },
    positioning: {
      id: "bold",
      mode: "Bold direction",
      title: "Cost-per-serving breakfast planning system",
      angle: "Make affordability the core strategy lens for every breakfast recommendation.",
      why: "It creates sharp differentiation and strong evidence value.",
      risk: "Cost claims can be challenged if assumptions are not transparent.",
      useCase: "Best for a flagship series when the team can verify pricing assumptions.",
      recommended: false
    },
    decision: {
      recommendation: "Use the cost-per-serving system for a flagship series if pricing evidence can be maintained.",
      why: "It owns the strongest unanswered competitor gap, but execution quality has to be high.",
      evidence: ["Cost objection is repeated", "Comparison format is proven", "Budget angle narrows competition", "Pricing evidence builds trust"],
      confidence: 82,
      risk: "Over-specific prices may age quickly or vary by location.",
      nextAction: "Prepare evidence rules before briefs"
    },
    pillars: [
      {
        id: "cost-breakdowns",
        name: "Cost breakdowns",
        audienceNeed: "Know whether a routine is actually affordable.",
        exampleTopics: ["Breakfast under a realistic weekly basket", "Cost-per-serving protein swaps", "Cafe breakfast vs grocery system"],
        format: "Comparison carousel",
        businessValue: "Owns a defensible evidence-led angle.",
        suggestedBrief: "Create a transparent cost comparison between cafe breakfast and grocery breakfast routines."
      },
      {
        id: "ingredient-reuse",
        name: "Ingredient reuse systems",
        audienceNeed: "Avoid waste and repetition.",
        exampleTopics: ["One ingredient, three breakfasts", "Five breakfasts from one grocery basket", "The no-waste breakfast map"],
        format: "Planning worksheet carousel",
        businessValue: "Turns affordability into repeatable content territory.",
        suggestedBrief: "Map one grocery basket into five breakfast combinations."
      },
      {
        id: "cheap-satiety",
        name: "Affordable satiety evidence",
        audienceNeed: "Trust that cheaper breakfasts can still work.",
        exampleTopics: ["Cheap foods that keep you full", "Breakfast stabilizers", "Protein without powders"],
        format: "Myth vs reality post",
        businessValue: "Builds authority and reduces objection.",
        suggestedBrief: "Explain three affordable satiety builders using plain-language evidence."
      }
    ],
    formats: [
      {
        id: "cost-comparison",
        type: "Cost comparison carousel",
        why: "It makes the budget decision visible.",
        behavior: "Supports saves, comments and shares to friends with similar constraints.",
        example: "Cafe breakfast vs grocery breakfast: weekly cost and satiety tradeoff.",
        pillarIds: ["cost-breakdowns", "cheap-satiety"]
      },
      {
        id: "worksheet-carousel",
        type: "Planning worksheet carousel",
        why: "Budget strategy needs reusable systems, not isolated tips.",
        behavior: "Supports repeat saves and series continuation.",
        example: "Use one grocery basket to build five workday breakfasts.",
        pillarIds: ["ingredient-reuse", "cost-breakdowns"]
      },
      {
        id: "evidence-note",
        type: "Evidence note",
        why: "Plain-language reasoning protects trust.",
        behavior: "Supports credibility and objection handling.",
        example: "Why cheap breakfasts can still keep you full until lunch.",
        pillarIds: ["cheap-satiety"]
      }
    ],
    brief: {
      objective: "Own a differentiated, evidence-led budget breakfast strategy.",
      keyInsight: "Budget anxiety is not a side note; it is the main decision barrier.",
      tone: "Precise, transparent and practical.",
      cta: "Save this before your next grocery run."
    },
    metrics: {
      primary: {
        label: "Primary metric",
        value: "Saves",
        why: "Cost and planning content should be revisited during purchase decisions."
      },
      secondary: [
        { label: "Secondary signal", value: "Substitution comments", why: "They reveal whether the evidence helps real decisions." },
        { label: "Secondary signal", value: "Shares", why: "Budget comparisons can travel through peer groups." }
      ]
    },
    risks: sharedRisks
  }
];
