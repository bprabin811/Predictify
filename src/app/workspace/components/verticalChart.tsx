import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ChartData {
  name: string;
  value: number;
}

interface VerticalBarChartProps {
  data: ChartData[];
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: data.map((item) => item.name),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Value',
        type: 'bar',
        data: data.map((item) => item.value),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 320 }} />;
};

export default VerticalBarChart;
