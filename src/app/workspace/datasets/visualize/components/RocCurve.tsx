import React from 'react';
import ReactECharts from 'echarts-for-react';

const ROCCurve = () => {
  const option = {
    // title: {
    //   text: 'ROC Curve Example',
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'value',
      name: 'False Positive Rate',
    },
    yAxis: {
      type: 'value',
      name: 'True Positive Rate',
    },
    series: [
      {
        name: 'ROC',
        type: 'line',
        data: [
          [0, 0],
          [0.1, 0.6],
          [0.2, 0.7],
          [0.3, 0.8],
          [0.4, 0.85],
          [0.5, 0.9],
          [0.6, 0.93],
          [0.7, 0.95],
          [0.8, 0.97],
          [0.9, 0.98],
          [1, 1],
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

export default ROCCurve;
