
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, ArrowUp, CreditCard, DollarSign, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';

const Dashboard = () => {
  const { user } = useAuth();
  const { transactions, isLoading, addTransaction } = useTransactions();
  const navigate = useNavigate();
  
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal' | 'transfer'>('deposit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Get recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Calculate summary data
  const totalDeposits = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);
  const totalTransfers = transactions.filter(t => t.type === 'transfer').reduce((sum, t) => sum + t.amount, 0);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }
    
    try {
      await addTransaction({
        type: transactionType,
        amount: parseFloat(amount),
        description,
        recipient: transactionType === 'transfer' ? recipient : undefined
      });
      
      // Reset form
      setAmount('');
      setDescription('');
      setRecipient('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Balance Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardDescription>Current Balance</CardDescription>
          <CardTitle className="text-4xl font-bold">{formatCurrency(user.balance)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>New Transaction</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Transaction</DialogTitle>
                  <DialogDescription>
                    Enter the details for your new transaction.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Transaction Type</Label>
                      <Select 
                        value={transactionType} 
                        onValueChange={(value) => setTransactionType(value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select transaction type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="deposit">Deposit</SelectItem>
                          <SelectItem value="withdrawal">Withdrawal</SelectItem>
                          <SelectItem value="transfer">Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input 
                        id="amount" 
                        type="number" 
                        min="0.01" 
                        step="0.01" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Transaction description"
                      />
                    </div>
                    
                    {transactionType === 'transfer' && (
                      <div className="grid gap-2">
                        <Label htmlFor="recipient">Recipient</Label>
                        <Input 
                          id="recipient" 
                          value={recipient} 
                          onChange={(e) => setRecipient(e.target.value)}
                          placeholder="Recipient name or account"
                          required={transactionType === 'transfer'}
                        />
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      disabled={isLoading || !amount || parseFloat(amount) <= 0}
                    >
                      {isLoading ? 'Processing...' : 'Submit'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/transactions')}
            >
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <ArrowDown className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalDeposits)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Withdrawals</CardTitle>
            <ArrowUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalWithdrawals)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalTransfers)}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your last 5 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="mr-4">
                    {transaction.type === 'deposit' && (
                      <div className="bg-green-100 p-2 rounded-full">
                        <ArrowDown className="h-6 w-6 text-green-600" />
                      </div>
                    )}
                    {transaction.type === 'withdrawal' && (
                      <div className="bg-red-100 p-2 rounded-full">
                        <ArrowUp className="h-6 w-6 text-red-600" />
                      </div>
                    )}
                    {transaction.type === 'transfer' && (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <RefreshCw className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                    {transaction.type === 'credit' && (
                      <div className="bg-purple-100 p-2 rounded-full">
                        <CreditCard className="h-6 w-6 text-purple-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium">{transaction.description || transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                      {transaction.recipient && ` • To: ${transaction.recipient}`}
                    </div>
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
            <div className="text-center py-6 text-gray-500">
              No transactions yet. Start by creating a new transaction.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
