import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

const ScatterPlot = () => {
  const option: EChartsOption = {
    // title: {
    //   text: 'Scatter Plot Example',
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
        symbolSize: 10,
        data: [
          [10, 8],
          [20, 15],
          [30, 12],
          [40, 25],
          [50, 22],
        ],
        type: 'scatter',
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option}  className="h-full w-full" />
    </div>
  );
};

export default ScatterPlot;
