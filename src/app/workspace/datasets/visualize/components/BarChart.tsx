import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface BarChartProps {
  xAxisData: string[];
  yAxisData?: number[];
}

const BarChart: React.FC<BarChartProps> = ({ xAxisData, yAxisData }) => {
  const option: EChartsOption = {
    // title: {
    //   text: 'Bar Chart Example',
    // },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: xAxisData,
      // data: ['Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Fruits',
        type: 'bar',
        data: yAxisData,
        // data: [5, 20, 36, 10, 10],
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default BarChart;
