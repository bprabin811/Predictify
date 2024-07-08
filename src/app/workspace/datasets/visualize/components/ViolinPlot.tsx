import React from 'react';
import ReactECharts from 'echarts-for-react';

const ViolinPlot = () => {
  const data = [
    { name: 'Category 1', value: [10, 20, 30, 40, 50] },
    { name: 'Category 2', value: [15, 25, 35, 45, 55] },
    { name: 'Category 3', value: [20, 30, 40, 50, 60] },
  ];

  const option = {
    // title: {
    //   text: 'Violin Plot Example',
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'violin',
        type: 'boxplot',
        data: data.map((d) => [
          Math.min(...d.value),
          d.value.reduce((a, b) => a + b, 0) / d.value.length,
          d.value[Math.floor(d.value.length / 2)],
          Math.max(...d.value),
          Math.max(...d.value),
        ]),
      },
      {
        name: 'scatter',
        type: 'scatter',
        data: data.flatMap((d) => d.value.map((v) => [d.name, v])),
        itemStyle: {
          opacity: 0.6,
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

export default ViolinPlot;
