## 1. 架构设计
```mermaid
graph TD
    A[用户界面 Frontend] --> B[React@18 + Vite]
    B --> C[Tailwind CSS (新粗野主义样式)]
    B --> D[Framer Motion (硬核交互动画)]
    B --> E[本地数据状态管理]
    E --> F[题库及逻辑计算 (纯前端实现)]
```

## 2. 技术描述
- **前端框架**：React@18 + Vite，使用 TypeScript，轻量、高性能。
- **样式方案**：Tailwind CSS @3，通过自定义 `tailwind.config.js` 配置 `border-width` 和硬阴影 (Neo-Brutalism style)。
- **动画库**：Framer Motion，实现卡片滑入、按钮按压等硬核动效，不使用复杂的微交互，强调视觉冲击。
- **状态管理**：React 自身的 `useState` / `useReducer` 或 `Zustand`，用来保存 4 个维度 (如S/B/T/I) 的得分。
- **部署模式**：完全的纯前端 SPA，无后端依赖。所有题库、评分规则都硬编码或配置在前端的 JSON 结构中。

## 3. 路由定义
| 路由 | 用途 |
|-------|---------|
| `/` | 首页：介绍与开始测试 |
| `/assessment` | 测试页：渲染10道题（普通题与聊天游戏题混合） |
| `/result` | 结果页：展示最终得分（如：S-B-T-I）、人格解读与分享 |

## 4. 数据模型设计 (纯前端)

### 4.1 题库数据结构 (Question Definition)
使用一个静态数组保存所有题目，每道题包含：
- `id`: 唯一标识
- `type`: "text" (文字选择题) | "chat" (聊天游戏题)
- `content`: 题目描述，若为 "chat" 则是一段对方发来的对话数组。
- `options`: 选项数组
  - `text`: 选项文本
  - `scores`: 一个对象，包含4个维度（如 `S`、`B`、`T`、`I` 轴）的得分增量。

### 4.2 评分规则 (Scoring Rule)
我们定义四条轴，每条轴有正负极（类似MBTI的 E/I, S/N, T/F, J/P）：
1. **S 轴 (Sober 清醒 vs. Sucker 韭菜)**：判断是否容易被洗脑。
2. **B 轴 (Brave 勇敢 vs. Blind 盲从)**：判断敢不敢反驳对方。
3. **T 轴 (Tough 强硬 vs. Tender 讨好)**：判断是否总是讨好别人。
4. **I 轴 (Independent 独立 vs. Insecure 焦虑)**：判断是否容易陷入情感焦虑。

用户答完后，根据每条轴的总分是正数还是负数，映射出一个字母，最终拼成4个字母的结果（如 `SBTI` 代表“清醒、勇敢、强硬、独立”，即反PUA王者；相反如 `SBTK` 等等）。

## 5. 组件划分
- `Home`: 首页视图，巨大的按钮和警告语。
- `QuestionCard`: 文字题组件，大字号、粗边框的卡片。
- `ChatSimulation`: 模拟微信对话框组件，点击选项后模拟发送气泡。
- `ProgressBar`: 顶部进度条组件。
- `ResultDisplay`: 结果展示组件，支持雷达图或动态大字排版，并能一键保存为海报（使用 `html2canvas`）。
