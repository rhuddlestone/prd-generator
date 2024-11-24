# PRD Designer

PRD Designer is a Micro SaaS application that helps developers and product managers create comprehensive Project Requirement Documents (PRDs) efficiently using AI. Generate detailed PRDs by simply providing project descriptions, technology stacks, and page requirements.

## Features

- AI-powered PRD generation
- Real-time document editing
- Document storage and management
- Markdown format support
- User authentication and document ownership

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **UI**: Shadcn components & Tailwind CSS
- **AI**: Claude AI via Anthropic

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Anthropic API key
- Clerk account for authentication

## Getting Started

1. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd prd2
npm install
```

2. Set up your environment variables:
```bash
cp .env.example .env.local
```
Fill in your environment variables in `.env.local`:
- `DATABASE_URL`: Your PostgreSQL connection string
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key

3. Run database migrations:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run linting

## Deployment

The application can be deployed on [Vercel](https://vercel.com) with minimal configuration. Simply connect your repository and:

1. Set up the required environment variables
2. Configure the PostgreSQL database
3. Deploy!

## License

[MIT](LICENSE)
