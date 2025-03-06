import React, { createContext, useState } from 'react';

// Create a Context
export const TransactionContext = createContext();

// Create a Provider component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  // Function to add a new transaction
  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};