# 全场景防PUA测试 Spec

## Why
情感操控（PUA）和套路不仅存在于恋爱关系中，职场（领导画大饼、同事甩锅）和原生家庭（父母情感勒索、道德绑架）同样是精神内耗的重灾区。将测试场景扩充到全生活场景，能让测试更全面、更出圈，引发更多打工人和年轻人的共鸣。

## What Changes
- 将项目名称从偏向恋爱防渣为主，升级为**“全场景防PUA体质测试 - PUAX图鉴”**，涵盖职场、家庭、社交和恋爱。
- **BREAKING**: 更新数据模型 `Question`，新增 `senderName`（发送者备注名，如“王总”、“母上大人”）和 `category`（场景分类：work, family, romance, social）。
- 重新设计微信对话框组件 `ChatSimulation` 的顶部导航栏，使其高度还原真实微信聊天界面，顶部居中动态显示聊天对象的备注名（替代之前生硬的“微信(1)”）。
- 扩充并调整题库，按比例加入职场（领导、同事）、家庭（父母、亲戚）等全新场景题。

## Impact
- Affected specs: 数据模型 `src/types/index.ts`、题库 `src/data/questions.ts`、对话框组件 `src/components/ChatSimulation.tsx`。
- Affected code: 首页文案、测试引擎渲染逻辑。

## ADDED Requirements
### Requirement: 动态微信对话框抬头
系统应当能根据当前题目的设定，动态渲染微信聊天框的对方名称。

#### Scenario: 遇到职场PUA题
- **WHEN** 用户进入一道分类为“职场”的题目（如领导周末派活）
- **THEN** 微信聊天框顶部显示“王总”或“张主管”，让用户瞬间代入打工人的窒息感。

### Requirement: 多场景混合题库
系统应当包含涵盖恋爱、职场、家庭等多个维度的混合题库，全面评估用户的 PUAX 防御值。