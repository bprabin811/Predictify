import React from 'react';
import ReactECharts from 'echarts-for-react';

const PairPlot = () => {
  const option = {
    // title: {
    //   text: 'Pair Plot Example',
    // },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '10%',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'pair plot',
        type: 'scatter',
        data: [
          [10, 8],
          [20, 15],
          [30, 12],
          [40, 25],
          [50, 22],
          [8, 10],
          [15, 20],
          [12, 30],
          [25, 40],
          [22, 50],
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

export default PairPlot;
