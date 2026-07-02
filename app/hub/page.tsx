"use client";

import Link from "next/link";
import { useState } from "react";
import { AIDecisionPanel, AppShell, Card, FieldSelect, toneClasses, type DecisionPanelData } from "@/components/workspace";

type AssetType = "受众洞察" | "趋势洞察" | "格式洞察" | "Hook 洞察" | "发布时间洞察" | "指标判断" | "内容支柱";
type ConfidenceStatus = "高信心" | "中信心" | "需继续验证";

type StrategyAsset = {
  id: string;
  name: string;
  type: AssetType;
  scenario: string;
  evidence: string;
  confidence: number;
  reusable: string;
  decision: DecisionPanelData;
  playbookId: string;
};

type Playbook = {
  id: string;
  name: string;
  audience: string;
  scenario: string;
  rule: string;
  example: string;
  evidence: string;
  risk: string;
  confidence: number;
};

type MemoryItem = {
  category: string;
  content: string;
  source: string;
  updatedAt: string;
  confidence: ConfidenceStatus;
  playbookIds: string[];
};

const assets: StrategyAsset[] = [
  {
    id: "save-first",
    name: "规划型内容优先看保存率",
    type: "指标判断",
    scenario: "早餐规划、购物清单、预算清单等帮助用户做下一步计划的内容。",
    evidence: "保存率 18.6%，高于同类基准；评论中出现“明早照做”和“一周计划”等规划型反馈。",
    confidence: 92,
    reusable: "下一轮复盘时优先看保存率、评论提问数和完读率，不用点赞作为主判断。",
    playbookId: "planning-metric",
    decision: {
      recommendation: "沉淀“规划型内容优先看保存率”Playbook。",
      why: "该规则贯穿策略、发布和数据复盘，能指导后续所有规划型内容判断。",
      evidence: ["保存率显著高于基准", "评论提问指向实际使用", "完读率支持清单格式", "关注转化证明系列价值"],
      confidence: 92,
      risk: "不要把这条规则泛化到品牌曝光或认知型内容。",
      nextAction: "保存为策略资产"
    }
  },
  {
    id: "constraint-hook",
    name: "限制场景 Hook 更容易引发保存和评论",
    type: "Hook 洞察",
    scenario: "用户场景明确、限制条件强、需要行动决策的内容。",
    evidence: "Hook 测试中，限制场景版本带来更多评论提问；但语气需要降低责备感。",
    confidence: 88,
    reusable: "继续使用“如果你没有 X / 时间有限 / 预算有限”的开头结构。",
    playbookId: "constraint-hook",
    decision: {
      recommendation: "保存限制场景 Hook 规则，但加入语气风险提示。",
      why: "它能提升评论和受众识别，但过强语气会影响品牌信任。",
      evidence: ["B 版本评论更高", "用户反馈限制场景有用", "部分用户感到语气偏强"],
      confidence: 88,
      risk: "不要把限制场景写成责备用户的表达。",
      nextAction: "沉淀 Hook 模板"
    }
  },
  {
    id: "no-fridge",
    name: "无冰箱办公室早餐是下一轮高价值机会",
    type: "受众洞察",
    scenario: "办公室、通勤、桌面存放等真实使用约束明显的内容。",
    evidence: "评论中无冰箱、通勤存放、食材替代问题重复出现。",
    confidence: 93,
    reusable: "下一轮研究直接以“无冰箱办公室早餐清单”为主题进入趋势和竞品验证。",
    playbookId: "constraint-topic",
    decision: {
      recommendation: "将无冰箱办公室早餐保存为下一轮研究主题。",
      why: "它比泛泛健康早餐更具体，也更能承接评论里的真实限制。",
      evidence: ["无冰箱评论重复", "办公室场景清晰", "适合清单轮播", "保存意图强"],
      confidence: 93,
      risk: "需要避免食品安全承诺过度。",
      nextAction: "开始下一轮研究"
    }
  },
  {
    id: "checklist-format",
    name: "清单轮播适合规划型内容",
    type: "格式洞察",
    scenario: "需要用户保存、复访、照着执行的内容。",
    evidence: "清单轮播完读率 64%，保存率高于基准。",
    confidence: 87,
    reusable: "继续使用清单轮播，但加强食材分组和替代箭头。",
    playbookId: "checklist-format",
    decision: {
      recommendation: "保存清单轮播格式规则，并补充分组优化要求。",
      why: "格式已验证，但视觉分组仍影响执行理解。",
      evidence: ["完读率 64%", "保存率高", "食材替代问题重复出现"],
      confidence: 87,
      risk: "信息过密会降低完读率。",
      nextAction: "保存格式模板"
    }
  },
  {
    id: "evening-time",
    name: "晚间发布更适合保存型规划内容",
    type: "发布时间洞察",
    scenario: "用于次日执行、周计划、采购计划的内容。",
    evidence: "工作日前一晚带来更高保存率，但早晨二次曝光仍需测试。",
    confidence: 86,
    reusable: "主发布时间放在晚间规划窗口，次日早晨用置顶评论唤醒执行。",
    playbookId: "publishing-time",
    decision: {
      recommendation: "保存晚间发布规则，同时标记早晨唤醒为待验证。",
      why: "晚间更适合完整阅读和保存，早晨更接近执行场景。",
      evidence: ["晚间保存更高", "内容用于次日早餐", "早晨评论仍有价值"],
      confidence: 86,
      risk: "只依赖晚间发布可能错过早晨执行提醒。",
      nextAction: "设计早晨唤醒测试"
    }
  }
];

