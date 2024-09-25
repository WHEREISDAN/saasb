// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '../../hooks/useAuth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = async (priceId: string) => {
    setIsLoading(true);
    const res = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ priceId }),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    setIsLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading && !user) {
        router.push('/login');
      }
    }, 500); // 500ms delay to smooth out the transition

    return () => clearTimeout(timer);
  }, [user, loading, router]);

  if (loading || (!user && typeof window !== 'undefined')) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#FF6F61]"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to your dashboard, {user?.email}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => auth.signOut()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
        <button
          onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID as string)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Upgrade Account'}
        </button>
      </div>
    </div>
  );
}