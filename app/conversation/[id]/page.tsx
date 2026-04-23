'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Share2,
  Download,
  User,
  Bot,
  Copy,
  GitBranch,
  RefreshCw,
  Star,
  Edit2,
  GitMerge,
  Fan,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

// Mock node tree data
const NODES = [
  {
    id: '1',
    type: 'user' as const,
    summary: 'Rust 异步运行时有哪些实现方案？',
    level: 0,
    children: ['2'],
  },
  {
    id: '2',
    type: 'assistant' as const,
    summary: 'Rust 主要有 Tokio、async-std、smol 等实现',
    level: 1,
    children: ['3'],
  },
  {
    id: '3',
    type: 'user' as const,
    summary: 'Tokio 和 async-std 的核心差异是什么',
    level: 2,
    children: ['4', '5'],
  },
  {
    id: '4',
    type: 'assistant' as const,
    summary: 'Tokio 使用工作窃取调度，async-std 遵循标准库设计',
    level: 3,
    children: ['6'],
  },
  {
    id: '5',
    type: 'assistant' as const,
    summary: '分支方向：深入对比 Tokio 的调度器实现细节',
    level: 3,
    children: [],
  },
  {
    id: '6',
    type: 'user' as const,
    summary: '工作窃取调度器如何提高多核性能？',
    level: 4,
    children: [],
  },
  {
    id: '7',
    type: 'assistant' as const,
    summary: '通过负载均衡和缓存亲和性减少上下文切换...',
    level: 4,
    children: [],
  },
]

// Mock messages for selected node
const MESSAGES = [
  {
    id: 'm1',
    nodeId: '1',
    type: 'user' as const,
    content: 'Rust 异步运行时有哪些实现方案？',
  },
  {
    id: 'm2',
    nodeId: '2',
    type: 'assistant' as const,
    content:
      'Rust 生态中主要有以下几个异步运行时实现：\n\n1. **Tokio**：最流行、最成熟的异步运行时，使用工作窃取调度器\n2. **async-std**：遵循 Rust 标准库的设计哲学\n3. **smol**：轻量级的异步运行时\n4. **embassy**：为嵌入式系统设计',
  },
  {
    id: 'm3',
    nodeId: '3',
    type: 'user' as const,
    content: 'Tokio 和 async-std 的核心差异是什么？',
  },
  {
    id: 'm4',
    nodeId: '4',
    type: 'assistant' as const,
    content:
      'Tokio 和 async-std 有以下关键差异：\n\n**Tokio:**\n- 使用工作窃取调度器实现多线程任务分配\n- 针对高并发场景优化\n- 提供了丰富的生态工具库\n\n**async-std:**\n- 设计更接近 Rust 标准库风格\n- API 更熟悉，学习成本低\n- 性能略低于 Tokio，但足够大多数场景使用',
  },
]

export default function ConversationPage({
  params,
}: {
  params: { id: string }
}) {
  const [selectedNodeId, setSelectedNodeId] = useState('4')

  // Build indented tree structure
  const renderNodeTree = (nodeId: string, indent: number) => {
    const node = NODES.find((n) => n.id === nodeId)
    if (!node) return null

    const isSelected = selectedNodeId === nodeId
    const IconComponent = node.type === 'user' ? User : Bot

    return (
      <div key={node.id}>
        <button
          onClick={() => setSelectedNodeId(nodeId)}
          className={`w-full flex items-start gap-2 px-3 py-2 rounded-md text-left text-sm transition-colors whitespace-normal text-balance ${
            isSelected
              ? 'bg-accent text-accent-foreground'
              : 'text-foreground hover:bg-muted'
          }`}
          style={{ paddingLeft: `${indent * 16 + 12}px` }}
        >
          <IconComponent className="size-3.5 shrink-0 mt-0.5" />
          <span className="line-clamp-2 text-xs">{node.summary}</span>
        </button>
        {node.children &&
          node.children.map((childId) => renderNodeTree(childId, indent + 1))}
      </div>
    )
  }

  const selectedNode = NODES.find((n) => n.id === selectedNodeId)
  const relatedMessages = MESSAGES.filter((m) => {
    // Show messages from selected node and its parent chain
    return m.nodeId === selectedNodeId
  })

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Top Sticky Bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-3 gap-4">
          {/* Left: Back button */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>返回 dashboard</span>
          </Link>

          {/* Center: Title */}
          <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
            <h1 className="text-base font-semibold truncate text-balance">
              {selectedNode?.summary || '对话'}
            </h1>
            <button className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
              <Edit2 className="size-4" />
            </button>
          </div>

          {/* Right: Share & Export dropdowns */}
          <div className="flex items-center gap-2 shrink-0">
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
          </div>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column: Node Tree */}
        <div className="w-72 border-r border-border bg-muted/30 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-foreground mb-4">
              节点 ({NODES.length})
            </h2>
            <div className="space-y-0">
              {renderNodeTree('1', 0)}
            </div>
          </div>
        </div>

        {/* Middle Column: Conversation */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {relatedMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-2xl lg:max-w-3xl rounded-lg p-3 text-sm leading-relaxed ${
                    message.type === 'user'
                      ? 'bg-primary/10 text-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="复制"
                      >
                        <Copy className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="从这句分支"
                      >
                        <GitBranch className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="重新生成"
                      >
                        <RefreshCw className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="标记重要"
                      >
                        <Star className="size-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="sticky bottom-0 border-t border-border bg-background p-4">
            <div className="flex gap-2">
              <textarea
                placeholder="继续对话..."
                className="flex-1 resize-none rounded-lg border border-input bg-background p-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                rows={3}
              />
              <Button className="self-end">
                发送
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Node Info */}
        <div className="w-80 border-l border-border bg-muted/30 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                节点信息
              </h3>
              <div className="bg-background rounded-lg p-3 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">模型</span>
                  <span className="font-medium text-foreground">
                    claude-3-5-haiku
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token</span>
                  <span className="font-medium text-foreground">
                    1247 in / 892 out
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">创建时间</span>
                  <span className="font-medium text-foreground">
                    2026-04-21 14:32
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">子分支</span>
                  <span className="font-medium text-foreground">2 个</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <Link href={`/conversation/${params.id}/branch/branch-1`}>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  <GitBranch className="size-3.5" />
                  进入分支视图
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Fan className="size-3.5" />
                创建总结
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
                删除节点
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
