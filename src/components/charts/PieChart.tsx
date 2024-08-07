import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface PiePlotChartProps {
  data: any[];
  xLabel?: string;
}

const PiePlot: React.FC<PiePlotChartProps> = ({ data, xLabel }) => {
  const option = {
    grid: {
      left: '20%',
      right: '20%',
      bottom: '20%',
      top: '20%',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: 'right',
    },
    series: [
      {
        name: xLabel,
        type: 'pie',
        radius: '45%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
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

export default PiePlot;
