'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

interface CreatePRDData {
  title: string
  projectDescription: string
  techStack: string[]
  pages: Array<{
    name: string
    functionality: string
  }>
}

export async function createPRD(data: CreatePRDData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  try {
    // Get the user from our database using Clerk userId
    const user = await db.user.findUniqueOrThrow({
      where: {
        clerkUserId: userId,
      },
    })

    // Generate PRD content using Anthropic
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/prd/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to generate PRD content')
    }

    const generatedContent = await response.text()

    // Create the PRD
    const prd = await db.pRD.create({
      data: {
        title: data.title,
        projectDescription: data.projectDescription,
        techStack: data.techStack,
        authorId: user.id,
        // Create sections for each page
        sections: {
          create: data.pages.map((page, index) => ({
            title: page.name,
            content: page.functionality,
            order: index,
          })),
        },
        // Create initial document content with AI-generated content
        currentContent: {
          create: {
            markdownContent: generatedContent,
            htmlContent: '', // Will be generated later if needed
          },
        },
      },
      include: {
        sections: true,
        currentContent: true,
      },
    })

    revalidatePath('/dashboard')
    return { success: true, prdId: prd.id }
  } catch (error) {
    console.error('Failed to create PRD:', error)
    return { success: false, error: 'Failed to create PRD' }
  }
}
