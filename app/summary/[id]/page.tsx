'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Share2,
  Download,
  Copy,
  ExternalLink,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

// Mock source data
const SOURCES = [
  {
    id: '1',
    summary: '工作窃取调度器的原理是通过任务队列在空闲 worker 之间转移任务...',
    conversationTitle: 'Rust 异步运行时选型',
    link: '/conversation/conv-1',
  },
  {
    id: '2',
    summary: 'Tokio 使用的是多线程任务队列架构，支持大量并发连接...',
    conversationTitle: 'Tokio 深度探讨',
    link: '/conversation/conv-2',
  },
  {
    id: '3',
    summary: '性能测试表明工作窃取比传统的全局队列快 3-5 倍...',
    conversationTitle: 'Rust 性能优化',
    link: '/conversation/conv-3',
  },
  {
    id: '4',
    summary: 'async-std 采用更简单的设计，易于理解但性能略低...',
    conversationTitle: 'async-std 分析',
    link: '/conversation/conv-4',
  },
  {
    id: '5',
    summary: 'NUMA 架构下的任务分配需要考虑内存局部性...',
    conversationTitle: 'NUMA 与调度器',
    link: '/conversation/conv-5',
  },
  {
    id: '6',
    summary: '通过减少上下文切换，CPU 缓存命中率可以提升 40-60%...',
    conversationTitle: '缓存优化策略',
    link: '/conversation/conv-6',
  },
  {
    id: '7',
    summary: '实时系统中对延迟的要求更高，需要保证最坏情况下的响应时间...',
    conversationTitle: '实时系统考量',
    link: '/conversation/conv-7',
  },
]

// Mock markdown content
const MARKDOWN_CONTENT = `## 工作窃取调度器的设计原理

工作窃取（Work Stealing）调度器是现代异步运行时的核心组件，Tokio 正是通过这一机制实现高效的任务分配。其基本思想是在多个 worker 线程之间动态平衡工作负载。

### 核心机制

当一个 worker 线程完成自己队列中的所有任务后，它可以从其他 worker 的队列尾部"窃取"任务，这样可以确保系统中的所有线程都处于高效工作状态，而不会出现某些线程空闲而其他线程过载的情况。

### 性能优势

- **负载均衡**：自动平衡各 worker 的任务负载
- **缓存亲和性**：减少上下文切换，提高 CPU 缓存命中率
- **可扩展性**：随着核心数增加性能线性增长

### 实现细节

Tokio 的工作窃取实现采用了 LIFO（后进先出）策略，这意味着 worker 优先执行自己队列中最新的任务，从而最大化缓存局部性。当进行窃取时，则从队列的另一端取任务，这样设计可以最小化并发竞争。

### 与其他运行时的对比

相比之下，async-std 采用了更简单的全局任务队列模式，这样虽然易于实现和理解，但在高并发场景下会产生更多的锁竞争和缓存失效。`

export default function SummaryPage({
  params,
}: {
  params: { id: string }
}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(100)
  const [highlightedSourceId, setHighlightedSourceId] = useState<string | null>(
    null
  )

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Status bar (when generating) */}
      {isGenerating && (
        <div className="border-b border-border bg-muted/50 px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-foreground">
                  正在聚合 7 条对话，已完成 {progress} / 7...
                </span>
              </div>
              <Progress value={(progress / 7) * 100} className="h-1.5" />
            </div>
          </div>
        </div>
      )}

      {/* Top Sticky Bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-3 gap-4">
          {/* Left: Back button */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>返回</span>
          </Link>

          {/* Center: Title */}
          <h1 className="flex-1 text-center text-base font-semibold truncate text-balance">
            总结：7 条对话
          </h1>

          {/* Right: Copy / Export / Share */}
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="icon">
              <Copy className="size-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>导出</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>导出为 Markdown</DropdownMenuItem>
                <DropdownMenuItem>导出为 PDF</DropdownMenuItem>
                <DropdownMenuItem>导出为 JSON</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share2 className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>分享</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>复制链接</DropdownMenuItem>
                <DropdownMenuItem>分享到...</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Summary Content */}
        <div className="flex-1 max-w-4xl overflow-y-auto px-6 py-6">
          {/* Summary Title */}
          <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">
            Rust 异步运行时选型决策综述
          </h1>

          {/* Meta Info */}
          <p className="text-xs text-muted-foreground mb-6">
            基于 7 段对话 / 12 个节点 · 由 claude-sonnet 总结 · 2 分钟前
          </p>

          {/* Markdown Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground space-y-4 mb-8">
            {MARKDOWN_CONTENT.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2
                    key={idx}
                    className="text-lg font-semibold text-foreground mt-6 mb-3"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                )
              }
              if (paragraph.startsWith('###')) {
                return (
                  <h3
                    key={idx}
                    className="text-base font-semibold text-foreground mt-4 mb-2"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                )
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1">
                    {paragraph.split('\n').map((item, i) => (
                      <li key={i} className="text-sm text-foreground">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                )
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote
                    key={idx}
                    className="border-l-2 border-primary/50 pl-4 py-1 italic text-sm text-muted-foreground"
                  >
                    {paragraph.replace('> ', '')}
                  </blockquote>
                )
              }
              return (
                <p key={idx} className="text-sm leading-relaxed text-foreground">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Continue Asking Section */}
          <div className="border-t border-border pt-6 mt-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              继续追问
            </h3>
            <div className="space-y-3">
              <Textarea
                placeholder="基于此总结，你还有什么疑问？"
                className="resize-none"
                rows={3}
              />
              <Button className="w-full">
                <MessageSquare className="size-4" />
                基于此总结追问
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Sources */}
        <div className="w-80 border-l border-border bg-muted/30 overflow-y-auto">
          <div className="p-4 sticky top-0">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              来源 ({SOURCES.length})
            </h3>

            <div className="space-y-2">
              {SOURCES.map((source) => (
                <div
                  key={source.id}
                  onMouseEnter={() => setHighlightedSourceId(source.id)}
                  onMouseLeave={() => setHighlightedSourceId(null)}
                  className={`p-3 rounded-lg text-xs cursor-pointer transition-colors ${
                    highlightedSourceId === source.id
                      ? 'bg-yellow-500/15 border border-yellow-500/30'
                      : 'bg-background border border-border hover:border-border/80 hover:bg-muted/50'
                  }`}
                >
                  <p className="text-foreground line-clamp-2 mb-1.5">
                    {source.summary}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground truncate text-xs">
                      {source.conversationTitle}
                    </span>
                    <Link
                      href={source.link}
                      className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="size-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
