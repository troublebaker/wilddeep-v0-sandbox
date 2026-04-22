'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, ArrowRight, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

type FormState = 'default' | 'filling' | 'submitting' | 'sent'

export default function SignUpPage() {
  const [formState, setFormState] = useState<FormState>('default')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    if (!email || !password) return
    setFormState('submitting')
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('sent')
  }

  const handleResend = async () => {
    setFormState('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('sent')
  }

  const handleInputChange = () => {
    if (formState === 'default') {
      setFormState('filling')
    }
  }

  const isFilling = email.length > 0 || password.length > 0

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto size-10 rounded-lg bg-primary grid place-items-center">
            <span className="text-primary-foreground font-semibold">w</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            创建你的 wilddeep 账户
          </h1>
          <p className="text-sm text-muted-foreground">
            开始把对话变成思维树
          </p>
        </div>

        {/* Card */}
        <Card className="border-border/60 shadow-sm">
          <CardContent className="pt-6 space-y-4">
            {formState === 'sent' ? (
              /* Email Sent State */
              <div className="py-8 space-y-4 text-center">
                <div className="mx-auto size-12 rounded-full bg-primary/10 grid place-items-center">
                  <MailCheck className="size-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">验证邮件已发送</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  重新发送
                </button>
              </div>
            ) : (
              /* Default / Filling / Submitting State */
              <>
                {/* Google Sign Up */}
                <Button variant="outline" className="w-full" type="button">
                  <GoogleIcon className="size-4" />
                  使用 Google 注册
                </Button>

                {/* Separator */}
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    或使用邮箱
                  </span>
                </div>

                {/* Form */}
                <div className="space-y-3">
                  {/* Email Input */}
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
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          handleInputChange()
                        }}
                        disabled={formState === 'submitting'}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-xs">
                      密码
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="至少 8 位字符"
                        className="pl-9"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          handleInputChange()
                        }}
                        disabled={formState === 'submitting'}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    className="w-full"
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFilling || formState === 'submitting'}
                  >
                    {formState === 'submitting' ? (
                      '发送中...'
                    ) : (
                      <>
                        发送验证邮件
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Terms */}
                <p className="text-center text-xs text-muted-foreground">
                  首次使用即同意{' '}
                  <a
                    className="underline underline-offset-2 hover:text-foreground"
                    href="#"
                  >
                    服务条款
                  </a>
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="space-y-4">
          <Separator />
          <p className="text-center text-sm text-muted-foreground">
            已有账户？{' '}
            <Link
              href="/login"
              className="text-foreground underline underline-offset-2 hover:text-foreground/80"
            >
              登录
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}
