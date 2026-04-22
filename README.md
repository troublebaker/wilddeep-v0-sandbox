# wilddeep · v0-sandbox

> **给 v0.dev 的项目说明（v0 会自动读这个 README 作为上下文）**

## 这是什么

这是 **wilddeep** 主项目的 UI 沙箱。所有 UI 草稿先在这里跑通、看顺眼，再被人工"吸收"到主项目。

- 主项目：`wilddeep`（端口 3000，Next.js 16 + Tailwind v4 + Convex + Clerk）
- 本沙箱：`v0-sandbox`（端口 3002，**只跑 UI，不连后端**）

## wilddeep 是什么应用（一句话）

**深度对话浏览器** — 把和 LLM 的线性对话变成思维树，支持四件事：

1. **分支提问 Branching**：从某个回答的某句话引申新对话
2. **广度泛化 Fan-out**：让小模型把一个主题拆成 N 个子方向，并行问大模型
3. **深度链 Deep Dive**：单线程一问一答串成链
4. **总结 Fan-in**：把多条对话/分支聚合成总结

UI 风格：**克制、信息密度中等、有树/链状视觉隐喻**。不是聊天框，是浏览器。

## 技术栈（本沙箱）

| 项 | 值 |
|---|---|
| Next.js | 16.x（App Router，**不要**用 Pages Router） |
| React | 19.x |
| Tailwind | **v4**（CSS-first 配置，无 `tailwind.config.js`） |
| 组件库 | **shadcn/ui**（已装：button / card / input / label / dialog / dropdown-menu / separator / textarea / tabs / sheet） |
| 图标 | `lucide-react` |
| 主题 | shadcn `neutral` + OKLCH，深色支持 |

## 目录约定（**v0 必须遵守**）

每个新页面放到 `app/<route-name>/page.tsx`，路由名用主项目未来会用的名字。当前已存在：

```
app/
├── page.tsx              # 沙箱首页（页面索引）
├── login/page.tsx        # 登录页草稿（mock）
├── <你即将生成的页面>/page.tsx
```

**预留路由（v0 生成对应页面时请用这些路径）**：

| 路径 | 用途 |
|---|---|
| `app/login/page.tsx` | 登录入口（已 mock） |
| `app/sign-up/page.tsx` | 注册入口 |
| `app/dashboard/page.tsx` | 登录后首页：会话列表 + 新建按钮 |
| `app/conversation/[id]/page.tsx` | 单个对话的树视图（核心页面） |
| `app/conversation/[id]/branch/[branchId]/page.tsx` | 进入某个分支后的链视图 |
| `app/explore/page.tsx` | Fan-out 起点：输入主题，看小模型拆分 |
| `app/summary/[id]/page.tsx` | Fan-in 总结结果页 |
| `app/settings/page.tsx` | 用户设置（模型、API Key 显示等） |

## 强约束（**v0 生成代码时不要破坏**）

1. ✅ **必须用 shadcn/ui** 已装的组件（`@/components/ui/*`），不要自己造 Button / Card
2. ✅ **必须用 Tailwind 工具类**，不写内联 style，不写 css module
3. ✅ **使用 design token**：`bg-background` / `text-foreground` / `bg-primary` / `text-muted-foreground` / `border-border`，**不要**写死 `bg-zinc-50`
4. ✅ **图标用 `lucide-react`**
5. ❌ **不要导入** `convex/*`、`@clerk/nextjs`、`@/coding/*`、`@/hooks/*`（沙箱无后端）
6. ❌ **不要写真实业务逻辑**，需要数据就用 hard-code 的 mock 数组放在文件顶部
7. ❌ **不要装新依赖**（除非是 shadcn 官方组件或 `lucide-react` 现有图标）
8. ✅ 中文 UI 文案（这是一个中文用户的应用）
9. ✅ 默认深色友好：所有颜色都要 `dark:` 变体可读

## 主题色已定义

`app/globals.css` 已包含完整的 OKLCH neutral palette：
- `--background` / `--foreground` / `--primary` / `--muted` / `--accent` / `--destructive` / `--border` / `--ring`
- 自动支持 `prefers-color-scheme: dark`

直接用 `bg-primary text-primary-foreground` 这种语义色就好。

## 文件长这样的就对了

参考 `app/login/page.tsx`：
- `'use client'`（如果用了 hooks/handler）
- 默认导出 `default function PageName()`
- 顶部 `import { Card, ... } from '@/components/ui/card'`
- 整体 `<main className="min-h-screen bg-background text-foreground ...">`
- 所有交互按钮 `type="button"`（沙箱不提交表单）

## 沙箱首页会自动列出页面

每加一个新页面后，去 `app/page.tsx` 的 `PAGES` 数组加一行就出现在索引里。

## 这不是什么

- ❌ 不是部署目标（不会上生产）
- ❌ 不是测试场（没有单元测试）
- ❌ 不是数据层（任何"数据"都是顶部 const 写死的）

**沙箱的唯一目的：让 v0 生成的 UI 能立刻被肉眼检阅。**
