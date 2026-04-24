'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  Share2,
  BookMarked,
  ChevronDown,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

// mock 数据
const CARDS = [
  {
    id: 1,
    title: 'AI 大模型的原理基础',
    type: '基础概念',
    content: `
## Transformer 架构核心

现代大语言模型的基础是 Transformer 架构，由 Vaswani 等人在 2017 年提出的论文《Attention Is All You Need》引入。这个架构的核心创新是**自注意力机制（Self-Attention）**，它让模型可以并行处理序列数据，同时捕捉长距离的依赖关系。

每个单词（Token）在模型中被转换为向量表示，然后通过多层 Transformer 块进行处理。每个块包含多头自注意力层和前馈网络层，使用残差连接和层归一化来稳定训练过程。

## Scaling Law 与能力涌现

研究表明，大模型的性能与模型大小、数据规模和计算资源呈幂律关系（Scaling Law）。当模型规模达到一定程度时，会出现**能力涌现**现象——模型突然获得之前不具备的能力，如上下文学习、思维链推理等。

这意味着持续增加参数数量和训练数据是通往通用人工智能的一条可行路径。
    `,
    branches: 2,
    model: 'GPT-4o',
    tokens: '2.4K',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: '先进封装技术 Chiplet 与 CoWoS',
    type: '硬件技术',
    content: `
## Chiplet 微粒架构设计

随着摩尔定律逼近物理极限，单芯片集成的成本和良率问题日益突出。**Chiplet 架构**采用分离式设计，将复杂系统分解为多个独立的小芯片，再通过高带宽互连（如 2.5D 或 3D 堆叠）集成为整体。

这种设计带来多个优势：首先是成本降低，可以用成熟工艺制造非关键部分；其次是良率提升，因为单个芯片面积更小；第三是设计灵活性，不同功能块可以独立迭代。AMD、Intel 和 NVIDIA 都在积极推进 Chiplet 战略。

## CoWoS 先进封装工艺

**芯片上转移（CoWoS，Chip-on-Wafer-on-Substrate）**是目前最先进的 3D 堆叠封装工艺。它将多个芯片垂直堆叠，通过微小的**硅通孔（TSV）**进行通信，实现极高的集成度和带宽。

CoWoS 工艺目前由台积电独家掌握，成本高昂但性能优异，被广泛应用于高端 GPU 和 AI 加速器。随着供能、散热等挑战的逐步解决，CoWoS 技术正成为芯片性能的关键瓶颈突破口。
    `,
    branches: 3,
    model: 'Claude 3.5 Sonnet',
    tokens: '3.1K',
    createdAt: '2024-01-18',
  },
  {
    id: 3,
    title: '量子计算的容错路线',
    type: '前沿研究',
    content: `
## 量子纠错码基础

量子计算的最大挑战是**退相干**——量子态极易受环境影响而失去相干性。为了构建实用的量子计算机，必须通过**量子纠错码**来保护量子信息。

表面码（Surface Code）是目前最有前景的方案，它在二维网格上排列物理量子比特，通过局部测量来检测和纠正错误，理论上需要约 1000-10000 个物理比特来实现一个逻辑比特。Google、IBM 和其他研究机构都在竞相演示更高的纠错能力。

## 物理实现的技术路线

当前有多种物理实现方式竞争，包括超导量子比特、离子阱、拓扑量子比特等。每种方案都有各自的优缺点：超导比特门速度快但相干时间短；离子阱相干时间长但操作复杂；拓扑量子比特理论上容错能力最强但技术难度最高。

未来数年，哪种技术能率先突破容错阈值并扩展到有用的量子比特数，将决定量子计算产业化的速度。
    `,
    branches: 1,
    model: 'GPT-4o',
    tokens: '2.8K',
    createdAt: '2024-01-20',
  },
  {
    id: 4,
    title: '生物医学影像的深度学习应用',
    type: '应用案例',
    content: `
## 医学影像诊断的 AI 赋能

深度学习在医学影像分析中取得了显著成果，特别是在**肿瘤检测、分类和分割**任务上。CNN 架构可以学习到医学影像中的细微纹理特征，识别能力往往超过放射科医生。

FDA 已批准多个 AI 医疗设备上市，用于乳腺癌筛查、肺结节检测等场景。这些模型通常在大规模标注数据集上预训练，再在特定医院数据上微调，显著提升诊断效率。

## 挑战与机遇

当前面临的主要挑战包括数据隐私（HIPAA 合规）、模型可解释性（医生需理解 AI 决策）和泛化能力（不同医院设备差异大）。同时，少样本学习、迁移学习等技术为在数据有限的场景下快速部署 AI 系统提供了新路径。
    `,
    branches: 2,
    model: 'Claude 3.5 Sonnet',
    tokens: '2.2K',
    createdAt: '2024-01-22',
  },
  {
    id: 5,
    title: '气候变化与碳中和技术',
    type: '气候科学',
    content: `
## 碳循环失衡与温室效应

工业革命以来，人类燃烧化石燃料排放的 CO₂ 使大气中二氧化碳浓度从 280 ppm 上升至今日的 420+ ppm。这些温室气体形成"毯子效应"，阻止地表热量散逸，导致全球平均气温上升约 1.1°C。

气候变化的影响已遍及全球：极端天气频率增加、海平面上升威胁沿海城市、生态系统失衡加剧物种灭绝。要控制温升在 1.5°C 以内，全球需在 2050 年前实现碳中和。

## 碳中和路径与技术方案

实现碳中和的核心是能源结构转型——从化石燃料转向可再生能源（风能、太阳能、水能）。同时需要推进**碳捕获与利用（CCUS）**技术，从大气中移除已排放的 CO₂。

绿色氢能、电动交通、建筑节能改造等也是关键组成部分。政策激励、碳税、国际协议配合技术创新，才能实现公正和快速的能源转型。
    `,
    branches: 4,
    model: 'GPT-4o',
    tokens: '2.9K',
    createdAt: '2024-01-25',
  },
]

