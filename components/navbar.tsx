import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { FileText } from "lucide-react";

export function Navbar() {
  return (
    <div className="fixed top-0 w-full h-16 px-4 border-b shadow-sm bg-white/80 backdrop-blur-md flex items-center z-50">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            <h1 className="font-semibold text-xl">PRD Designer</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Documentation
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm text-gray-600 hover:text-gray-900 transition hidden md:inline"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Start Free
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Dashboard
            </Link>
            <Link
              href="/new"
              className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition hidden md:inline"
            >
              New PRD
            </Link>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
