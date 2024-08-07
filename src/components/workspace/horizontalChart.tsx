import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface HorizontalBarChartProps {
  xLabel: any[];
  yLabel: any[];
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ xLabel, yLabel }) => {
  const option: EChartsOption = {
    tooltip: {},
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: xLabel,
      axisLabel: {
        interval: 0,
      },
    },
    series: [
      {
        name: 'Value',
        type: 'bar',
        data: yLabel,
        itemStyle: {
          color: '#E11D4890',
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 350 }} />;
};

export default HorizontalBarChart;
