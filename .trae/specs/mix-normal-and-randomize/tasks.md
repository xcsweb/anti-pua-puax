# Tasks

- [ ] Task 1: 乱序逻辑的实现（题目与选项）
  - [ ] SubTask 1.1: 编写一个 `shuffleArray` 工具函数（如 Fisher-Yates 算法）。
  - [ ] SubTask 1.2: 在 `src/store/useStore.ts` 的 `answerQuestion` 或抽题初始化阶段，确保返回给页面的 `filteredQuestions` 及其每个 `options` 都是打乱顺序的，使得用户无法仅凭选项位置得分。

- [ ] Task 2: 题库内容的深度优化（防刺猬人格）
  - [ ] SubTask 2.1: 在 `src/data/questions.ts` 中新增 10 道以上的“常规关怀与合理要求”题。这些题没有 PUA，只是测试用户的基本信任和服从，对合理的关心或求助，合作且温暖的回复获得高分。
  - [ ] SubTask 2.2: 全面核查并重写现有题库中 `romance` 和 `family` 角色的高分回复。将生硬冷酷的回复（如直接拒绝、嘲讽）修改为带有亲近感、能先共情但坚定自己底线的回答。

# Task Dependencies
- [Task 2] depends on [Task 1]