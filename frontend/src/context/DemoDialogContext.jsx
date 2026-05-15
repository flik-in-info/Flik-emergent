import React, { createContext, useCallback, useContext, useState } from 'react';
import LeadFormDialog from '../components/LeadFormDialog';

const DemoDialogContext = createContext({ open: () => {} });

export const DemoDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('closing_cta');

  const open = useCallback((src = 'closing_cta') => {
    setSource(src);
    setIsOpen(true);
  }, []);

  return (
    <DemoDialogContext.Provider value={{ open }}>
      {children}
      <LeadFormDialog open={isOpen} onOpenChange={setIsOpen} source={source} />
    </DemoDialogContext.Provider>
  );
};

export const useDemoDialog = () => useContext(DemoDialogContext);
