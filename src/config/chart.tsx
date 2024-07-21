import AreaChart from '@/components/charts/AreaChart';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import ScatterPlot from '@/components/charts/ScatterChart';

export const ChartsList = [
  {
    id: 1,
    key: 'bar',
    name: 'Bar Chart',
    description:
      'A bar chart or bar graph is a chart or graph that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent.',
    list: [
      'Count',
      'Average',
      'Sum',
      'Median',
      'Standard Deviation',
      'Maximum',
      'Minimum',
      'Percentile',
      'Rate',
      'Growth Rate',
      'Frequency',
      'Cumulative Sum',
      'Proportion',
    ],
    component: BarChart,
  },
  {
    id: 2,
    key: 'line',
    name: 'Line Chart',
    description:
      'A line chart or line plot or line graph or curve chart is a type of chart which displays information as a series of data points called markers connected by straight line segments.',
    list: [
      'Count',
      'Average',
      'Sum',
      'Median',
      'Standard Deviation',
      'Maximum',
      'Minimum',
      'Percentile',
      'Rate',
      'Growth Rate',
      'Frequency',
      'Cumulative Sum',
      'Proportion',
    ],
    component: LineChart,
  },
  {
    id: 3,
    key: 'area',
    name: 'Area Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: [
      'Count',
      'Average',
      'Sum',
      'Median',
      'Standard Deviation',
      'Maximum',
      'Minimum',
      'Percentile',
      'Rate',
      'Growth Rate',
      'Frequency',
      'Cumulative Sum',
      'Proportion',
    ],
    component: AreaChart,
  },
  {
    id: 4,
    key: 'scatter',
    name: 'Scatter Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: [
      'Count',
      'Average',
      'Sum',
      'Median',
      'Standard Deviation',
      'Maximum',
      'Minimum',
      'Percentile',
      'Rate',
      'Growth Rate',
      'Frequency',
      'Cumulative Sum',
      'Proportion',
    ],
    component: ScatterPlot,
  },
];
