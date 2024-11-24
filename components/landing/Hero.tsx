import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Create Professional PRDs with AI
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Transform your project ideas into comprehensive requirement documents in minutes. 
            Powered by AI, designed for modern development teams.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/sign-up">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">
                Learn more
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
