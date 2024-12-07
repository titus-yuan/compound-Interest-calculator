import { EChartsOption } from 'echarts';
import { ChartDataPoint } from './types';
import { formatCurrency } from './calculations';

export const createChartOptions = (data: ChartDataPoint[]): EChartsOption => {
  if (!data || data.length === 0) {
    return {};
  }

  return {
    animation: false,
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const dataPoint = params[0];
        return `Year ${dataPoint.value[0]}<br/>
                Amount: ${formatCurrency(dataPoint.value[1])}`;
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: 'Years',
      nameLocation: 'middle',
      nameGap: 30,
      min: 0,
      max: Math.max(...data.map(d => d.year))
    },
    yAxis: {
      type: 'value',
      name: 'Amount ($)',
      nameLocation: 'middle',
      nameGap: 50,
      axisLabel: {
        formatter: (value: number) => formatCurrency(value).replace('$', '')
      }
    },
    series: [{
      name: 'Compound Interest',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      data: data.map(point => [point.year, point.amount]),
      label: {
        show: true,
        formatter: (params: any) => formatCurrency(params.value[1]),
        position: 'top'
      },
      itemStyle: {
        color: 'hsl(var(--primary))'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'hsla(var(--primary), 0.3)'
          }, {
            offset: 1,
            color: 'hsla(var(--primary), 0.05)'
          }]
        }
      }
    }]
  };
};