const playbooks: Playbook[] = [
  {
    id: "planning-metric",
    name: "规划型内容优先保存率",
    audience: "需要计划、收藏、复访的内容团队。",
    scenario: "早餐规划、购物清单、预算清单。",
    rule: "如果内容目标是帮助用户计划下一步，不要只看点赞，应优先看保存率、评论提问数和完读率。",
    example: "五分钟早餐系统、一周购物清单、无冰箱办公室早餐清单。",
    evidence: "保存率、评论提问和关注转化同步高于基准。",
    risk: "如果内容只追求收藏但缺少后续行动，可能带来高保存低转化。",
    confidence: 92
  },
  {
    id: "constraint-hook",
    name: "限制场景 Hook 模板",
    audience: "面对明确限制条件的内容选题。",
    scenario: "时间有限、预算有限、没有冰箱、通勤场景。",
    rule: "用“如果你没有 X / 如果你只有 Y / 如果你需要 Z”开头，快速筛选真实受众。",
    example: "如果你办公室没有冰箱，先保存这一版早餐清单。",
    evidence: "限制场景版本带来更多评论提问。",
    risk: "语气过强会让用户感到被指责。",
    confidence: 88
  },
  {
    id: "constraint-topic",
    name: "评论限制场景转选题",
    audience: "需要从复盘进入下一轮选题的内容运营。",
    scenario: "评论中反复出现没时间、没预算、没设备、没场地等限制。",
    rule: "把高频限制条件直接转成下一篇内容标题和内容简报。",
    example: "无冰箱办公室早餐清单。",
    evidence: "无冰箱和预算问题重复出现，并支持下一轮内容机会。",
    risk: "不能只复述问题，要给出可执行方案。",
    confidence: 93
  },
  {
    id: "checklist-format",
    name: "清单轮播执行模板",
    audience: "需要保存和执行的内容格式。",
    scenario: "步骤、清单、矩阵、计划表。",
    rule: "每页只解决一个决策点，用颜色分组和替代箭头降低理解成本。",
    example: "蛋白质 / 碳水 / 便携补充三列清单。",
    evidence: "清单轮播完读率 64%，但食材分组仍被追问。",
    risk: "信息密度太高会降低完读率。",
    confidence: 87
  },
  {
    id: "publishing-time",
    name: "晚间规划窗口发布",
    audience: "发布次日执行型内容的团队。",
    scenario: "早餐、购物和办公室准备内容。",
    rule: "主发布放在前一晚，次日早晨用评论或二次分发唤醒行动。",
    example: "周日晚 20:30 发布早餐清单，周一早上置顶评论提醒执行。",
    evidence: "晚间保存更高，早晨评论仍有补充价值。",
    risk: "缺少早晨唤醒会损失执行场景。",
    confidence: 86
  }
];

