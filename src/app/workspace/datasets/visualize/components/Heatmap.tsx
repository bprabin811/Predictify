import React from 'react';
import ReactECharts from 'echarts-for-react';

const Heatmap = () => {
  const option = {
    // title: {
    //   text: 'Heatmap Example',
    // },
    tooltip: {
      position: 'top',
    },
    grid: {
      height: '50%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: ['Morning', 'Afternoon', 'Evening', 'Night'],
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 10,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    series: [
      {
        name: 'Punch Card',
        type: 'heatmap',
        data: [
          [0, 0, 5],
          [0, 1, 1],
          [0, 2, 0],
          [0, 3, 0],
          [1, 0, 1],
          [1, 1, 0],
          [1, 2, 3],
          [1, 3, 0],
          [2, 0, 3],
          [2, 1, 0],
          [2, 2, 1],
          [2, 3, 0],
          [3, 0, 0],
          [3, 1, 1],
          [3, 2, 2],
          [3, 3, 1],
          [4, 0, 2],
          [4, 1, 2],
          [4, 2, 3],
          [4, 3, 2],
          [5, 0, 2],
          [5, 1, 4],
          [5, 2, 6],
          [5, 3, 2],
          [6, 0, 1],
          [6, 1, 2],
          [6, 2, 3],
          [6, 3, 4],
        ],
        label: {
          show: true,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
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

export default Heatmap;
