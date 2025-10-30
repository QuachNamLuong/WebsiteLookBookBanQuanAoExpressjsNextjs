'use client';

import useSWR from 'swr';

export interface User {
  userId: string;
  username?: string;
  email?: string;
  role?: 'ADMIN' | 'CUSTOMER' | string;
}

export interface UseUserResult {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: Error | null;
  mutateUser: () => Promise<void>;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Not authenticated');
  }

  return res.json();
};

/**
 * useUser hook — fetches the current logged-in user
 * from your Express `/auth/me` endpoint.
 */
export function useUser(): UseUserResult {
  const { data, error, mutate, isValidating } = useSWR<{ user: User }>(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/auth/me`,
    fetcher,
    {
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  return {
    user: data?.user ?? null,
    isLoading: !data && !error && isValidating,
    isLoggedIn: !!data?.user,
    error: error ?? null,
    mutateUser: async () => {
      await mutate();
    },
  };
}
