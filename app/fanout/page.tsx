'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  ArrowDown, 
  Search, 
  Mic, 
  ChevronDown,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type State = 'input' | 'generating' | 'carousel'
type QuestionType = 'fanout' | 'deep' | 'search'
type NodeStatus = 'generating' | 'completed' | 'preview'

interface SubDirection {
  id: number
  title: string
  summary: string
  preview: string
  status: NodeStatus
  angle: number
}

const RADIUS = 260

const MOCK_DIRECTIONS: Omit<SubDirection, 'angle'>[] = [
  {
    id: 1,
    title: '光刻技术',
    summary: 'EUV 光刻机的物理极限与 High-NA 突破',
    preview: '光刻工艺是芯片制造的关键瓶颈。EUV（极紫外）光刻代表了当今最先进的工艺，但其成本极高。High-NA 技术承诺进一步提升分辨率，但面临收率和良率的挑战。',
    status: 'completed',
  },
  {
    id: 2,
    title: '先进封装',
    summary: 'Chiplet 与 CoWoS 成为摩尔定律替代品',
    preview: '当芯片工艺逼近物理极限时，先进封装成为继续提升性能的主要手段。Chiplet 将不同功能的小芯片集成在一起，减少成本。CoWoS（芯片上芯片）技术由台积电主导。',
    status: 'generating',
  },
  {
    id: 3,
    title: '材料瓶颈',
    summary: '氮化镓与碳化硅在功率芯片的应用',
    preview: '新型半导体材料如氮化镓（GaN）和碳化硅（SiC）具有更高的导热性和耐压性，广泛用于功率电子。这些材料未来可能取代硅成为主流。',
    status: 'completed',
  },
  {
    id: 4,
    title: '产业链',
    summary: 'ASML 垄断、台积电依赖与地缘风险',
    preview: '光刻机供应被 ASML 垄断，制造工艺被台积电垄断，这种集中度带来了巨大地缘政治风险。任何一方的限制都可能影响全球芯片产业。',
    status: 'generating',
  },
  {
    id: 5,
    title: 'AI 加速',
    summary: '英伟达 H100 架构与 HBM 内存瓶颈',
    preview: '高端芯片设计越来越多地针对 AI 工作负载优化。英伟达 H100 的多核心架构和高内存带宽成为 AI 加速的关键。HBM（高带宽内存）价格昂贵且供应紧张。',
    status: 'preview',
  },
]

