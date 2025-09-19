// context/UserContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  nickname: string;
  token?: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Criar contexto com valor padrão
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Provider do contexto
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o contexto
export const useUser = () => useContext(UserContext);
