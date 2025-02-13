"use client"

import { createContext } from 'react';
import type { User } from '@/app/lib/types/users';


export const UserContext = createContext<User | null>(null);

export function UserProvider({ children, loginUser }: {children: React.ReactNode, loginUser: User|null}) {
  return (
    <UserContext.Provider value={loginUser}>
      {children}
    </UserContext.Provider>
  );
}
