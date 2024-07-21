import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface LineChartProps {
  xAxisData: string[];
  yAxisData?: number[];
}

const LineChart: React.FC<LineChartProps> = ({ xAxisData, yAxisData }) => {
  const option: EChartsOption = {
    // title: {
    //   text: 'Line Chart Example',
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Example Series',
        type: 'line',
        data: yAxisData,
        // data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: '#ea580c',
        },
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default LineChart;
