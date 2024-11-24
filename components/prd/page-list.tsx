'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Trash2 } from 'lucide-react'

interface Page {
  id: string
  name: string
  functionality: string
}

interface PageListProps {
  onChange?: (pages: Array<{ name: string; functionality: string }>) => void
}

export function PageList({ onChange }: PageListProps) {
  const [pages, setPages] = useState<Page[]>([])

  const addPage = () => {
    const newPages = [
      ...pages,
      {
        id: crypto.randomUUID(),
        name: '',
        functionality: ''
      }
    ]
    setPages(newPages)
    onChange?.(newPages.map(({ name, functionality }) => ({ name, functionality })))
  }

  const removePage = (id: string) => {
    const newPages = pages.filter(page => page.id !== id)
    setPages(newPages)
    onChange?.(newPages.map(({ name, functionality }) => ({ name, functionality })))
  }

  const updatePage = (id: string, field: keyof Page, value: string) => {
    const newPages = pages.map(page => 
      page.id === id ? { ...page, [field]: value } : page
    )
    setPages(newPages)
    onChange?.(newPages.map(({ name, functionality }) => ({ name, functionality })))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          Pages & Functionality
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={addPage}
        >
          <Plus className="w-4 h-4" />
          Add Page
        </Button>
      </div>
      
      <div className="space-y-4">
        {pages.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center p-4 border border-dashed rounded-lg">
            Add pages to your PRD by clicking the "Add Page" button above
          </div>
        ) : (
          pages.map(page => (
            <div key={page.id} className="space-y-4 border rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <Input
                    placeholder="Page Name (e.g., Dashboard, Settings)"
                    value={page.name}
                    onChange={(e) => updatePage(page.id, 'name', e.target.value)}
                    className="w-full"
                  />
                  <Textarea
                    placeholder="Describe the functionality and features of this page"
                    value={page.functionality}
                    onChange={(e) => updatePage(page.id, 'functionality', e.target.value)}
                    rows={3}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removePage(page.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
