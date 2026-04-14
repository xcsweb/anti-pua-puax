# 双标雷达图（场景差异化分析）Spec

## Why
在全场景防PUA测试中，很多人存在严重的“双标”现象：例如在职场对老板唯唯诺诺（讨好型），但在家里对父母或子女却重拳出击（强硬型）；或者在感情中极度清醒，在职场却被疯狂画大饼。
在最终的图鉴（结果页）中，仅展示一个综合的 PUAX 结果是不够的，我们需要引入按 `category`（场景）细分的分数统计，并通过“雷达图”或“多维度条形图”直观地展示用户在「职场」、「家庭」、「情感」三端的真实防御力差异，从而揭露这种“双标”现象。

## What Changes
- **BREAKING**: 更新 `useStore.ts` 中的计分逻辑。除了全局的 `scores` 外，新增 `categoryScores: Record<Category, ScoreOption>`，用于分别记录用户在不同场景下的独立得分。
- 引入 `recharts` 库（或使用纯 CSS 实现条形图/雷达图），在 `Result.tsx` 的海报中新增一个【场景防御力扫描】图表模块。
- 图表将展示三大场景（职场、家庭、情感）的综合防御值（可基于 PUAX 分数折算为一个 0-100 的抗压指数）。
- 根据各个场景的分数差值，动态生成一段“双标鉴定”短评（例如：“外战外行，内战内行”、“职场卷王，情场韭菜”）。

## Impact
- Affected specs: 状态管理 `useStore.ts`，图表展示 `Result.tsx`，工具类 `scoring.ts`。
- Affected code: `package.json`（新增图表依赖），结果页渲染逻辑。

## ADDED Requirements
### Requirement: 场景细分计分机制
系统应当能够在用户每次答题时，同时更新全局分数和对应 `category` 的独立分数。

#### Scenario: 职场与家庭双标测试
- **WHEN** 用户在职场题中选择讨好选项，在家庭题中选择强硬选项
- **THEN** 系统的 `categoryScores.work` 记录负向 U 值，`categoryScores.family` 记录正向 U 值。结果页将分别计算这两项的抗压指数，展现出明显的差值。

### Requirement: 双标图鉴展示
在最终生成的海报图鉴中，需增加一个图表或数据栏，清晰展示三个场景的防御力得分，并附带针对性的吐槽评价。