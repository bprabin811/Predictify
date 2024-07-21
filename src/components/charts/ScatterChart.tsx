import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ScatterPlotChartProps {
  data: any[];
}

const ScatterPlot: React.FC<ScatterPlotChartProps> = ({ data }) => {
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
        data: data,
        type: 'scatter',
      },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default ScatterPlot;
