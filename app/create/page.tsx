'use client'

import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageList } from '@/components/prd/page-list'
import { createPRD } from '@/lib/actions/prd'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'

export default function CreatePRDPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pages, setPages] = useState<Array<{ name: string; functionality: string }>>([])
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setProgress(0)

    try {
      const formData = new FormData(e.currentTarget)
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const techStack = (formData.get('tech-stack') as string).split(',').map(t => t.trim())

      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return p + 1
        })
      }, 500)

      const result = await createPRD({
        title,
        projectDescription: description,
        techStack,
        pages,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        router.push(`/dashboard`)
      } else {
        // TODO: Show error message
        console.error(result.error)
      }
    } catch (error) {
      console.error('Failed to create PRD:', error)
      setProgress(0)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Create New PRD</CardTitle>
          <CardDescription>
            Fill in the basic details of your project to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="title">
                Project Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Enter your project title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="description">
                Project Description
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project in detail"
                required
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="tech-stack">
                Technology Stack
              </label>
              <Input
                id="tech-stack"
                name="tech-stack"
                placeholder="e.g., React, Node.js, PostgreSQL"
                required
              />
            </div>

            <PageList onChange={setPages} />
            
            <div className="space-y-4">
              {isSubmitting && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    {progress < 100
                      ? 'Generating your PRD with AI...'
                      : 'Almost done! Saving your PRD...'}
                  </p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || pages.length === 0}
              >
                {isSubmitting ? 'Creating PRD...' : 'Generate PRD'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
