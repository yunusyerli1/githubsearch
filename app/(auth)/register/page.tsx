'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    console.log('Logging out...');
    router.push('/login');
  }, [router]);

  return (
    <div>
      <h1>Logging Out...</h1>
    </div>
  );
}