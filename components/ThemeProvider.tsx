'use client';

import { useEffect } from 'react';
import { loadData } from '@/lib/data-client';

export default function ThemeProvider() {
  useEffect(() => {
    loadData('buna_layout', null).then(data => {
      if (data && data.primaryColor) {
        // Override the Tailwind v4 theme variable
        document.documentElement.style.setProperty('--color-primary', data.primaryColor);
      }
    });
  }, []);

  return null;
}
