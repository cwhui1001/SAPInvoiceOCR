'use client';

import React, { useEffect, useState } from 'react';

interface FioriThemeProviderProps {
  children: React.ReactNode;
}

export default function FioriThemeProvider({ children }: FioriThemeProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // For now, just return children without ThemeProvider to avoid SSR issues
  // We can add the ThemeProvider back once we resolve any compatibility issues
  return <>{children}</>;
}
