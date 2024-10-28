import React, { createContext, useContext, useState } from 'react';

const MobileMenuContext = createContext();

export function MobileMenuProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(null); // 'nav' or 'sidebar' or null

  const value = {
    activeMenu,
    setActiveMenu,
  };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export const useMobileMenu = () => useContext(MobileMenuContext);
