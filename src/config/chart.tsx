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
import {
  AreaChartIcon,
  BarChartIcon,
  Circle,
  LineChartIcon,
  PieChart,
  ScatterChart,
  Torus,
} from 'lucide-react';

export const ChartsList = [
  {
    id: 1,
    key: 'bar',
    name: 'Bar Chart',
    description:
      'A bar chart or bar graph is a chart or graph that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent.',
    list: ['count', 'average', 'sum', 'min', 'max', 'per-hundredths'],
    component: BarChart,
  },
  {
    id: 2,
    key: 'line',
    name: 'Line Chart',
    description:
      'A line chart or line plot or line graph or curve chart is a type of chart which displays information as a series of data points called markers connected by straight line segments.',
    list: ['count', 'average', 'sum', 'min', 'max', 'per-hundredths'],
    component: LineChart,
  },
  {
    id: 3,
    key: 'area',
    name: 'Area Chart',
    description:
      'An area chart or area graph displays graphically quantitative data. It is based on the line chart. The area between axis and line are commonly emphasized with colors, textures and hatchings.',
    list: ['count', 'average', 'sum', 'min', 'max', 'per-hundredths'],
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

export const ChangeChars = [
  {
    id: 1,
    key: 'bar',
    chanage_to: [
      {
        key: 'line',
        name: 'Line Chart',
        icon: <LineChartIcon size={16} />,
      },
      {
        key: 'area',
        name: 'Area Chart',
        icon: <AreaChartIcon size={16} />,
      },
    ],
  },
  {
    id: 2,
    key: 'line',
    chanage_to: [
      {
        key: 'bar',
        name: 'Bar Chart',
        icon: <BarChartIcon size={16} />,
      },
      {
        key: 'area',
        name: 'Area Chart',
        icon: <AreaChartIcon size={16} />,
      },
    ],
  },
  {
    id: 3,
    key: 'area',
    chanage_to: [
      {
        key: 'bar',
        name: 'Bar Chart',
        icon: <BarChartIcon size={16} />,
      },
      {
        key: 'line',
        name: 'Line Chart',
        icon: <LineChartIcon size={16} />,
      },
    ],
  },
  {
    id: 4,
    key: 'scatter',
    chanage_to: [
      {
        key: 'linear_regression',
        name: 'Linear Regression Chart',
      },
      {
        key: 'exponential_regression',
        name: 'Exponential Regression Chart',
      },
      {
        key: 'polynomial_regression',
        name: 'Polynomial Regression Chart',
      },
    ],
  },
  {
    id: 5,
    key: 'pie',
    chanage_to: [
      {
        key: 'doughnut',
        name: 'Doughnut Chart',
        icon: <Torus size={16} />,
      },
      {
        key: 'customized_pie',
        name: 'Customized Pie Chart',
        icon: <PieChart size={16} />,
      },
      {
        key: 'bar',
        name: 'Bar Chart',
        icon: <BarChartIcon size={16} />,
      },
      {
        key: 'area',
        name: 'Area Chart',
        icon: <AreaChartIcon size={16} />,
      },
      {
        key: 'line',
        name: 'Line Chart',
        icon: <LineChartIcon size={16} />,
      },
    ],
  },
  {
    id: 6,
    key: 'doughnut',
    chanage_to: [
      {
        key: 'pie',
        name: 'Pie Chart',
        icon: <Circle size={16} />,
      },
      {
        key: 'customized_pie',
        name: 'Customized Pie Chart',
        icon: <PieChart size={16} />,
      },
      {
        key: 'bar',
        name: 'Bar Chart',
        icon: <BarChartIcon size={16} />,
      },
      {
        key: 'area',
        name: 'Area Chart',
        icon: <AreaChartIcon size={16} />,
      },
      {
        key: 'line',
        name: 'Line Chart',
        icon: <LineChartIcon size={16} />,
      },
    ],
  },
  {
    id: 7,
    key: 'customized_pie',
    chanage_to: [
      {
        key: 'pie',
        name: 'Pie Chart',
        icon: <Circle size={16} />,
      },
      {
        key: 'doughnut',
        name: 'Doughnut Chart',
        icon: <Torus size={16} />,
      },
      {
        key: 'bar',
        name: 'Bar Chart',
        icon: <BarChartIcon size={16} />,
      },
      {
        key: 'area',
        name: 'Area Chart',
        icon: <AreaChartIcon size={16} />,
      },
      {
        key: 'line',
        name: 'Line Chart',
        icon: <LineChartIcon size={16} />,
      },
    ],
  },
  {
    id: 8,
    key: 'linear_regression',
    chanage_to: [
      {
        key: 'polynomial_regression',
        name: 'Polynomial Regression Chart',
      },
      {
        key: 'exponential_regression',
        name: 'Exponential Regression Chart',
      },
      {
        key: 'scatter',
        name: 'Scatter Plot',
        icon: <ScatterChart size={16} />,
      },
    ],
  },
  {
    id: 9,
    key: 'polynomial_regression',
    chanage_to: [
      {
        key: 'linear_regression',
        name: 'Linear Regression Chart',
      },
      {
        key: 'exponential_regression',
        name: 'Exponential Regression Chart',
      },
      {
        key: 'scatter',
        name: 'Scatter Plot',
        icon: <ScatterChart size={16} />,
      },
    ],
  },
  {
    id: 10,
    key: 'exponential_regression',
    chanage_to: [
      {
        key: 'linear_regression',
        name: 'Linear Regression Chart',
      },
      {
        key: 'polynomial_regression',
        name: 'Polynomial Regression Chart',
      },
      {
        key: 'scatter',
        name: 'Scatter Plot',
        icon: <ScatterChart size={16} />,
      },
    ],
  },
];

export const PlotOptions = [
  {
    id: 1,
    key: 'bar',
    plot_options: ['count', 'average', 'sum', 'min', 'max'],
  },
  {
    id: 2,
    key: 'line',
    plot_options: ['count', 'average', 'sum', 'min', 'max'],
  },
  {
    id: 3,
    key: 'area',
    plot_options: ['count', 'average', 'sum', 'min', 'max'],
  },
  {
    id: 4,
    key: 'scatter',
    plot_options: [],
  },
  {
    id: 5,
    key: 'pie',
    plot_options: [],
  },
  {
    id: 6,
    key: 'doughnut',
    plot_options: [],
  },
  {
    id: 7,
    key: 'customized_pie',
    plot_options: [],
  },
  {
    id: 8,
    key: 'linear_regression',
    plot_options: [],
  },
  {
    id: 9,
    key: 'polynomial_regression',
    plot_options: [],
  },
  {
    id: 10,
    key: 'exponential_regression',
    plot_options: [],
  },
];
