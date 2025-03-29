
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { CreditCard, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

const CREDIT_PLANS = [
  {
    id: 'personal',
    title: 'Personal Loan',
    apr: 8.99,
    minAmount: 1000,
    maxAmount: 25000,
    term: '1-5 years',
    icon: <DollarSign className="h-6 w-6" />,
    description: 'Flexible personal loans for any purpose with competitive rates.'
  },
  {
    id: 'auto',
    title: 'Auto Loan',
    apr: 4.49,
    minAmount: 5000,
    maxAmount: 50000,
    term: '1-7 years',
    icon: <CreditCard className="h-6 w-6" />,
    description: 'Low-rate auto loans for new and used vehicles.'
  },
  {
    id: 'home',
    title: 'Home Equity',
    apr: 6.25,
    minAmount: 10000,
    maxAmount: 250000,
    term: '5-20 years',
    icon: <TrendingUp className="h-6 w-6" />,
    description: 'Use your home equity for renovations, debt consolidation, or other large expenses.'
  },
  {
    id: 'credit-line',
    title: 'Line of Credit',
    apr: 10.99,
    minAmount: 500,
    maxAmount: 20000,
    term: 'Revolving',
    icon: <ShieldCheck className="h-6 w-6" />,
    description: 'Flexible credit line to use as needed with competitive rates.'
  }
];

const Credit = () => {
  const { user } = useAuth();
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();
  
  const [selectedCreditId, setSelectedCreditId] = useState('personal');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const selectedCreditPlan = CREDIT_PLANS.find(plan => plan.id === selectedCreditId);
  
  const handleApplyForCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCreditPlan) return;
    
    const amount = parseFloat(loanAmount);
    if (isNaN(amount) || amount < selectedCreditPlan.minAmount || amount > selectedCreditPlan.maxAmount) {
      toast.error(`Please enter an amount between ${formatCurrency(selectedCreditPlan.minAmount)} and ${formatCurrency(selectedCreditPlan.maxAmount)}`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would submit to a backend for approval
      // Here we'll simulate approval and directly add the transaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      await addTransaction({
        type: 'credit',
        amount,
        description: `${selectedCreditPlan.title}: ${loanPurpose || 'No purpose specified'}`
      });
      
      toast.success('Credit application approved!');
      setLoanAmount('');
      setLoanPurpose('');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to process credit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Credit Services</h1>
      
      <Tabs defaultValue="apply" className="mb-8">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="apply">Apply for Credit</TabsTrigger>
          <TabsTrigger value="info">Credit Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apply">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {CREDIT_PLANS.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCreditId === plan.id ? 'ring-2 ring-banking-primary' : ''
                }`}
                onClick={() => setSelectedCreditId(plan.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <div className="p-2 bg-banking-muted rounded-full text-banking-primary">
                      {plan.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">APR</p>
                      <p className="font-medium">{plan.apr}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Term</p>
                      <p className="font-medium">{plan.term}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Amount Range</p>
                      <p className="font-medium">{formatCurrency(plan.minAmount)} - {formatCurrency(plan.maxAmount)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedCreditPlan && (
            <Card>
              <CardHeader>
                <CardTitle>Apply for {selectedCreditPlan.title}</CardTitle>
                <CardDescription>
                  Complete the form below to apply for your {selectedCreditPlan.title.toLowerCase()}.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleApplyForCredit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount ({formatCurrency(selectedCreditPlan.minAmount)} - {formatCurrency(selectedCreditPlan.maxAmount)})</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter loan amount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      min={selectedCreditPlan.minAmount}
                      max={selectedCreditPlan.maxAmount}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Input
                      id="purpose"
                      placeholder="What will you use this loan for?"
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                    />
                  </div>
                  <div className="py-2 px-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                    <p className="mb-2">By applying for this loan, you agree to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Allow us to check your credit history</li>
                      <li>Provide accurate and truthful information</li>
                      <li>Repay the loan according to the agreed terms</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isSubmitting || !loanAmount}
                  >
                    {isSubmitting ? 'Processing...' : 'Apply Now'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Our Credit Services</CardTitle>
              <CardDescription>
                Learn about the different credit options available to you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Types of Credit</h3>
                <p className="text-gray-600">
                  We offer various credit products to meet your financial needs:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  <li>Personal Loans for any purpose</li>
                  <li>Auto Loans for vehicle purchases</li>
                  <li>Home Equity Loans for home improvements or major expenses</li>
                  <li>Lines of Credit for flexible borrowing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Credit Requirements</h3>
                <p className="text-gray-600">
                  To qualify for our credit products, we typically look at:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  <li>Credit history and score</li>
                  <li>Income and employment stability</li>
                  <li>Existing debt obligations</li>
                  <li>Relationship with our bank</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Application Process</h3>
                <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-600">
                  <li>Select the credit product that meets your needs</li>
                  <li>Complete the application with accurate information</li>
                  <li>We review your application (typically 1-3 business days)</li>
                  <li>If approved, funds are disbursed to your account</li>
                  <li>Begin making payments according to your loan terms</li>
                </ol>
              </div>
              
              <div className="bg-banking-muted p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Need Help?</h3>
                <p className="text-gray-600">
                  Our financial advisors are available to help you choose the right credit option for your needs.
                  Schedule a consultation by calling (123) 456-7890 or visiting a branch near you.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Credit;
