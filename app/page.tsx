import Link from "next/link";
import { ArrowRight, FileText, Zap, Clock, Users } from "lucide-react";
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition">
      <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
