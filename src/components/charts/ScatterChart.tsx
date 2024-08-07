import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface ScatterPlotChartProps {
  data: any[];
  xLabel?: string;
  yLabel?: string;
  plotoption?: string;
}

const ScatterPlot: React.FC<ScatterPlotChartProps> = ({ data, xLabel, yLabel, plotoption }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      // type: 'value',
      // min: 'dataMin',
      name: xLabel,
      nameLocation: 'middle',
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 10,
      },
    },
    yAxis: {
      // type: 'value', e'
      // min: 'dataMin',
      name: yLabel,
      nameLocation: 'end',
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 10,
      },
    },
    series: [
      {
        symbolSize: 20,
        data: data,
        type: 'scatter',
      },
    ],
    dataZoom: [
      {
        type: 'inside', // Enable zooming using the mouse wheel and dragging
        xAxisIndex: 0, // Apply to the x-axis
        yAxisIndex: 0, // Apply to the y-axis
      },
      // {
      //   type: 'slider', // Enable zooming using a slider
      //   xAxisIndex: 0, // Apply to the x-axis
      //   yAxisIndex: 0, // Apply to the y-axis
      // },
    ],
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ReactECharts option={option} className="h-full w-full" />
    </div>
  );
};

export default ScatterPlot;
