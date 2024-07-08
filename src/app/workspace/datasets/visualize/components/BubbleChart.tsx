import React from 'react';
import ReactECharts from 'echarts-for-react';

const BubbleChart = () => {
  const option = {
    // title: {
    //   text: 'Bubble Chart Example',
    // },
    xAxis: {
      type: 'value',
      name: 'X Axis',
    },
    yAxis: {
      type: 'value',
      name: 'Y Axis',
    },
    series: [
      {
        name: 'bubble',
        type: 'scatter',
        symbolSize: function (data: number[]) {
          return Math.sqrt(data[2]) * 10;
        },
        data: [
          [10, 10, 30],
          [20, 20, 40],
          [30, 30, 50],
          [40, 40, 60],
          [50, 50, 70],
        ],
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );;
};

export default BubbleChart;
