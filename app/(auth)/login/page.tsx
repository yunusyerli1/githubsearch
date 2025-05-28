'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    console.log('Logging in...');
    router.push('/login');
  }, [router]);

  return (
    <div>
      <h1>Register...</h1>
    </div>
  );
}