const timeline = [
  { step: "初始研究主题", decision: "办公室人群健康早餐", evidence: "用户需要更现实的早餐方案。", output: "研究主题进入趋势发现。" },
  { step: "趋势发现", decision: "选择平价高蛋白早餐", evidence: "保存意图强、受众匹配高。", output: "锁定预算友好的早餐机会。" },
  { step: "竞品机会缺口", decision: "竞品忽略预算、无冰箱和通勤限制", evidence: "评论反复追问替代和存放场景。", output: "机会缺口转入策略页。" },
  { step: "内容策略", decision: "预算友好的办公室早餐规划系统", evidence: "时间、预算、办公室场景同时成立。", output: "确定内容支柱和格式。" },
  { step: "内容工作室", decision: "使用高互动版本", evidence: "评论入口强，能收集限制场景。", output: "生成清单轮播初稿。" },
  { step: "发布计划", decision: "工作日前一晚发布", evidence: "内容依赖保存和次日使用。", output: "确认发布窗口和测试计划。" },
  { step: "数据复盘", decision: "保存率验证策略有效", evidence: "保存率 18.6%，评论提问 132。", output: "识别无冰箱下一轮机会。" },
  { step: "策略沉淀", decision: "沉淀 Playbook", evidence: "规则在策略、发布和分析中重复出现。", output: "进入下一轮内容循环。" }
];

const worked = [
  { conclusion: "保存率是更强的策略指标", why: "规划型内容的价值是被用户保存和复用。", evidence: "保存率 18.6%，高于基准。", next: "继续用保存率作为主指标。" },
  { conclusion: "限制场景比泛泛健康承诺更有效", why: "限制能快速筛选真实受众。", evidence: "评论提问集中在没冰箱、预算、时间。", next: "保留限制场景 Hook。" },
  { conclusion: "清单轮播适合规划型内容", why: "结构化内容更容易保存和完读。", evidence: "完读率 64%。", next: "优化视觉分组后继续使用。" },
  { conclusion: "晚间发布更适合保存", why: "用户在前一晚更容易做次日规划。", evidence: "晚间发布保存表现更强。", next: "加入次日早晨评论唤醒。" }
];

const failed = [
  { conclusion: "五分钟系统还不够具体", why: "用户继续追问无冰箱和替代场景。", evidence: "评论限制条件重复。", next: "下一轮收窄到无冰箱办公室早餐。" },
  { conclusion: "食材替代说明不足", why: "用户需要按可购买食材调整方案。", evidence: "替代食材问题高频出现。", next: "增加替代矩阵。" },
  { conclusion: "成本区间需要更明确", why: "预算是执行阻碍。", evidence: "预算评论重复。", next: "补充价格区间和假设。" },
  { conclusion: "早晨二次触达不足", why: "晚间保存强，但早晨执行提醒弱。", evidence: "早晨仍有少量评论价值。", next: "测试次日置顶评论。" }
];

const recommendations = [
  { title: "做一篇“无冰箱办公室早餐清单”", why: "这是最具体的下一轮机会。", evidence: "无冰箱场景重复出现。", priority: "高机会", format: "清单轮播", action: "开始下一轮研究。" },
  { title: "增加预算区间和食材替代", why: "解决保存后的执行阻碍。", evidence: "预算和替代评论高频。", priority: "高机会", format: "替代矩阵", action: "生成食材替代内容简报。" },
  { title: "做一套“一周早餐规划表”", why: "承接关注转化和系列化需求。", evidence: "用户要求一周计划。", priority: "中机会", format: "规划模板轮播", action: "安排周末发布测试。" },
  { title: "测试早晨评论唤醒", why: "补足早晨执行场景。", evidence: "发布时间测试部分验证。", priority: "中机会", format: "置顶评论", action: "下次发布后早晨追加评论。" },
  { title: "将早餐清单复用为短视频脚本", why: "清单步骤可转成过程证明。", evidence: "清单轮播完读表现稳定。", priority: "低机会", format: "短视频脚本", action: "拆成 15 秒镜头脚本。" }
];

