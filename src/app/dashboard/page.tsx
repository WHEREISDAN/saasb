'use client';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Flame } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getFirebaseToken = async () => {
    try {
      if (user) {
        const token = await auth.currentUser?.getIdToken();
        return token;
      }
    } catch (error) {
      console.error("Error getting Firebase token:", error);
      return null;
    }
  };

  const handleUpgrade = async (priceId: string) => {
    setIsLoading(true);
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ 
        priceId: priceId,
        metadata: {
          userId: user?.uid,
          role: 'Pro User',
        },
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    setIsLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading && !user) {
        router.push('/login');
      }

      const fetchRole = async () => {
        try {
          const token = await getFirebaseToken();
          if (token) {
            const res = await fetch('/api/user/role', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });

            const data = await res.json();
            setRole(data.role);
          }
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      };

      if (user) {
        fetchRole();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [user, loading, router]);

  if (loading || (!user && typeof window !== 'undefined')) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFFFFF]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF6F61]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#333333] flex flex-col">
      <Navigation isAuthenticated={true} />
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md bg-[#FFE5E5] border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome to your dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center">{user?.email}</p>
            <div className="flex flex-col space-y-4">
              <Button
                onClick={() => auth.signOut()}
                className="bg-[#FF6F61] text-white hover:bg-[#FFB3B0]"
              >
                Sign Out
              </Button>
              {role === 'Free User' ? (
                <Button
                  onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID as string)}
                  className="bg-[#FF6F61] text-white hover:bg-[#FFB3B0]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Upgrade Account'}
                </Button>
              ) : (
                <Button
                  className="bg-[#FFB3B0] text-[#333333] cursor-not-allowed"
                  disabled
                >
                  You are already "{role}"
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
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
  );
}