const BRANCHES = [
  {
    id: 'b1',
    quote: '表面码（Surface Code）是目前最有前景的方案...',
    question: '表面码如何实现量子纠错？',
    reply: '表面码通过在二维网格上排列物理量子比特...（AI 回复摘要）',
  },
  {
    id: 'b2',
    quote: '超导比特门速度快但相干时间短...',
    question: '为什么超导量子比特相干时间短？',
    reply: '超导量子比特与环境交互频繁...（AI 回复摘要）',
  },
  {
    id: 'b3',
    quote: '每种方案都有各自的优缺点...',
    question: '拓扑量子比特相比其他方案有什么优势？',
    reply: '拓扑量子比特具有天然的容错能力...（AI 回复摘要）',
  },
]

export default function CarouselPage({ params }: { params: { id: string } }) {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [showBranchesSheet, setShowBranchesSheet] = useState(false)
  const [hasSelection, setHasSelection] = useState(false)

  // 模拟 3 秒后显示引用
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSelection(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const currentCard = CARDS[currentIndex]
  const prevCard = CARDS[(currentIndex - 1 + CARDS.length) % CARDS.length]
  const nextCard = CARDS[(currentIndex + 1) % CARDS.length]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CARDS.length)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 顶部 sticky 视图切换栏 */}
      <div className="sticky top-0 z-40 h-12 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75 flex items-center gap-4 px-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          返回主页
        </Link>

        <span className="text-xs text-muted-foreground">对话 / {currentCard.title}</span>

        <div className="flex-1" />

        {/* Tab 按钮 */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            树视图
          </button>
          <button className="px-3 py-1.5 text-xs text-foreground border-b-2 border-primary transition-colors">
            轮播视图
          </button>
        </div>

        <div className="w-px h-6 bg-border" />

        {/* 笔记 / 分享 */}
        <Button variant="ghost" size="icon-sm">
          <BookMarked className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Share2 className="size-4" />
        </Button>
      </div>

      {/* 主体区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
        {/* 纸牌堆叠区 */}
        <div className="relative w-full h-[500px] max-w-5xl perspective">
          {/* 左侧半卡 */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 opacity-50 scale-95 transition-all duration-300 pointer-events-none z-10"
            style={{
              transform:
                'translateY(-50%) translateX(-40px) scale(0.95)',
            }}
          >
            <div className="h-[480px] rounded-2xl bg-card shadow-lg ring-1 ring-foreground/10 p-6 overflow-hidden flex flex-col">
              <div className="space-y-1 mb-4">
                <div className="text-xs text-muted-foreground">
                  {(currentIndex - 1 + CARDS.length) % CARDS.length + 1}/{CARDS.length}
                </div>
                <div className="text-sm font-medium line-clamp-1">
                  {prevCard.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {prevCard.type}
                </div>
              </div>
              <div className="flex-1 bg-muted/30 rounded animate-pulse" />
            </div>
          </div>

          {/* 当前卡 - 完整显示 */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-30 w-full max-w-lg"
          >
            <div className="min-h-[480px] rounded-2xl bg-card shadow-2xl ring-1 ring-foreground/10 p-6 overflow-hidden flex flex-col">
              {/* 卡片头部 */}
              <div className="space-y-1 mb-6 pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground font-medium">
                    {currentIndex + 1}/{CARDS.length}
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {currentCard.type}
                  </div>
                </div>
                <h2 className="text-lg font-semibold line-clamp-2">
                  {currentCard.title}
                </h2>
              </div>

              {/* 内容区 - 可滚动 */}
              <div className="flex-1 overflow-y-auto mb-4 pr-2">
                <div className="prose prose-sm prose-invert max-w-none text-foreground text-sm leading-relaxed">
                  {currentCard.content
                    .split('\n')
                    .filter((line) => line.trim())
                    .map((line, i) => (
                      <div key={i}>
                        {line.startsWith('##') ? (
                          <h3 className="mt-3 mb-2 font-semibold text-foreground">
                            {line.replace(/^## /, '')}
                          </h3>
                        ) : line.startsWith('**') ? (
                          <p className="font-semibold text-foreground">
                            {line}
                          </p>
                        ) : (
                          <p>{line}</p>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* 卡片底部工具栏 */}
              <div className="pt-4 border-t border-border flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Copy className="size-3.5" />
                  复制
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setShowBranchesSheet(true)}
                >
                  <ChevronDown className="size-3.5" />
                  {currentCard.branches} 条分支
                </Button>
                <div className="flex-1" />
                <Button size="sm" className="gap-1.5">
                  加入总结
                </Button>
              </div>
            </div>
          </div>

          {/* 右侧半卡 */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 opacity-50 scale-95 transition-all duration-300 pointer-events-none z-10"
            style={{
              transform:
                'translateY(-50%) translateX(40px) scale(0.95)',
            }}
          >
            <div className="h-[480px] rounded-2xl bg-card shadow-lg ring-1 ring-foreground/10 p-6 overflow-hidden flex flex-col">
              <div className="space-y-1 mb-4">
                <div className="text-xs text-muted-foreground">
                  {(currentIndex + 1) % CARDS.length + 1}/{CARDS.length}
                </div>
                <div className="text-sm font-medium line-clamp-1">
                  {nextCard.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {nextCard.type}
                </div>
              </div>
              <div className="flex-1 bg-muted/30 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Dots 指示器 */}
        <div className="flex items-center gap-2 mt-8">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`size-2 rounded-full transition-colors ${
                i === currentIndex
                  ? 'bg-primary'
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* 左右切换按钮 */}
        <div className="flex items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handlePrev}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleNext}
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* 引用回填区（有时显示） */}
      {hasSelection && (
        <div className="mx-auto max-w-lg px-6 py-4 animate-in slide-in-from-bottom duration-300">
          <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">
                引用段落
              </p>
              <p className="text-sm text-foreground truncate">
                表面码（Surface Code）是目前最有前景的方案... +2 段
              </p>
            </div>
            <button
              onClick={() => setHasSelection(false)}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* 底部输入区 */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75 border-t border-border px-6 py-4">
        <div className="mx-auto max-w-lg flex gap-2">
          <Textarea
            placeholder="对引用段落继续追问（作为副分支，不影响主线）..."
            className="min-h-[32px] resize-none text-xs"
          />
          <Button size="sm">发送</Button>
        </div>
      </div>

      {/* 副分支抽屉 */}
      <Sheet open={showBranchesSheet} onOpenChange={setShowBranchesSheet}>
        <SheetContent side="right" className="w-96 p-0">
          <SheetHeader className="border-b border-border">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBranchesSheet(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
              </button>
              <SheetTitle>副分支 ({BRANCHES.length})</SheetTitle>
            </div>
          </SheetHeader>

          <div className="overflow-y-auto h-full p-4 space-y-3">
            {BRANCHES.map((branch) => (
              <div
                key={branch.id}
                className="rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <p className="text-xs text-muted-foreground mb-2">引用</p>
                <p className="text-xs text-foreground font-medium mb-2 line-clamp-1">
                  {branch.quote}
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-foreground">
                    <span className="text-muted-foreground">Q: </span>
                    {branch.question}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">A: </span>
                    {branch.reply}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="在此继续追问..."
                className="min-h-[32px] resize-none text-xs flex-1"
              />
              <Button size="sm">发</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