const memories: MemoryItem[] = [
  { category: "受众记忆", content: "办公室人群更愿意保存限制条件明确的早餐方案，而不是泛泛健康灵感。", source: "早餐规划复盘", updatedAt: "2026-07-01", confidence: "高信心", playbookIds: ["constraint-topic", "constraint-hook"] },
  { category: "平台记忆", content: "小红书规划型内容需要封面快速说明场景和保存理由。", source: "封面测试", updatedAt: "2026-07-01", confidence: "中信心", playbookIds: ["checklist-format"] },
  { category: "内容格式记忆", content: "清单轮播适合早餐规划，但必须降低信息密度。", source: "完读率复盘", updatedAt: "2026-07-01", confidence: "高信心", playbookIds: ["checklist-format"] },
  { category: "Hook 记忆", content: "限制场景 Hook 能引发评论，但语气要避免责备。", source: "Hook 测试", updatedAt: "2026-07-01", confidence: "高信心", playbookIds: ["constraint-hook"] },
  { category: "发布时间记忆", content: "次日执行型内容适合前一晚发布，再用早晨评论唤醒。", source: "发布时间测试", updatedAt: "2026-07-01", confidence: "中信心", playbookIds: ["publishing-time"] },
  { category: "指标记忆", content: "规划型内容应优先看保存率、评论提问数和完读率。", source: "数据复盘", updatedAt: "2026-07-01", confidence: "高信心", playbookIds: ["planning-metric"] },
  { category: "风险记忆", content: "不要把保存率规则泛化到曝光型内容。", source: "AI 决策面板", updatedAt: "2026-07-01", confidence: "中信心", playbookIds: ["planning-metric"] }
];

const topicOptions = ["办公室人群健康早餐"];
const platformOptions = ["小红书"];
const cycleOptions = ["2026 Q3 · 早餐策略循环"];
const statusOptions = ["已验证", "部分验证", "待沉淀"];
const typeOptions = ["全部策略资产", "Playbook", "受众洞察", "指标判断"];

export default function StrategyHubPage() {
  const [topic, setTopic] = useState(topicOptions[0]);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [cycle, setCycle] = useState(cycleOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [type, setType] = useState(typeOptions[0]);
  const [selectedAssetId, setSelectedAssetId] = useState(assets[0].id);
  const [selectedPlaybookId, setSelectedPlaybookId] = useState(assets[0].playbookId);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) ?? assets[0];
  const selectedPlaybook = playbooks.find((playbook) => playbook.id === selectedPlaybookId) ?? playbooks[0];
  const savedCount = savedIds.length;

  const selectAsset = (asset: StrategyAsset) => {
    setSelectedAssetId(asset.id);
    setSelectedPlaybookId(asset.playbookId);
  };

  const saveSelectedAsset = () => {
    setSavedIds((current) => (current.includes(selectedAsset.id) ? current : [...current, selectedAsset.id]));
  };

  return (
    <AppShell title="AI 策略中心">
      <div className="space-y-5">
        <section className="animate-floatIn rounded-3xl border border-white/80 bg-white/82 p-5 shadow-card">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-brand-blue">AI 策略中心</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">下一轮应该怎么优化？</h1>
              <p className="mt-3 text-sm leading-6 text-ink-500">把复盘结果沉淀为可复用的内容策略资产。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <ContextChip label="研究主题" value="办公室人群健康早餐" />
                <ContextChip label="已验证方向" value="预算友好的办公室早餐规划系统" />
                <ContextChip label="下一轮机会" value="无冰箱办公室早餐清单" />
                <ContextChip label="主要指标" value="保存率" />
              </div>
            </div>
            <div className="grid w-full gap-3 md:grid-cols-2 xl:max-w-3xl xl:grid-cols-3 2xl:grid-cols-5">
              <FieldSelect label="研究主题" value={topic} options={topicOptions} onChange={setTopic} />
              <FieldSelect label="平台" value={platform} options={platformOptions} onChange={setPlatform} />
              <FieldSelect label="项目周期" value={cycle} options={cycleOptions} onChange={setCycle} />
              <FieldSelect label="策略状态" value={status} options={statusOptions} onChange={setStatus} />
              <FieldSelect label="沉淀类型" value={type} options={typeOptions} onChange={setType} />
            </div>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section className="space-y-5">
            <StrategyLearningSummary selectedAsset={selectedAsset} savedCount={savedCount} />
            <ValidatedAssets selectedId={selectedAsset.id} savedIds={savedIds} onSelect={selectAsset} />
          </section>
          <aside className="space-y-5 xl:sticky xl:top-0 xl:self-start">
            <AIDecisionPanel
              data={{
                ...selectedAsset.decision,
                nextAction: savedIds.includes(selectedAsset.id) ? "已保存为策略资产" : selectedAsset.decision.nextAction
              }}
              compact
              className="xl:col-span-1"
              onAction={saveSelectedAsset}
            />
          </aside>
        </div>

        <ReusablePlaybook selectedId={selectedPlaybook.id} onSelect={setSelectedPlaybookId} />
        <FinalCycleCta selectedPlaybook={selectedPlaybook} selectedAsset={selectedAsset} />
      </div>
    </AppShell>
  );
}

