import React from 'react';
import ReactECharts from 'echarts-for-react';

const ClusteredBarChart = () => {
  const option = {
    // title: {
    //   text: 'Clustered Bar Chart Example',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Category A',
        type: 'bar',
        data: [10, 15, 20, 25, 30],
      },
      {
        name: 'Category B',
        type: 'bar',
        data: [15, 20, 25, 30, 35],
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );;
};

export default ClusteredBarChart;
