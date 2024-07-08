import React from 'react';
import ReactECharts from 'echarts-for-react';

const AreaChart = () => {
  const option = {
    // title: {
    //   text: 'Area Chart Example',
    // },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Example Series',
        type: 'line',
        stack: 'total',
        areaStyle: {},
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default AreaChart;
