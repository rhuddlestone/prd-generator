import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="container mx-auto py-10 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My PRDs</h1>
        <Link href="/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New PRD
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* PRD cards will be added here */}
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">No PRDs yet</h3>
          <p className="text-muted-foreground">
            Create your first PRD by clicking the New PRD button above.
          </p>
        </div>
      </div>
    </div>
  )
}
