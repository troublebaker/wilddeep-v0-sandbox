'use client'

import Link from 'next/link'
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <Link
        href="/"
        className="fixed top-4 left-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        返回主页
      </Link>
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto h-10 w-10 rounded-lg bg-primary/10 grid place-items-center">
            <span className="text-primary font-semibold">w</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">欢迎来到 wilddeep</h1>
          <p className="text-sm text-muted-foreground">把对话变成思维树</p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg">登录</CardTitle>
            <CardDescription>使用邮箱或 Google 账户继续</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" type="button">
              <GoogleIcon className="size-4" />
              使用 Google 登录
            </Button>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                或使用邮箱
              </span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  邮箱
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <Button className="w-full" type="button">
                发送登录链接
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              首次使用即同意我们的{' '}
              <a className="underline underline-offset-2 hover:text-foreground" href="#">
                服务条款
              </a>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          这是 v0-sandbox 草稿，<span className="font-mono">port 3002</span>。
          真品在{' '}
          <a className="underline" href="http://localhost:3000">
            主项目 :3000
          </a>
        </p>
      </div>
    </main>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M21.35 11.1H12v2.9h5.35c-.23 1.45-1.66 4.25-5.35 4.25-3.22 0-5.85-2.67-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.06.78 3.76 1.45l2.56-2.46C16.65 3.93 14.55 3 12 3 6.99 3 3 7.03 3 12s3.99 9 9 9c5.2 0 8.65-3.65 8.65-8.79 0-.59-.06-1.04-.13-1.51z"
        fill="currentColor"
      />
    </svg>
  )
}
