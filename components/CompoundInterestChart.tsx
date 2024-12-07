"use client";

import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { ChartDataPoint } from '@/lib/types';
import { createChartOptions } from '@/lib/chart-config';

interface CompoundInterestChartProps {
  data: ChartDataPoint[];
}

export function CompoundInterestChart({ data }: CompoundInterestChartProps) {
  const [chartOption, setChartOption] = useState<EChartsOption>({});

  useEffect(() => {
    const options = createChartOptions(data);
    setChartOption(options);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
        Enter values to see the compound interest projection
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]">
      <ReactECharts
        option={chartOption}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
        notMerge={true}
      />
    </div>
  );
}