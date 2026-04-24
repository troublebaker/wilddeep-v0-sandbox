import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const PAGES: Array<{
  href: string
  title: string
  description: string
  status: 'draft' | 'absorbed' | 'mock'
  source: string
}> = [
  {
    href: '/login',
    title: '登录卡片',
    description: 'wilddeep 的登录壳，邮件 + Google',
    status: 'mock',
    source: '示例 — 由 AI 工程师手写，模拟 v0 输出风格',
  },
  {
    href: '/sign-up',
    title: '注册页',
    description: '邮箱注册或 Google 注册，含四种状态（默认 / 填写中 / 提交中 / 邮件已发送）',
    status: 'draft',
    source: 'v0 生成',
  },
  {
    href: '/dashboard',
    title: '主面板',
    description: '用户对话列表，含侧边栏导航、搜索、空状态',
    status: 'draft',
    source: 'v0 生成',
  },
  {
    href: '/explore',
    title: '泛化探索页',
    description: '输入主题 → 小模型拆分方向 → 选择方向 → 大模型并行深入研究',
    status: 'draft',
    source: 'v0 生成',
  },
  {
    href: '/fanout',
    title: '扩散视图页',
    description: '用户提问 → AI 拆分成 N 个子方向 → 星状/放射状布局 → 3 种节点状态动画',
    status: 'draft',
    source: 'v0 生成',
  },
  {
    href: '/conversation/demo',
    title: '对话树视图',
    description: '三栏布局，左侧节点树 / 中央消息流 / 右侧节点元信息（骨架版，未接 React Flow）',
    status: 'draft',
    source: 'v0 生成',
  },
  {
    href: '/summary/demo',
    title: 'Fan-in 总结页',
    description: '把多条对话/分支聚合成总结，左主右辅来源溯源',
    status: 'draft',
    source: 'v0 生成',
  },
]

const STATUS_COLOR: Record<string, string> = {
  draft: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  absorbed: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  mock: 'bg-blue-500/15 text-blue-700 dark:text-blue-300',
}

const STATUS_LABEL: Record<string, string> = {
  draft: '草稿（v0 出，未吸收）',
  absorbed: '已吸收（主项目已实现）',
  mock: '示例（手写，演示工作流）',
}

export default function SandboxIndexPage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">v0-sandbox</h1>
            <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
              wilddeep · port 3002
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            v0.dev 输出的 UI 草稿在这里跑。业务代码不在这。规则见{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              wilddeep/.pipeline-layers/.instruction/V0_SANDBOX_PROTOCOL.md
            </code>
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">页面列表</h2>
          <div className="grid gap-3">
            {PAGES.map((p) => (
              <Link key={p.href} href={p.href}>
                <Card className="transition-colors hover:bg-accent/40">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-base">{p.title}</CardTitle>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLOR[p.status]}`}
                      >
                        {STATUS_LABEL[p.status]}
                      </span>
                    </div>
                    <CardDescription>{p.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground">
                    <span className="font-mono">{p.href}</span>
                    <span className="mx-2">·</span>
                    <span>{p.source}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <footer className="border-t border-border pt-6 text-xs text-muted-foreground space-y-1">
          <p>
            <span className="font-medium text-foreground">添加新草稿</span>：
            v0.dev 复制代码 → 创建{' '}
            <code className="rounded bg-muted px-1 py-0.5">app/&lt;route&gt;/page.tsx</code> →
            刷新此页加入索引。
          </p>
          <p>
            <span className="font-medium text-foreground">吸收到主项目</span>：
            告诉 AI 工程师"吸收 X 页"，他读源码后按 tree02 流程走审批。
          </p>
        </footer>
      </div>
    </main>
  )
}
