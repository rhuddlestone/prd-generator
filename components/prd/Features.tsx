import { Bot, FileText, Users, Zap } from 'lucide-react'

const features = [
  {
    name: 'AI-Powered Generation',
    description: 'Leverage advanced AI to transform your ideas into structured PRDs instantly.',
    icon: Bot,
  },
  {
    name: 'Real-time Collaboration',
    description: 'Work together with your team in real-time with live editing and comments.',
    icon: Users,
  },
  {
    name: 'Markdown Support',
    description: 'Write and format your PRDs using familiar Markdown syntax.',
    icon: FileText,
  },
  {
    name: 'Instant Export',
    description: 'Export your PRDs in multiple formats for easy sharing and presentation.',
    icon: Zap,
  },
]

export function Features() {
  return (
    <div id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to create perfect PRDs
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform combines powerful AI with intuitive tools to help you create
            comprehensive project requirement documents efficiently.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
