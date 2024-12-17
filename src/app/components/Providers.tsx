'use client';

import { SessionProvider } from 'next-auth/react';
import { Providers } from "../providers";
import { useEffect, useState } from 'react';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider>
      <Providers>{children}</Providers>
    </SessionProvider>
  );
} 