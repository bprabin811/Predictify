import AreaChart from '@/components/charts/AreaChart';
import BarChart from '@/components/charts/BarChart';
import CustomizedPie from '@/components/charts/CustomizedPieChart';
import Doughnut from '@/components/charts/DouhnutChat';
import ExponentialChart from '@/components/charts/ExponentialChart';
import LinearRegressionChart from '@/components/charts/LinearRegressionChart';
import LineChart from '@/components/charts/LineChart';
import PiePlot from '@/components/charts/PieChart';
import PolynomialRegressionChart from '@/components/charts/PolynomialRegressionChart';
import ScatterPlot from '@/components/charts/ScatterChart';

export const ChartsList = [
  {
    id: 1,
    key: 'bar',
    name: 'Bar Chart',
    description:
      'A bar chart or bar graph is a chart or graph that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent.',
    list: ['count', 'average', 'sum', 'min', 'max'],
    component: BarChart,
  },
  {
    id: 2,
    key: 'line',
    name: 'Line Chart',
    description:
      'A line chart or line plot or line graph or curve chart is a type of chart which displays information as a series of data points called markers connected by straight line segments.',
    list: ['count', 'average', 'sum', 'min', 'max'],
    component: LineChart,
  },
  {
    id: 3,
    key: 'area',
    name: 'Area Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count', 'average', 'sum', 'min', 'max'],
    component: AreaChart,
  },
  {
    id: 4,
    key: 'scatter',
    name: 'Scatter Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count', 'scatter'],
    component: ScatterPlot,
  },
  {
    id: 5,
    key: 'pie',
    name: 'Pie Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count'],
    component: PiePlot,
  },
  {
    id: 6,
    key: 'doughnut',
    name: 'Doughnut Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count'],
    component: Doughnut,
  },
  {
    id: 7,
    key: 'customized_pie',
    name: 'Customized Pie Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count'],
    component: CustomizedPie,
  },
  {
    id: 8,
    key: 'linear_regression',
    name: 'Linear Regression Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count', 'scatter'],
    component: LinearRegressionChart,
  },
  {
    id: 9,
    key: 'polynomial_regression',
    name: 'Polynomial Regression Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count', 'scatter'],
    component: PolynomialRegressionChart,
  },
  {
    id: 10,
    key: 'exponential_regression',
    name: 'Exponential Regression Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count', 'scatter'],
    component: ExponentialChart,
  },
];
