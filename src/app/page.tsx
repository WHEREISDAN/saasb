'use client';
import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/firebase/config';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Flame,
  ServerIcon, 
  FlameIcon, 
  CreditCardIcon, 
  LockIcon, 
  SmartphoneIcon, 
  PaintbrushIcon 
} from 'lucide-react'

export default function ModernLandingPage() {
  const { user, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(user !== null);
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#333333] flex flex-col items-center">
      <Navigation isAuthenticated={isAuthenticated ?? false} />
      {/* Main content wrapper */}
      <main className="flex-grow w-full">
        {/* Bento Box Layout */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hero Section */}
            <Card className="md:col-span-2 bg-[#FFE5E5] border-none">
              <CardContent className="flex flex-col items-center text-center space-y-8 p-8">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  NextJS, Firebase, Stripe
                  <span className="text-[#FF6F61]"> SaaS Boilerplate</span>
                </h1>
                <p className="max-w-[700px] text-lg text-[#333333]/80 sm:text-xl">
                  Jumpstart your SaaS project with our powerful, feature-rich boilerplate. Build faster, launch sooner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#FF6F61] text-white hover:bg-[#FFB3B0]">Get Started</Button>
                  <Button variant="outline" className="border-[#FF6F61] text-[#FF6F61] hover:bg-[#FFE5E5]">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Section */}
            <Card className="bg-[#FFE5E5] border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-[#333333]">Stay Updated</CardTitle>
                <CardDescription className="text-center text-[#333333]/80">
                  Subscribe to our newsletter for the latest updates and features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-white border-[#FFB3B0] focus:border-[#FF6F61] focus:ring-[#FF6F61]"
                  />
                  <Button type="submit" className="bg-[#FF6F61] text-white hover:bg-[#FFB3B0]">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Features Section */}
            {[
              { Icon: ServerIcon, title: 'NextJS Integration', description: 'Leverage the power of NextJS for server-side rendering and optimal performance.' },
              { Icon: FlameIcon, title: 'Firebase Backend', description: 'Utilize Firebase for authentication, database, and hosting capabilities.' },
              { Icon: CreditCardIcon, title: 'Stripe Integration', description: 'Easily implement payment processing and subscription management with Stripe.' },
              { Icon: LockIcon, title: 'Authentication Ready', description: 'Pre-built authentication flows for quick and secure user management.' },
              { Icon: SmartphoneIcon, title: 'Responsive Design', description: 'Mobile-first approach ensures your app looks great on all devices.' },
              { Icon: PaintbrushIcon, title: 'Customizable Theme', description: 'This isnt true, but I wanted to even out the number of features 😂' },
            ].map((feature, index) => (
              <Card key={index} className="bg-[#FFE5E5] border-none hover:shadow-md transition-shadow">
                <CardHeader>
                  <feature.Icon className="h-10 w-10 text-[#FF6F61] mb-2" />
                  <CardTitle className="text-[#FF6F61]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#333333]">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}

            {/* CTA Section */}
            <Card className="md:col-span-3 bg-[#FFB3B0] border-none">
              <CardContent className="flex flex-col items-center text-center space-y-8 p-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#333333]">
                  Ready to Start Building?
                </h2>
                <p className="max-w-[600px] text-lg text-[#333333]/80 sm:text-xl">
                  Get started with our SaaS boilerplate today and launch your project in record time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#FF6F61] text-white hover:bg-[#FFB3B0]">Get Started Now</Button>
                  <Button variant="outline" className="bg-white border-[#FF6F61] text-[#FF6F61] hover:bg-[#FFE5E5]">
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#FFE5E5] w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between py-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Flame className="h-6 w-6 text-[#FF6F61]" />
            <span className="text-sm font-medium">© 2024 SaaSBoiler. All rights reserved.</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium hover:text-[#FF6F61] transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#FF6F61] transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-[#FF6F61] transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}