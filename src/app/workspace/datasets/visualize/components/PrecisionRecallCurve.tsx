import React from 'react';
import ReactECharts from 'echarts-for-react';

const PrecisionRecallCurve = () => {
  const option = {
    // title: {
    //   text: 'Precision-Recall Curve Example',
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'value',
      name: 'Recall',
    },
    yAxis: {
      type: 'value',
      name: 'Precision',
    },
    series: [
      {
        name: 'Precision-Recall',
        type: 'line',
        data: [
          [0, 1],
          [0.1, 0.8],
          [0.2, 0.75],
          [0.3, 0.7],
          [0.4, 0.68],
          [0.5, 0.65],
          [0.6, 0.6],
          [0.7, 0.58],
          [0.8, 0.55],
          [0.9, 0.53],
          [1, 0.5],
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

export default PrecisionRecallCurve;
