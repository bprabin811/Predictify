import React from 'react';
import ReactECharts from 'echarts-for-react';

interface AreaChartProps {
  xAxisData: string[];
  yAxisData?: number[];
}

const AreaChart:React.FC<AreaChartProps> = ({xAxisData,yAxisData}) => {
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
      data: xAxisData,
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
        data: yAxisData,
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
