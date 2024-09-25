import Link from 'next/link'
import { Flame, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface NavigationProps {
  showBackButton?: boolean;
  isAuthenticated?: boolean; // Add this line
}

export default function Navigation({ showBackButton = false, isAuthenticated = false }: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#FFE5E5] bg-[#FFFFFF]/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          <Flame className="h-6 w-6 text-[#FF6F61]" />
          <span className="text-xl font-bold text-[#FF6F61]">SaaSBoiler</span>
        </Link>
        {showBackButton ? (
          <Link href="/" className="flex items-center text-sm font-medium hover:text-[#FF6F61] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        ) : (
          <nav className="flex items-center space-x-4">
            <Link href={isAuthenticated ? "/dashboard" : "/signup"}>
              <Button variant="outline" className="border-[#FF6F61] text-[#FF6F61] hover:bg-[#FFE5E5] hover:text-[#FF6F61]">
                {isAuthenticated ? "Dashboard" : "Sign Up"}
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}