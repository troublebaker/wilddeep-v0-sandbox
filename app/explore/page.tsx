'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Loader2, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

type Step = 'input' | 'splitting' | 'results'

const EXAMPLE_TOPICS = ['Rust 异步生态', '蛋白质折叠 AI', '古典音乐的数学结构']

const MOCK_DIRECTIONS = [
  {
    id: '1',
    title: '历史背景',
    description: '关键时间线、起源、奠基性论文',
    model: 'perplexity-online',
  },
  {
    id: '2',
    title: '技术原理',
    description: '核心机制、数学 / 物理基础',
    model: 'claude-opus',
  },
  {
    id: '3',
    title: '现状与应用',
    description: '当前最强方案、产业落地',
    model: 'perplexity-online',
  },
  {
    id: '4',
    title: '主要争议',
    description: '学术 / 工程 / 伦理上的分歧',
    model: 'claude-opus',
  },
  {
    id: '5',
    title: '未来趋势',
    description: '接下来 3-5 年的方向',
    model: 'gpt-5-mini',
  },
]

export default function ExplorePage() {
  const [step, setStep] = useState<Step>('input')
  const [topic, setTopic] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const handleSplit = async () => {
    if (!topic.trim()) return
    setStep('splitting')
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSelected(new Set())
    setStep('results')
  }

  const toggleDirection = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleReset = () => {
    setStep('input')
    setTopic('')
    setSelected(new Set())
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Back link */}
      <Link
        href="/"
        className="fixed top-4 left-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <ArrowLeft className="size-3.5" />
        返回主页
      </Link>

      <div className="mx-auto max-w-3xl px-6 py-16 space-y-8">
        {/* Step 1: Input */}
        {step === 'input' && (
          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-balance">想研究什么？</h1>
              <p className="text-sm text-muted-foreground">
                输入一个主题，让小模型把它拆成多个方向，再并行交给大模型深入研究
              </p>
            </div>

            <Card className="border-border/60 shadow-sm">
              <CardContent className="pt-6 space-y-5">
                <Textarea
                  placeholder="GPU 在深度学习中的演化"
                  className="min-h-32 resize-none text-base leading-relaxed"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />

                {/* Example chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">示例主题</span>
                  {EXAMPLE_TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSplit}
                  disabled={!topic.trim()}
                >
                  <Sparkles className="size-4" />
                  拆分这个主题
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Splitting */}
        {step === 'splitting' && (
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="size-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">小模型正在拆分（gpt-5-nano）...</p>
            </div>

            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="border-border/60">
                  <CardContent className="pt-5 pb-5 space-y-3">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 'results' && (
          <div className="space-y-6 pb-24">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">
                小模型拆出了 {MOCK_DIRECTIONS.length} 个方向，选你感兴趣的
              </h2>
              <p className="text-sm text-muted-foreground">主题：{topic}</p>
            </div>

            <div className="space-y-3">
              {MOCK_DIRECTIONS.map((dir) => {
                const isChecked = selected.has(dir.id)
                return (
                  <Card
                    key={dir.id}
                    onClick={() => toggleDirection(dir.id)}
                    className={`border cursor-pointer transition-all duration-150 ${
                      isChecked
                        ? 'border-primary/60 bg-primary/5'
                        : 'border-border/60 hover:border-border'
                    }`}
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleDirection(dir.id)}
                          className="mt-0.5 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <h3 className="text-sm font-semibold leading-snug">{dir.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {dir.description}
                          </p>
                          <Badge
                            variant="secondary"
                            className="text-[10px] font-mono px-2 py-0"
                          >
                            {dir.model}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
            >
              重新输入主题
            </button>
          </div>
        )}
      </div>

      {/* Sticky bottom bar — results only */}
      {step === 'results' && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              已选{' '}
              <span className="font-semibold text-foreground">{selected.size}</span>
              {' / '}
              {MOCK_DIRECTIONS.length}
            </span>
            <Button disabled={selected.size === 0}>
              用大模型深入研究（{selected.size} 个并行）
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}
