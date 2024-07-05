import React from 'react';
import ReactECharts from 'echarts-for-react';

const BoxPlot = () => {
  const data = [
    [
      850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000,
      960, 960,
    ],
    [
      960, 940, 960, 940, 940, 880, 880, 890, 880, 840, 830, 810, 790, 810, 820, 850, 870, 870, 810,
      740,
    ],
    [
      880, 880, 880, 860, 720, 720, 720, 780, 760, 860, 860, 860, 830, 830, 830, 830, 840, 840, 810,
      810,
    ],
    [
      890, 810, 810, 820, 860, 780, 800, 810, 810, 870, 870, 830, 820, 820, 860, 880, 880, 860, 840,
      840,
    ],
  ];

  const option = {
    // title: {
    //   text: 'Box Plot Example',
    // },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },
    yAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    xAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'boxplot',
        type: 'boxplot',
        data: data.map((item) => [
          Math.min(...item),
          item.reduce((a, b) => a + b, 0) / item.length,
          item[Math.floor(item.length / 2)],
          Math.max(...item),
          Math.max(...item),
        ]),
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default BoxPlot;
