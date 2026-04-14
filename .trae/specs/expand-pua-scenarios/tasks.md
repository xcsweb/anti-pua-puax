# Tasks

- [ ] Task 1: 更新数据模型
  - [ ] SubTask 1.1: 在 `src/types/index.ts` 中为 `Question` 接口增加 `senderName` (聊天对象备注名) 和 `category` (场景分类) 字段。

- [ ] Task 2: 改造微信对话框组件
  - [ ] SubTask 2.1: 修改 `src/components/ChatSimulation.tsx`，将顶部导航栏的“微信(1)”改为动态显示 `question.senderName`，高度还原微信真实的聊天头部，增强沉浸感。

- [ ] Task 3: 扩充全场景题库
  - [ ] SubTask 3.1: 在 `src/data/questions.ts` 中加入领导画大饼、同事甩锅、父母道德绑架等全新场景题，并为每道题配置合适的 `senderName`（如“王总”、“母上大人”、“相亲对象”）。

- [ ] Task 4: 更新全局文案与首页
  - [ ] SubTask 4.1: 更新 `src/pages/Home.tsx` 和其他页面的文案，强调这是“全场景防PUA”（涵盖职场、家庭、恋爱）的综合体质测试。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 3]