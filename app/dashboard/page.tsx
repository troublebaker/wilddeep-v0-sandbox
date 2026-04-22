'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Sparkles,
  GitMerge,
  Settings,
  Plus,
  Search,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const conversationTypes = {
  branching: {
    label: '分支讨论',
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  },
  fanout: {
    label: '泛化（Fan-out）',
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  },
  deepdive: {
    label: '深度探讨',
    color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  },
  summary: {
    label: '总结（Fan-in）',
    color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  },
}

const mockConversations = [
  {
    id: 1,
    type: 'branching' as const,
    title: '如何构建高效的 React 组件架构',
    description: '讨论 React 性能优化、代码分割和组件设计模式...',
    nodeCount: 12,
    model: 'claude-opus',
    relativeTime: '3 小时前',
  },
  {
    id: 2,
    type: 'fanout' as const,
    title: '机器学习在实际应用中的挑战与解决方案',
    description: '数据处理、模型训练、部署运维等多个角度的深入讨论...',
    nodeCount: 8,
    model: 'claude-haiku',
    relativeTime: '1 天前',
  },
  {
    id: 3,
    type: 'deepdive' as const,
    title: '这是一个特别长的标题来测试两行截断效果当标题过长时会自动换行并截断多余内容',
    description: '这是描述的预览内容，最多两行会被截断，用来展示对话摘要...',
    nodeCount: 24,
    model: 'claude-opus',
    relativeTime: '2 天前',
  },
  {
    id: 4,
    type: 'summary' as const,
    title: '前端性能优化最佳实践总结',
    description: '综合讨论后的最终总结，包括关键要点和推荐方案...',
    nodeCount: 5,
    model: 'claude-haiku',
    relativeTime: '1 周前',
  },
  {
    id: 5,
    type: 'branching' as const,
    title: '数据库设计中的权衡选择',
    description: 'SQL vs NoSQL、关系型 vs 文档型数据库的对比讨论...',
    nodeCount: 15,
    model: 'claude-opus',
    relativeTime: '2 周前',
  },
]

export default function DashboardPage() {
  const [hasConversations, setHasConversations] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const navigationItems = [
    { icon: MessageSquare, label: '对话', href: '#' },
    { icon: Sparkles, label: '泛化（Fan-out）', href: '#' },
    { icon: GitMerge, label: '总结（Fan-in）', href: '#' },
    { icon: Settings, label: '设置', href: '#' },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-background sticky top-0 h-screen flex flex-col">
        {/* Logo & Title */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary grid place-items-center shrink-0">
              <span className="text-sm font-semibold text-primary-foreground">w</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">wilddeep</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <item.icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-6 border-t border-border space-y-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted transition-colors">
                <Avatar className="size-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs font-medium truncate">user@example.com</p>
                </div>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem disabled>
                <span className="text-xs text-muted-foreground">user@example.com</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>账号设置</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOut className="size-4 mr-2" />
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between px-8 py-4 gap-4">
            {/* Breadcrumb */}
            <div className="text-sm font-medium text-muted-foreground">我的对话</div>

            {/* Search & Notifications */}
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="搜索对话..."
                  className="pl-9 bg-muted border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 hover:bg-muted rounded-md transition-colors">
                <Bell className="size-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {hasConversations ? (
            <div className="p-8 space-y-8">
              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight">对话</h1>
                  <p className="text-sm text-muted-foreground">
                    共 {mockConversations.length} 段，最近活跃 3 小时前
                  </p>
                </div>
                <Button className="gap-2">
                  <Plus className="size-4" />
                  新建对话
                </Button>
              </div>

              {/* Conversations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockConversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href={`/conversations/${conversation.id}`}
                    className="group rounded-lg border border-border bg-card p-4 hover:border-primary/50 hover:shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    {/* Type Badge */}
                    <div className="mb-3">
                      <Badge
                        className={`${conversationTypes[conversation.type].color} border`}
                      >
                        {conversationTypes[conversation.type].label}
                      </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {conversation.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                      {conversation.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>{conversation.nodeCount} 个分支</span>
                        <span>·</span>
                        <span>{conversation.model}</span>
                      </div>
                      <span>{conversation.relativeTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-muted p-3">
                <Sparkles className="size-12 text-muted-foreground/40" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">还没有对话</p>
                <p className="text-sm text-muted-foreground">
                  新建第一段树形对话
                </p>
              </div>
              <Button className="mt-4 gap-2">
                <Plus className="size-4" />
                新建对话
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
