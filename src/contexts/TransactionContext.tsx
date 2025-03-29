import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export type Transaction = {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'credit';
  amount: number;
  description: string;
  recipient?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

type TransactionContextType = {
  transactions: Transaction[];
  isLoading: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'userId' | 'date' | 'status'>) => Promise<void>;
  getTransactions: () => Promise<Transaction[]>;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      getTransactions();
    } else {
      setTransactions([]);
    }
  }, [user]);

  const getTransactions = async (): Promise<Transaction[]> => {
    if (!user) return [];
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allTransactions = JSON.parse(localStorage.getItem('bankingTransactions') || '[]');
      const userTransactions = allTransactions.filter((t: Transaction) => t.userId === user.id);
      
      setTransactions(userTransactions);
      return userTransactions;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to load transactions');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const addTransaction = async (newTransactionData: Omit<Transaction, 'id' | 'userId' | 'date' | 'status'>) => {
    if (!user) {
      toast.error('You must be logged in to perform transactions');
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const allTransactions = JSON.parse(localStorage.getItem('bankingTransactions') || '[]');
      const users = JSON.parse(localStorage.getItem('bankingUsers') || '[]');
      
      const currentUser = users.find((u: any) => u.id === user.id);
      if (!currentUser) throw new Error('User not found');
      
      const newTransaction: Transaction = {
        id: `txn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: user.id,
        date: new Date().toISOString(),
        status: 'completed',
        ...newTransactionData
      };
      
      switch (newTransaction.type) {
        case 'deposit':
          currentUser.balance += newTransaction.amount;
          break;
        case 'withdrawal':
          if (currentUser.balance < newTransaction.amount) {
            toast.error('Insufficient funds');
            throw new Error('Insufficient funds');
          }
          currentUser.balance -= newTransaction.amount;
          break;
        case 'transfer':
          if (currentUser.balance < newTransaction.amount) {
            toast.error('Insufficient funds');
            throw new Error('Insufficient funds');
          }
          currentUser.balance -= newTransaction.amount;
          break;
        case 'credit':
          currentUser.balance += newTransaction.amount;
          break;
      }
      
      allTransactions.push(newTransaction);
      localStorage.setItem('bankingTransactions', JSON.stringify(allTransactions));
      
      const updatedUsers = users.map((u: any) => u.id === currentUser.id ? currentUser : u);
      localStorage.setItem('bankingUsers', JSON.stringify(updatedUsers));
      
      const { password: _, ...userWithoutPassword } = currentUser;
      localStorage.setItem('bankingUser', JSON.stringify(userWithoutPassword));
      
      await getTransactions();
      
      toast.success('Transaction completed successfully');
    } catch (error: any) {
      console.error('Transaction failed:', error);
      toast.error(error.message || 'Transaction failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions,
      isLoading,
      addTransaction,
      getTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