function ContextChip({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-brand-blue">{label}: {value}</span>;
}

function StrategyLearningSummary({ selectedAsset, savedCount }: { selectedAsset: StrategyAsset; savedCount: number }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">本轮策略学习</p>
          <h2 className="mt-2 text-2xl font-semibold">预算友好的办公室早餐规划方向成立，但下一轮需要收窄到无冰箱场景。</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
            已保存 {savedCount} 个策略资产。当前选中资产：{selectedAsset.name}。
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">信心分数</p>
          <p className="mt-1 text-2xl font-semibold">{selectedAsset.confidence}%</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <DarkInfo label="复盘结论" value="规划方向有效，保存率和评论信号都支持继续做成系列。" />
        <DarkInfo label="已验证的策略" value="规划型内容优先看保存率，限制场景比泛泛健康建议更能引发保存和评论。" />
        <DarkInfo label="未解决的问题" value="食材替代、预算区间和办公室存放条件仍需具体化。" />
        <DarkInfo label="下一轮内容机会" value="无冰箱办公室早餐清单。" />
        <DarkInfo label="推荐沉淀 Playbook" value="规划型内容优先保存率。" />
      </div>
    </section>
  );
}

function WorkflowTimeline() {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">工作流时间线</h2>
        <p className="mt-1 text-sm text-ink-500">从研究主题到策略沉淀的完整证据链。</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {timeline.map((item, index) => (
          <div key={item.step} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-blue">{index + 1}. {item.step}</span>
            <InfoLine label="关键决策" value={item.decision} />
            <InfoLine label="证据信号" value={item.evidence} />
            <InfoLine label="输出结果" value={item.output} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ValidatedAssets({
  selectedId,
  savedIds,
  onSelect
}: {
  selectedId: string;
  savedIds: string[];
  onSelect: (asset: StrategyAsset) => void;
}) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">已验证策略资产</h2>
        <p className="mt-1 text-sm text-ink-500">选择资产会更新 AI 决策面板和可复用 Playbook。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => {
          const selected = asset.id === selectedId;
          const saved = savedIds.includes(asset.id);

          return (
            <button
              key={asset.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(asset)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-brand-purple">{asset.type}</span>
                {saved ? <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-brand-green">已保存</span> : null}
              </div>
              <h3 className="mt-4 text-sm font-semibold leading-5">{asset.name}</h3>
              <InfoLine label="适用场景" value={asset.scenario} />
              <InfoLine label="证据" value={asset.evidence} />
              <InfoLine label="可复用方式" value={asset.reusable} />
              <p className="mt-3 text-xs font-semibold text-brand-blue">{asset.confidence}% 信心</p>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function WorkedFailed() {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">有效与失效</h2>
        <p className="mt-1 text-sm text-ink-500">区分可以复用的策略和下一轮必须调整的假设。</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <ResultColumn title="有效的策略" items={worked} tone="green" />
        <ResultColumn title="需要调整的假设" items={failed} tone="amber" />
      </div>
    </Card>
  );
}

function ResultColumn({ title, items, tone }: { title: string; items: typeof worked; tone: "green" | "amber" }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.conclusion} className="rounded-2xl bg-white p-4">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{item.conclusion}</span>
            <InfoLine label="为什么" value={item.why} />
            <InfoLine label="证据" value={item.evidence} />
            <InfoLine label="下一步" value={item.next} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReusablePlaybook({ selectedId, onSelect }: { selectedId: string; onSelect: (playbookId: string) => void }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">可复用 Playbook</h2>
        <p className="mt-1 text-sm text-ink-500">选择 Playbook 会更新最终 CTA 摘要，帮助进入下一轮研究。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {playbooks.map((playbook) => {
          const selected = playbook.id === selectedId;

          return (
            <button
              key={playbook.id}
              className={`focus-ring rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card ${
                selected ? "border-blue-300 bg-blue-50/80 ring-1 ring-blue-100" : "border-gray-200 bg-white hover:border-blue-100"
              }`}
              onClick={() => onSelect(playbook.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">{playbook.name}</h3>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-brand-green">{playbook.confidence}%</span>
              </div>
              <InfoLine label="适用对象" value={playbook.audience} />
              <InfoLine label="使用场景" value={playbook.scenario} />
              <InfoLine label="操作规则" value={playbook.rule} />
              <InfoLine label="示例" value={playbook.example} />
              <InfoLine label="证据" value={playbook.evidence} />
              <InfoLine label="风险" value={playbook.risk} />
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function NextRoundRecommendations({ selectedAsset }: { selectedAsset: StrategyAsset }) {
  const prioritized = selectedAsset.id === "no-fridge" ? recommendations : recommendations.slice(0, 4);

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">下一轮建议</h2>
        <p className="mt-1 text-sm text-ink-500">根据当前策略资产推荐下一轮内容动作。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {prioritized.map((item) => (
          <div key={item.title} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses(item.priority === "高机会" ? "green" : item.priority === "中机会" ? "amber" : "neutral")}`}>{item.priority}</span>
            <h3 className="mt-4 text-sm font-semibold leading-5">{item.title}</h3>
            <InfoLine label="为什么" value={item.why} />
            <InfoLine label="证据" value={item.evidence} />
            <InfoLine label="推荐内容格式" value={item.format} />
            <InfoLine label="下一步动作" value={item.action} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function MemoryBank({ memories: visibleMemories }: { memories: MemoryItem[] }) {
  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold">策略记忆库</h2>
        <p className="mt-1 text-sm text-ink-500">按类别沉淀可复用的策略记忆。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleMemories.map((memory) => (
          <div key={`${memory.category}-${memory.content}`} className="rounded-2xl border border-gray-100 bg-surface-soft p-4">
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-blue">{memory.category}</span>
            <p className="mt-4 text-sm font-semibold leading-6 text-ink-950">{memory.content}</p>
            <InfoLine label="来源项目" value={memory.source} />
            <InfoLine label="更新时间" value={memory.updatedAt} />
            <InfoLine label="信心状态" value={memory.confidence} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function FinalCycleCta({ selectedPlaybook, selectedAsset }: { selectedPlaybook: Playbook; selectedAsset: StrategyAsset }) {
  return (
    <section className="animate-floatIn rounded-3xl border border-gray-200 bg-ink-950 p-5 text-white shadow-glass">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-blue-100">内容循环完成</p>
          <h2 className="mt-2 text-2xl font-semibold">开启下一轮内容策略循环</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <DarkInfo label="已沉淀 Playbook" value={selectedPlaybook.name} />
            <DarkInfo label="下一轮研究主题" value="无冰箱办公室早餐清单" />
            <DarkInfo label="推荐趋势方向" value={selectedAsset.name} />
            <DarkInfo label="推荐内容格式" value="清单轮播 / 替代矩阵" />
            <DarkInfo label="需要继续验证的问题" value="成本区间、食品存放风险、早晨评论唤醒。" />
          </div>
        </div>
        <Link
          href="/"
          className="focus-ring rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-ink-950 shadow-card transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          开始下一轮研究
        </Link>
      </div>
    </section>
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
