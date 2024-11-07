import React, { createContext, useContext, useState } from 'react';

// Create the context with initial shape
const MobileMenuContext = createContext();

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
};

export const MobileMenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  return (
    <MobileMenuContext.Provider
      value={{
        isOpen,
        toggleMenu,
        closeMenu,
        openMenu,
        activeMenu,
        setActiveMenu
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};
