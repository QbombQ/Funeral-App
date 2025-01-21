// NavigationContext.tsx
import React, { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState<string>('home');

  return (
    <NavigationContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigationContext must be used within NavigationProvider');
  return context;
};
