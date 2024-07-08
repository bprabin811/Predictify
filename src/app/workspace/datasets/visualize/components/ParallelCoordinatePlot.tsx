import React from 'react';
import ReactECharts from 'echarts-for-react';

const ParallelCoordinatesPlot = () => {
  const option = {
    // title: {
    //   text: 'Parallel Coordinates Plot Example',
    // },
    parallelAxis: [
      { dim: 0, name: 'Metric 1' },
      { dim: 1, name: 'Metric 2' },
      { dim: 2, name: 'Metric 3' },
      { dim: 3, name: 'Metric 4' },
      { dim: 4, name: 'Metric 5' },
    ],
    series: [
      {
        name: 'parallel',
        type: 'parallel',
        data: [
          [1, 55, 9, 56, 0.46],
          [2, 25, 11, 21, 0.65],
          [3, 56, 7, 63, 0.3],
          [4, 33, 7, 29, 0.33],
          [5, 42, 24, 44, 0.76],
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

export default ParallelCoordinatesPlot;
