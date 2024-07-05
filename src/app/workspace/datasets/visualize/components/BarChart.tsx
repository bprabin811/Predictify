import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

const BarChart = () => {
  const option: EChartsOption = {
    // title: {
    //   text: 'Bar Chart Example',
    // },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Apples', 'Bananas', 'Cherries', 'Dates', 'Elderberries'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Fruits',
        type: 'bar',
        data: [5, 20, 36, 10, 10],
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts
        option={option}
        className="h-full w-full"
      />
    </div>
  );
};

export default BarChart;
