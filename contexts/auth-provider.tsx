import { SessionProvider } from "next-auth/react";
import { createContext, useContext, useState } from "react";

interface AuthProps {
  formOpen: boolean;
  onOpenFormChange(state: boolean): void;
}

const AuthContext = createContext({} as AuthProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const onOpenFormChange = (state: boolean) => {
    setFormOpen(state);
  };

  return (
    <AuthContext.Provider value={{ onOpenFormChange, formOpen }}>
      <SessionProvider>{children}</SessionProvider>
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
