# Tasks

- [x] Task 1: 初始化项目结构
  - [x] SubTask 1.1: 创建 React + Vite 项目，配置 TypeScript。
  - [x] SubTask 1.2: 安装 Tailwind CSS、Framer Motion、Lucide-React 和 React Router。
  - [x] SubTask 1.3: 配置 Tailwind `tailwind.config.js` 以支持 Neo-Brutalism 风格的粗边框和硬阴影。

- [x] Task 2: 建立核心数据与状态管理
  - [x] SubTask 2.1: 设计并硬编码题库数据 `questions.ts`，包含至少10道题，区分文字题和聊天题，每题附带四维（S, B, T, I）得分。
  - [x] SubTask 2.2: 设计评分系统，定义四个维度的得分逻辑，以及映射到四字“SBTI”结果的规则。
  - [x] SubTask 2.3: 编写全局状态（或使用 React Context / Zustand）存储用户当前题目进度和四维得分。

- [x] Task 3: 开发首页 (Home Page)
  - [x] SubTask 3.1: 渲染带有醒目标语和跑马灯背景的粗野主义风格首屏。
  - [x] SubTask 3.2: 制作带有点击下压动画的“开始测试”大按钮。

- [x] Task 4: 开发测试页 (Assessment Page)
  - [x] SubTask 4.1: 实现顶部进度条，粗犷的视觉样式。
  - [x] SubTask 4.2: 实现文字题组件 `QuestionCard`，大号字体，硬边框选项按钮。
  - [x] SubTask 4.3: 实现模拟聊天组件 `ChatSimulation`，左侧显示对方发来的气泡（含PUA话术），底部显示己方回复选项，点击后带有发送动画。
  - [x] SubTask 4.4: 绑定答题逻辑，在点击选项后更新分数，自动跳入下一题，或者如果全部答完则计算结果并跳转到结果页。

- [x] Task 5: 开发结果页 (Result Page)
  - [x] SubTask 5.1: 动态生成四字人格结果（如：SBTI、MUSH），带有炫酷的入场动画。
  - [x] SubTask 5.2: 渲染该人格的详细解读卡片（如：你是一个极度清醒的“鉴婊/渣达人”）。
  - [x] SubTask 5.3: 添加“重新测试”按钮。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 2]
- [Task 5] depends on [Task 4]
