'use client';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr'
export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return <SWRConfig value={{
    refreshInterval: 3000,
    fetcher: ([resource, init]) => fetch(resource, init).then(res => res.json())
  }}>{children}</SWRConfig>
};