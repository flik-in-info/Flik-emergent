import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import LeadFormDialog from '../components/LeadFormDialog';

const DemoDialogContext = createContext({ open: () => {} });

export const DemoDialogProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('closing_cta');

  const open = useCallback((src = 'closing_cta') => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <DemoDialogContext.Provider value={value}>
      {children}
      <LeadFormDialog open={isOpen} onOpenChange={setIsOpen} source={source} />
    </DemoDialogContext.Provider>
  );
};

export const useDemoDialog = () => useContext(DemoDialogContext);
