import { CompoundInterestInputs, ChartDataPoint } from './types';

export const calculateCompoundInterest = (
  inputs: CompoundInterestInputs
): ChartDataPoint[] => {
  const { principal, years, interestRate } = inputs;
  const rate = interestRate / 100;
  
  return Array.from({ length: years + 1 }, (_, index) => ({
    year: index,
    amount: Number((principal * Math.pow(1 + rate, index)).toFixed(2)),
  }));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};