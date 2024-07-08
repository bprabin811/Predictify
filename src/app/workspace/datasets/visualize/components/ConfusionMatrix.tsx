import React from 'react';
import ReactECharts from 'echarts-for-react';

const ConfusionMatrix = () => {
  const option = {
    // title: {
    //   text: 'Confusion Matrix Example',
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
      data: ['Class A', 'Class B', 'Class C', 'Class D'],
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: ['Class A', 'Class B', 'Class C', 'Class D'],
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '15%',
    },
    series: [
      {
        name: 'Confusion Matrix',
        type: 'heatmap',
        data: [
          [0, 0, 50],
          [0, 1, 5],
          [0, 2, 10],
          [0, 3, 1],
          [1, 0, 4],
          [1, 1, 45],
          [1, 2, 15],
          [1, 3, 0],
          [2, 0, 10],
          [2, 1, 10],
          [2, 2, 40],
          [2, 3, 5],
          [3, 0, 0],
          [3, 1, 2],
          [3, 2, 5],
          [3, 3, 45],
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
  );;
};

export default ConfusionMatrix;
