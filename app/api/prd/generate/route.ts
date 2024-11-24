import { generateText } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

export const runtime = 'edge'

interface Page {
  name: string;
  functionality: string;
}

export async function POST(req: Request) {
  const { title, projectDescription, techStack, pages }: {
    title: string;
    projectDescription: string;
    techStack: string[];
    pages: Page[];
  } = await req.json()
  
  console.log('Generating PRD for:', { title, projectDescription, techStack, pages })

  const prompt = `You are an experienced product manager tasked with creating a comprehensive Project Requirement Document (PRD) for a software project. This document will be used by developers, so it needs to be detailed, clear, and well-structured. You have been provided with the following information:

<project_name>
${title}
</project_name>

<project_description>
${projectDescription}
</project_description>

<tech_stack>
${techStack.join(', ')}
</tech_stack>

<page_list>
${pages.map(page => `${page.name}:\n${page.functionality}`).join('\n\n')}
</page_list>

Your task is to generate a PRD in Markdown format. Follow these steps to create the document:

1. Start with a title "Project Requirement Document" and a brief introduction explaining the purpose of the document.

2. Create a "Project Overview" section:
   - Use the information provided in the project description.
   - Expand on this description to include the project's goals, target audience, and key features or unique selling points.

3. In a "Technical Specifications" section:
   - List and briefly explain each technology mentioned in the tech stack.
   - Include why each technology was chosen and how it fits into the project's overall architecture.
   - Recommend and explain specific packages that should be used in the project, based on the tech stack and project requirements. Pay attention to the tech stack when suggesting packages to not duplicate functionlaity.

4. Create a "Page-by-Page Breakdown" section:
   For each page mentioned in the page list, create a subsection that includes:
   - Page name and description
   - Introduction, a 2 or 3-sentence overview of the function of the page.
   - Key functionality and features
   - Any extra packages required for functionality
   - User interactions
   - Data requirements
   - Specific design considerations
   - Project file structure (based on best practices for the tech stack)

5. Add an "Additional Features and Requirements" section to cover project-wide features or requirements not specific to individual pages, such as:
   - User authentication and authorization
   - Data storage and management
   - API integrations
   - Performance requirements
   - Security considerations
   - Accessibility standards

6. Include a "Timeline and Milestones" section with a proposed project schedule, including key deliverables and deadlines. This should be a general outline, as specific dates will be determined later in the development process.

7. Conclude the document with a brief summary and next steps for the development team.

# Important Implementation Notes
## 0. Adding logs
   - Always add server side logs to your code so we can debug any potential issues

## 1. Project setup
   - All new components should go in /components at the root (not in the app folder) and be named like example-component.tsx unless otherwise specified
   - All new pages go in /app
   - Use the Next.js 14 app router
   - All data fetching should be done in a server component and pass the data down as props
   - Client components (useState, hooks, etc) require that 'use client' is set at the top of the file

## 2. Environment Variables:
   - Store all sensitive information (API keys, credentials) in environment variables.
   - Use a .env.local file for local development and ensure it's listed in .gitignore.
   - For production, set environment variables in the deployment platform (e.g., Vercel).
   - Access environment variables only in server-side code or API routes.

## 3. Type Safety:
   - Use TypeScript interfaces for all data structures, especially API responses.
   - Avoid using 'any' type; instead, define proper types for all variables and function parameters.

## 4. Data Fetching in Components:
   - Use React hooks (e.g., useEffect) for data fetching in client-side components.
   - Implement loading states and error handling for all data fetching operations.

## 5. Component Structure:
   - Separate concerns between client and server components.
   - Use server components for initial data fetching and pass data as props to client components.
   - All components should be stored in the components folder and be under a folder name after the route of the page they will be displayed on

Begin your response with the opening Markdown tags and start writing the PRD immediately, without any preamble. Only output the PRD.`

  const response: { text: string } = await (generateText as any)({
    model: anthropic('claude-3-haiku-20240307'),
    prompt: prompt,
    messages: [
      {
        role: 'system',
        content: 'You are an experienced product manager creating a comprehensive Project Requirement Document.'
      },
      { 
        role: 'user',
        content: [
          { 
            type: 'text', 
            text: prompt
          }
        ]
      }
    ],
   
  })

  return new Response(response.text, { status: 200 })
}
