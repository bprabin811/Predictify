import React from 'react';
import ReactECharts from 'echarts-for-react';

const RadarChart = () => {
  const option = {
    // title: {
    //   text: 'Radar Chart Example',
    // },
    tooltip: {},
    radar: {
      indicator: [
        { name: 'Metric1', max: 100 },
        { name: 'Metric2', max: 100 },
        { name: 'Metric3', max: 100 },
        { name: 'Metric4', max: 100 },
        { name: 'Metric5', max: 100 },
      ],
    },
    series: [
      {
        name: 'Example Series',
        type: 'radar',
        data: [
          {
            value: [80, 90, 70, 85, 95],
            name: 'Example Data',
          },
        ],
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default RadarChart;
