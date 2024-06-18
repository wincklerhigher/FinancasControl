import React, { createContext, useContext, useState } from 'react';

const TransacaoComponent = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <TransacaoComponent.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransacaoComponent.Provider>
  );
};

export const useTransactionContext = () => useContext(TransacaoComponent);