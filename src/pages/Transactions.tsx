
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions, Transaction } from '@/contexts/TransactionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ArrowDown, ArrowUp, CreditCard, RefreshCw, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';

const Transactions = () => {
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      // First apply type filter
      if (filterType !== 'all' && transaction.type !== filterType) {
        return false;
      }
      
      // Then apply search filter (case insensitive)
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          transaction.description?.toLowerCase().includes(searchTermLower) ||
          transaction.recipient?.toLowerCase().includes(searchTermLower) ||
          transaction.type.toLowerCase().includes(searchTermLower) ||
          transaction.amount.toString().includes(searchTermLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  
  // Get transaction icon based on type
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="h-5 w-5 text-green-600" />;
      case 'withdrawal':
        return <ArrowUp className="h-5 w-5 text-red-600" />;
      case 'transfer':
        return <RefreshCw className="h-5 w-5 text-blue-600" />;
      case 'credit':
        return <CreditCard className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
      
      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and sort your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search transactions..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select 
              value={filterType} 
              onValueChange={setFilterType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposits</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
                <SelectItem value="transfer">Transfers</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={sortOrder} 
              onValueChange={(value) => setSortOrder(value as 'newest' | 'oldest')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transaction' : 'transactions'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length > 0 ? (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="mr-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'deposit' ? 'bg-green-100' :
                      transaction.type === 'withdrawal' ? 'bg-red-100' :
                      transaction.type === 'transfer' ? 'bg-blue-100' :
                      'bg-purple-100'
                    }`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium">
                      {transaction.description || transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleString()}
                      {transaction.recipient && ` • To: ${transaction.recipient}`}
                    </div>
                  </div>
                  
                  <div className="mr-4 text-sm text-gray-500">
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </div>
                  
                  <div className={`font-medium ${
                    transaction.type === 'deposit' || transaction.type === 'credit' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' || transaction.type === 'credit' 
                      ? `+${formatCurrency(transaction.amount)}` 
                      : `-${formatCurrency(transaction.amount)}`}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No transactions found. Try adjusting your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
