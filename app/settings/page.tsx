'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

type SettingsCategory = 'general' | 'interaction' | 'model' | 'account'

const categories = [
  { id: 'general', label: '通用' },
  { id: 'interaction', label: '交互行为' },
  { id: 'model', label: '模型与 API' },
  { id: 'account', label: '账号' },
] as const

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('interaction')
  const [autoFillSelection, setAutoFillSelection] = useState(true)
  const [multiSelectKey, setMultiSelectKey] = useState('⌘')
  const [drawerWidth, setDrawerWidth] = useState(380)
  const [fanoutNodes, setFanoutNodes] = useState('5')
  const [hoverDelay, setHoverDelay] = useState('0.5s')
  const [cardAnimation, setCardAnimation] = useState('slide')

  const handleReset = () => {
    setAutoFillSelection(true)
    setMultiSelectKey('⌘')
    setDrawerWidth(380)
    setFanoutNodes('5')
    setHoverDelay('0.5s')
    setCardAnimation('slide')
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header with back link */}
      <div className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            返回主页
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">设置</h1>
          <p className="text-sm text-muted-foreground">调整 wilddeep 的交互行为与个人偏好</p>
        </div>

        <div className="flex gap-8">
          {/* Left sidebar navigation */}
          <aside className="w-48 shrink-0">
            <nav className="space-y-1 sticky top-24">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as SettingsCategory)}
                  className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right content area */}
          <div className="flex-1 min-w-0">
            {activeCategory === 'interaction' && (
              <div className="space-y-0">
                {/* Setting 1: Auto-fill selection */}
                <div className="flex items-center justify-between py-5 px-4 hover:bg-muted/50 rounded-md transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1">选中文字自动回填</h3>
                    <p className="text-xs text-muted-foreground">划取卡片文字后，自动出现在底部输入框引用区</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Switch checked={autoFillSelection} onCheckedChange={setAutoFillSelection} />
                  </div>
                </div>
                <Separator />

                {/* Setting 2: Multi-select key */}
                <div className="flex items-center justify-between py-5 px-4 hover:bg-muted/50 rounded-md transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1">多段引用快捷键</h3>
                    <p className="text-xs text-muted-foreground">按住此键继续划取文字以累积引用</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-muted text-muted-foreground text-xs font-semibold border border-border rounded">
                      {multiSelectKey}
                    </kbd>
                    <Select value={multiSelectKey} onValueChange={setMultiSelectKey}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="⌘">⌘ (Command)</SelectItem>
                        <SelectItem value="Alt">Alt</SelectItem>
                        <SelectItem value="Shift">Shift</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />

                {/* Setting 3: Drawer width */}
                <div className="flex items-start justify-between py-5 px-4 hover:bg-muted/50 rounded-md transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1">副分支抽屉默认宽度</h3>
                    <p className="text-xs text-muted-foreground">右侧副分支抽屉的初始宽度</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 w-64 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{drawerWidth}px</span>
                    </div>
                    <Slider
                      value={[drawerWidth]}
                      onValueChange={(value) => setDrawerWidth(value[0])}
                      min={280}
                      max={720}
                      step={20}
                      className="w-full"
                    />
                    <div className="flex text-xs text-muted-foreground justify-between">
                      <span>280px</span>
                      <span>720px</span>
                    </div>
                  </div>
                </div>
                <Separator />

                {/* Setting 4: Fanout nodes */}
                <div className="flex items-center justify-between py-5 px-4 hover:bg-muted/50 rounded-md transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1">扩散节点数量</h3>
                    <p className="text-xs text-muted-foreground">广度泛化时默认生成几个子方向</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Select value={fanoutNodes} onValueChange={setFanoutNodes}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />

                {/* Setting 5: Hover preview delay */}
                <div className="flex items-center justify-between py-5 px-4 hover:bg-muted/50 rounded-md transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1">悬停预览延迟</h3>
                    <p className="text-xs text-muted-foreground">鼠标悬停节点多久后出现内容预览</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Select value={hoverDelay} onValueChange={setHoverDelay}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="now">立即</SelectItem>
                        <SelectItem value="0.3s">0.3s</SelectItem>
                        <SelectItem value="0.5s">0.5s</SelectItem>
                        <SelectItem value="1s">1s</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />

                {/* Setting 6: Card animation */}
                <div className="flex items-center justify-between py-5 px-4 hover:bg-muted/50 rounded-md transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1">轮播翻卡动画</h3>
                    <p className="text-xs text-muted-foreground">轮播视图切换时的过渡效果</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <Select value={cardAnimation} onValueChange={setCardAnimation}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slide">滑动</SelectItem>
                        <SelectItem value="fade">淡入淡出</SelectItem>
                        <SelectItem value="none">无动画</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Reset button */}
                <div className="pt-8 mt-8 border-t border-border flex justify-end">
                  <Button variant="ghost" onClick={handleReset} className="text-xs">
                    恢复默认
                  </Button>
                </div>
              </div>
            )}

            {activeCategory === 'general' && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">通用设置项目开发中...</p>
              </div>
            )}

            {activeCategory === 'model' && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">模型与 API 设置项目开发中...</p>
              </div>
            )}

            {activeCategory === 'account' && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">账号设置项目开发中...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
