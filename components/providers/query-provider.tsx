// app/providers.tsx

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface Props {
   children: ReactNode;
}

export default function QueryProviders({ children }: Props) {
   const [queryClient] = useState(() => new QueryClient({
      defaultOptions: {
         queries: {
            staleTime: 10000,  // Data stays fresh for 10 seconds
            //   cacheTime: 300000,
            refetchOnWindowFocus: true,
            retry: 2, // Retry failed requests twice
         },
      },
   }));

   return (
      <QueryClientProvider client={queryClient}>
         {children}
      </QueryClientProvider>
   );
}