export default function FanoutPage() {
  const [state, setState] = useState<State>('input')
  const [input, setInput] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('fanout')
  const [isRecording, setIsRecording] = useState(false)

  const directions: SubDirection[] = MOCK_DIRECTIONS.map((dir, idx) => ({
    ...dir,
    angle: (idx * 72 * Math.PI) / 180,
  }))

  const handleGenerate = () => {
    if (input.trim()) {
      setState('generating')
    }
  }

  const svgWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
  const svgHeight = typeof window !== 'undefined' ? window.innerHeight : 768
  const centerX = svgWidth / 2
  const centerY = svgHeight / 2

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Back Link */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        返回主页
      </Link>

      {/* View Switch Bar (visible in carousel state) */}
      {state === 'carousel' && (
        <div className="fixed top-0 left-0 right-0 h-12 bg-background/95 backdrop-blur border-b border-border z-40 flex items-center justify-center gap-8 px-4">
          <Link
            href="/carousel/demo"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            树视图
          </Link>
          <div className="w-px h-4 bg-border" />
          <span className="text-sm text-foreground font-medium">轮播视图</span>
        </div>
      )}

      {/* State 0: Input Phase */}
      {state === 'input' && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-2xl space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-light text-muted-foreground">
                想探索什么？
              </h1>
            </div>

            <Card className="rounded-2xl shadow-sm border border-border p-0 overflow-hidden">
              <div className="p-6 space-y-4">
                <Textarea
                  placeholder="随便问点什么，比如：芯片制造的核心瓶颈"
                  className="min-h-20 border-0 focus-visible:ring-0 px-0 py-0 resize-none text-base bg-transparent"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  {/* Mic Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic
                      className={`size-4 ${
                        isRecording ? 'text-destructive' : 'text-muted-foreground'
                      }`}
                    />
                  </Button>

                  <div className="flex items-center gap-2">
                    {/* Type Dropdown */}
                    <DropdownMenu>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-xs"
                      >
                        {questionType === 'fanout' && (
                          <>
                            <Sparkles className="size-3.5" />
                            广度泛化
                          </>
                        )}
                        {questionType === 'deep' && (
                          <>
                            <ArrowDown className="size-3.5" />
                            深度追问
                          </>
                        )}
                        {questionType === 'search' && (
                          <>
                            <Search className="size-3.5" />
                            搜索增强
                          </>
                        )}
                        <ChevronDown className="size-3 ml-1" />
                      </Button>

                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuCheckboxItem
                          checked={questionType === 'fanout'}
                          onCheckedChange={() => setQuestionType('fanout')}
                        >
                          <Sparkles className="size-4 mr-2" />
                          <span>广度泛化</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={questionType === 'deep'}
                          onCheckedChange={() => setQuestionType('deep')}
                        >
                          <ArrowDown className="size-4 mr-2" />
                          <span>深度追问</span>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={questionType === 'search'}
                          onCheckedChange={() => setQuestionType('search')}
                        >
                          <Search className="size-4 mr-2" />
                          <span>搜索增强</span>
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerate}
                      className="gap-1.5 text-xs"
                      disabled={!input.trim()}
                    >
                      <Sparkles className="size-3.5" />
                      一键生成
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* State 1: Generating + Diffusion Animation */}
      {state === 'generating' && (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
          {/* SVG Connector Lines */}
          <svg
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            {directions.map((dir) => {
              const x = centerX + RADIUS * Math.cos(dir.angle)
              const y = centerY + RADIUS * Math.sin(dir.angle)
              return (
                <line
                  key={`line-${dir.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={1}
                  opacity={0.2}
                  className="text-border"
                />
              )
            })}
          </svg>

          {/* Center Compact Card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Card className="rounded-[12px] border border-border bg-card p-2.5 shadow-sm max-w-xs">
              <p className="text-xs text-muted-foreground line-clamp-1">
                {input}
              </p>
            </Card>
          </div>

          {/* Sub-direction Nodes */}
          {directions.map((dir, idx) => {
            const x = centerX + RADIUS * Math.cos(dir.angle)
            const y = centerY + RADIUS * Math.sin(dir.angle)
            const delay = idx * 200

            return (
              <div
                key={dir.id}
                className="absolute z-20 animate-in fade-in zoom-in-75"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${delay}ms`,
                  animationDuration: '600ms',
                  animationFillMode: 'both',
                }}
              >
                {dir.status === 'generating' ? (
                  // Skeleton State
                  <Card className="w-44 rounded-xl border border-border bg-card p-3 space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                  </Card>
                ) : dir.status === 'preview' ? (
                  // Preview State with Popover
                  <Popover open defaultOpen={false}>
                    <PopoverTrigger asChild>
                      <Card className="w-44 rounded-xl border border-border bg-card p-3 cursor-pointer hover:scale-105 hover:shadow-lg transition-all group">
                        <h3 className="font-medium text-sm text-foreground">
                          {dir.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {dir.summary}
                        </p>
                      </Card>
                    </PopoverTrigger>
                    <PopoverContent
                      side="top"
                      align="center"
                      className="w-xs max-h-52 overflow-y-auto rounded-xl"
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-foreground">
                          {dir.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {dir.preview}
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : (
                  // Completed State
                  <Card className="w-44 rounded-xl border border-border bg-card p-3 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-sm text-foreground">
                      {dir.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {dir.summary}
                    </p>
                  </Card>
                )}
              </div>
            )
          })}

          {/* Bottom Action Buttons (Sticky) */}
          <div className="fixed bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-4">
            <Link href="/carousel/demo">
              <Button variant="default" className="gap-1.5">
                看完整内容
                <ArrowLeft className="size-3.5 rotate-180" />
              </Button>
            </Link>
            <Link href="/conversation/demo">
              <Button variant="ghost">树视图</Button>
            </Link>
          </div>
        </div>
      )}

      {/* State 2: Carousel */}
      {state === 'carousel' && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              轮播视图功能演示
            </p>
            <Button
              variant="outline"
              onClick={() => setState('input')}
            >
              返回输入
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}
