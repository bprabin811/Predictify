import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ChartData {
  name: string;
  value: number;
}

interface HorizontalBarChartProps {
  data: ChartData[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ data }) => {
  const option: EChartsOption = {
    tooltip: {},
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.map((item) => item.name),
      axisLabel: {
        interval: 0,
      },
    },
    series: [
      {
        name: 'Value',
        type: 'bar',
        data: data.map((item) => item.value),
        itemStyle: {
          color: '#ea580c',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 350 }} />;
};

export default HorizontalBarChart;
