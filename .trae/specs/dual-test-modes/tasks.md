# Tasks

- [ ] Task 1: 升级数据模型与状态管理
  - [ ] SubTask 1.1: 更新 `src/types/index.ts` 中的 `StoreState`，增加 `testMode: 'romance' | 'full' | null` 字段。为 `Question` 接口增加可选的 `relationshipStage: 'friend' | 'dating' | 'engaged' | 'married' | 'ex'` 字段。
  - [ ] SubTask 1.2: 更新 `src/store/useStore.ts` 的 `setTestMode` 方法，并在 `resetTest` 中清空。

- [ ] Task 2: 改造首页双模式入口
  - [ ] SubTask 2.1: 修改 `src/pages/Home.tsx`，主推“赛博恋爱段位测试”（默认入口，需要选性别），次推“全景防PUA综合测试”（不需要选性别，或选通用），确保按钮层级明显。

- [ ] Task 3: 扩充题库至 90 道（40 恋爱 + 50 全景）
  - [ ] SubTask 3.1: 在 `src/data/questions.ts` 中新增/修改 40 道纯恋爱题（男女各 20 道，涵盖朋友、交往、未婚、已婚、前任 5 个阶段）。
  - [ ] SubTask 3.2: 新增 50 道全场景综合题（如 15 职场，15 家庭，10 社交，10 情感混合）。
  - [ ] SubTask 3.3: 更新 `Assessment.tsx`，根据当前的 `testMode` 和 `gender`（若是恋爱模式）筛选出对应的题目。

- [ ] Task 4: 极致化图鉴文案（scoring.ts）
  - [ ] SubTask 4.1: 在 `src/utils/scoring.ts` 中，为 16 种结果注入“吸渣体质”、“纯爱战神”、“顶级海王”等极具攻击性和网感的抽象文案。

- [ ] Task 5: 优化 1920px 超大屏响应式适配
  - [ ] SubTask 5.1: 优化 `Home.tsx`、`Assessment.tsx`、`ChatSimulation.tsx`、`Result.tsx` 和 `Gallery.tsx`，使用 `max-w-screen-xl`、`xl:grid-cols-4`、`2xl:grid-cols-5` 等类名，保证 PC 大屏下的 Neo-Brutalism 视觉冲击力和居中排版。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 2, Task 3, Task 4]