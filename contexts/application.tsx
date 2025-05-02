import { ApplicationSettingInterface } from "@/types/application-setting";
import React, { createContext, useContext } from "react";

interface ApplicationProps {
  establishment: ApplicationSettingInterface;
}

export const ApplicationContext = createContext({} as ApplicationProps);

interface ApplicationProviderProps {
  establishment: ApplicationSettingInterface;
  children: React.ReactNode;
}

export function ApplicationProvider({
  establishment,
  children,
}: ApplicationProviderProps) {
  return (
    <ApplicationContext.Provider value={{ establishment }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  return useContext(ApplicationContext);
}
