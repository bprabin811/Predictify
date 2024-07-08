import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

const PieChart = () => {
  const option: EChartsOption = {
    // title: {
    //   text: 'Pie Chart Example',
    // },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: 'Access Source',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
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

export default PieChart;
