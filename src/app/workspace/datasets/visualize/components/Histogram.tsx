import React from 'react';
import ReactECharts from 'echarts-for-react';

const Histogram = () => {
  const data = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];
  const bins = 5;
  const binWidth = (Math.max(...data) - Math.min(...data)) / bins;

  const option = {
    // title: {
    //   text: 'Histogram Example',
    // },
    xAxis: {
      type: 'category',
      data: Array.from(
        { length: bins },
        (_, i) => `${(i * binWidth).toFixed(1)}-${((i + 1) * binWidth).toFixed(1)}`,
      ),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'bar',
        data: Array.from(
          { length: bins },
          (_, i) => data.filter((v) => v >= i * binWidth && v < (i + 1) * binWidth).length,
        ),
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default Histogram;
