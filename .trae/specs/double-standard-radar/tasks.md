# Tasks

- [ ] Task 1: 升级状态管理与计分逻辑
  - [ ] SubTask 1.1: 更新 `src/types/index.ts` 中的 `StoreState`，增加 `categoryScores: Record<Category, ScoreOption>`，用于记录职场、家庭、情感三个场景的独立得分。
  - [ ] SubTask 1.2: 更新 `src/store/useStore.ts` 的 `answerQuestion` 方法，不仅要累加全局 `scores`，还要同步更新当前题目 `category` 的独立分数。

- [ ] Task 2: 新增评分分析工具函数
  - [ ] SubTask 2.1: 在 `src/utils/scoring.ts` 中新增一个 `calculateCategoryDefense(scores: ScoreOption): number`，用于将单场景的四个维度的总和折算为一个 0-100 的抗压防御力指数。
  - [ ] SubTask 2.2: 在 `src/utils/scoring.ts` 中新增一个 `getDoubleStandardComment(work: number, family: number, romance: number): string`，根据三个指数的极差（如职场很低、家庭很高），返回极具嘲讽意味的短评（如：“窝里横战神：职场唯唯诺诺，家里重拳出击”）。

- [ ] Task 3: 改造图鉴海报（Result.tsx）
  - [ ] SubTask 3.1: 在 `Result.tsx` 中引入 `recharts` 库（或纯 CSS 条形图）展示三个场景（职场防御、家庭防御、情感防御）的进度条对比。
  - [ ] SubTask 3.2: 将 SubTask 2.2 生成的“双标短评”渲染到海报中的醒目位置，增强社交分享的吐槽属性。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]