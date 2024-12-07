"use client";

import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { CompoundInterestForm } from '@/components/CompoundInterestForm';
import { CompoundInterestChart } from '@/components/CompoundInterestChart';
import { calculateCompoundInterest } from '@/lib/calculations';
import { CompoundInterestInputs, ChartDataPoint } from '@/lib/types';
import debounce from 'lodash.debounce';

export default function Home() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = debounce((data: CompoundInterestInputs) => {
    setIsLoading(true);
    try {
      const results = calculateCompoundInterest(data);
      setChartData(results);
    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Initialize with default values
  useEffect(() => {
    handleCalculate({
      principal: 10000,
      years: 10,
      interestRate: 7
    });
  }, []);

  return (
    <main className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Calculator className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Compound Interest Calculator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Investment Details</h2>
            <CompoundInterestForm onCalculate={handleCalculate} isLoading={isLoading} />
          </div>

          <div className="bg-card p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Growth Projection</h2>
            <CompoundInterestChart data={chartData} />
          </div>
        </div>
      </div>
    </main>
  );
}