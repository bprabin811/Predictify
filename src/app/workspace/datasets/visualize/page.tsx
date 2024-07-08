'use client';
import { useState, Suspense } from 'react';
import Loader from '@/components/Loader';
import SettingsMenu from '@/components/SettingsMenu';
import NotificationsCard from '@/components/org/Notifications';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import ScatterPlot from './components/ScatterChart';
import Heatmap from './components/Heatmap';
import BoxPlot from './components/BoxPlot';
import Histogram from './components/Histogram';
import ViolinPlot from './components/ViolinPlot';
import PairPlot from './components/PairPlot';
import BubbleChart from './components/BubbleChart';
import AreaChart from './components/AreaChart';
import Treemap from './components/Treemap';
import RadarChart from './components/RadarChart';
import ConfusionMatrix from './components/ConfusionMatrix';
import PrecisionRecallCurve from './components/PrecisionRecallCurve';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  BarChart2,
  BoxIcon,
  Heater,
  HistoryIcon,
  LineChart as LineChartIcon,
  ScatterChart,
  Search,
  ShieldQuestion,
  LayoutGrid,
  Circle,
  AreaChart as AreaChartIcon,
  Radar,
  Type,
  Layers,
  Activity,
  Sliders,
  TreePalm,
  VoicemailIcon,
  TypeIcon,
  Download,
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import ROCCurve from './components/RocCurve';
import ParallelCoordinatesPlot from './components/ParallelCoordinatePlot';
import ClusteredBarChart from './components/ClusterBar';
import { Textarea } from '@/components/ui/textarea';
import SelectColumns from './utils/SelectColumns';

const comments = [
  {
    key: 'bar',
    label: 'Bar Chart',
    description:
      'A Bar Chart is used to compare different categories of data by representing each category with a rectangular bar. The length of the bar corresponds to the value of the data. Bar charts are useful for showing comparisons between discrete categories and are ideal for visualizing differences in values across various groups or time periods.',
  },
  {
    key: 'line',
    label: 'Line Chart',
    description:
      'A Line Chart displays information as a series of data points connected by straight line segments. It is commonly used to visualize trends over time, allowing for easy analysis of how a data set evolves. Line charts are effective for identifying patterns, trends, and correlations in data over continuous intervals or time periods.',
  },
  {
    key: 'scatter',
    label: 'Scatter Plot',
    description:
      "A Scatter Plot uses dots to represent values for two different numeric variables. Each dot's position on the horizontal and vertical axis indicates values for an individual data point. Scatter plots are useful for visualizing relationships between variables, spotting correlations, and identifying potential outliers in data sets.",
  },
  {
    key: 'heatmap',
    label: 'Heatmap',
    description:
      'A Heatmap displays data in a matrix format, with individual values represented by colors. This chart type is excellent for visualizing data density, patterns, and anomalies across a large data set. Heatmaps are often used in data analysis to show the intensity of an event at different geographic locations or over various intervals.',
  },
  {
    key: 'box',
    label: 'Box Plot',
    description:
      "A Box Plot, also known as a box-and-whisker plot, provides a summary of a data set's distribution. It shows the median, quartiles, and potential outliers, giving insights into data variability and symmetry. Box plots are useful for comparing distributions between multiple groups and identifying anomalies within the data.",
  },
  {
    key: 'histogram',
    label: 'Histogram',
    description:
      'A Histogram is used to represent the distribution of numerical data by showing the frequency of data points within specific ranges or bins. Each bar in a histogram represents the frequency of data points in a particular range. Histograms are valuable for understanding the distribution, central tendency, and spread of data.',
  },
  {
    key: 'violin',
    label: 'Violin Plot',
    description:
      'A Violin Plot combines the features of a box plot and a density plot. It shows the distribution of the data across different categories and provides a visualization of the probability density of the data at different values. Violin plots are useful for comparing multiple data distributions and identifying differences in data spread and density.',
  },
  {
    key: 'pair',
    label: 'Pair Plot',
    description:
      'A Pair Plot visualizes the pairwise relationships between multiple variables in a dataset. It creates a matrix of scatter plots, allowing for a comprehensive view of interactions and correlations between all variables. Pair plots are useful in exploratory data analysis for identifying trends, correlations, and potential data patterns.',
  },
  {
    key: 'bubble',
    label: 'Bubble Chart',
    description:
      "A Bubble Chart is an extension of the scatter plot where each data point is represented by a bubble. The size of the bubble indicates an additional variable's value, adding another dimension to the visualization. Bubble charts are useful for displaying the relationship between three variables and for identifying patterns and trends.",
  },
  {
    key: 'area',
    label: 'Area Chart',
    description:
      'An Area Chart is similar to a line chart, but the area under the line is filled in with color or shading. It is used to show trends over time or categories, emphasizing the magnitude of change. Area charts are particularly useful for illustrating the cumulative effect and for comparing multiple data series to see overall trends.',
  },
  {
    key: 'treemap',
    label: 'Treemap',
    description:
      'A Treemap displays hierarchical data as a set of nested rectangles, with each rectangle representing a branch of the hierarchy. The size and color of the rectangles can be used to represent additional dimensions of the data. Treemaps are effective for visualizing proportions within a hierarchical structure and for spotting patterns and outliers.',
  },
  {
    key: 'radar',
    label: 'Radar Chart',
    description:
      'A Radar Chart, also known as a spider chart, is used to display multivariate data in a two-dimensional chart with three or more quantitative variables represented on axes starting from the same point. It is useful for comparing the relative performance of different items across various metrics, making it ideal for performance analysis and comparison.',
  },
  {
    key: 'confusion',
    label: 'Confusion Matrix',
    description:
      'A Confusion Matrix is used to evaluate the performance of a classification model. It shows the true positive, false positive, true negative, and false negative counts in a matrix format. Confusion matrices are valuable for understanding the accuracy, precision, recall, and overall effectiveness of a classifier, particularly in binary and multiclass classification problems.',
  },
  {
    key: 'roc',
    label: 'ROC Curve',
    description:
      "A ROC Curve (Receiver Operating Characteristic) plots the true positive rate against the false positive rate for different threshold settings of a binary classifier. It is used to assess the diagnostic ability of a classifier, with the area under the curve (AUC) indicating the model's performance. ROC curves are useful for comparing the performance of multiple classifiers.",
  },
  {
    key: 'precision',
    label: 'Precision-Recall Curve',
    description:
      'A Precision-Recall Curve is used to evaluate the performance of a binary classifier, especially with imbalanced datasets. It plots precision (positive predictive value) against recall (sensitivity) for different threshold settings. Precision-recall curves are useful for understanding the trade-off between precision and recall and for comparing different classifiers.',
  },
  {
    key: 'parallel',
    label: 'Parallel Coordinates Plot',
    description:
      'A Parallel Coordinates Plot visualizes multi-dimensional data by plotting each data point across multiple parallel axes. Each axis represents a variable, and each line represents a data point. This type of plot is useful for identifying patterns, correlations, and outliers in high-dimensional data, making it a powerful tool for exploratory data analysis.',
  },
  {
    key: 'clustered',
    label: 'Clustered Bar Chart',
    description:
      'A Clustered Bar Chart groups bars together to show sub-categories within each category, allowing for a comparison of different groups side by side. It is useful for comparing multiple data series across various categories and for highlighting differences and similarities between the sub-categories. Clustered bar charts are effective for detailed comparative analysis.',
  },
];

const chartComponents: { [key: string]: React.ElementType } = {
  bar: BarChart,
  line: LineChart,
  scatter: ScatterPlot,
  heatmap: Heatmap,
  box: BoxPlot,
  histogram: Histogram,
  violin: ViolinPlot,
  pair: PairPlot,
  bubble: BubbleChart,
  area: AreaChart,
  treemap: Treemap,
  radar: RadarChart,
  confusion: ConfusionMatrix,
  roc: ROCCurve,
  precision: PrecisionRecallCurve,
  parallel: ParallelCoordinatesPlot,
  clustered: ClusteredBarChart,
};

const chartItems = [
  { key: 'bar', label: 'Bar Chart', icon: <BarChart2 size={16} className="text-primary" /> },
  { key: 'line', label: 'Line Chart', icon: <LineChartIcon size={16} className="text-primary" /> },
  {
    key: 'scatter',
    label: 'Scatter Plot',
    icon: <ScatterChart size={16} className="text-primary" />,
  },
  { key: 'heatmap', label: 'Heatmap', icon: <Heater size={16} className="text-primary" /> },
  { key: 'box', label: 'Box Plot', icon: <BoxIcon size={16} className="text-primary" /> },
  {
    key: 'histogram',
    label: 'Histogram',
    icon: <HistoryIcon size={16} className="text-primary" />,
  },
  {
    key: 'violin',
    label: 'Violin Plot',
    icon: <VoicemailIcon size={16} className="text-primary" />,
  },
  { key: 'pair', label: 'Pair Plot', icon: <LayoutGrid size={16} className="text-primary" /> },
  { key: 'bubble', label: 'Bubble Chart', icon: <Circle size={16} className="text-primary" /> },
  { key: 'area', label: 'Area Chart', icon: <AreaChartIcon size={16} className="text-primary" /> },
  { key: 'treemap', label: 'Treemap', icon: <TreePalm size={16} className="text-primary" /> },
  { key: 'radar', label: 'Radar Chart', icon: <Radar size={16} className="text-primary" /> },
  {
    key: 'confusion',
    label: 'Confusion Matrix',
    icon: <Layers size={16} className="text-primary" />,
  },
  { key: 'roc', label: 'ROC Curve', icon: <Activity size={16} className="text-primary" /> },
  {
    key: 'precision',
    label: 'Precision-Recall Curve',
    icon: <Sliders size={16} className="text-primary" />,
  },
  {
    key: 'parallel',
    label: 'Parallel Coordinates Plot',
    icon: <LayoutGrid size={16} className="text-primary" />,
  },
  {
    key: 'clustered',
    label: 'Clustered Bar Chart',
    icon: <BarChart2 size={16} className="text-primary" />,
  },
];

const DataVisualize = () => {
  const [selectedChart, setSelectedChart] = useState('bar');
  const [searchQuery, setSearchQuery] = useState('');

  const SelectedChartComponent = chartComponents[selectedChart];

  const filteredChart = chartItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full">
      <div className="flex flex-1  flex-col">
        <div className="flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-4 bg-[#fbfafa] dark:bg-[#111]">
            <div className="h-[60px] flex z-40 font-semibold text-xl gap-4 items-center">
              <Link href="/">
                <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
              </Link>
              Predictify<Badge className="py-0">Beta</Badge>
            </div>
            <div className="flex gap-2">
              <NotificationsCard />
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
        <div className="w-full h-[100vh] flex">
          <div className="w-[300px] h-full flex flex-col gap-4 border-r py-4 pr-4 pb-20 overflow-auto pl-4 ">
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="uppercase font-semibold text-xs">Basic Charts</h4>
            </div>
            <div className="flex gap-2 w-full flex-wrap">
              {filteredChart.slice(0, 9).map((item) => (
                <Button
                  key={item.key}
                  variant={selectedChart === item.key ? 'secondary' : 'ghost'}
                  className="flex gap-2 flex-wrap items-center justify-start text-ls font-normal text-muted-foreground"
                  onClick={() => setSelectedChart(item.key)}>
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="uppercase font-semibold text-xs">Advanced Charts</h4>
            </div>
            <div className="flex gap-2 w-full flex-wrap">
              {filteredChart.slice(9).map((item) => (
                <Button
                  key={item.key}
                  variant={selectedChart === item.key ? 'secondary' : 'ghost'}
                  className="flex gap-2 flex-wrap items-center justify-start text-ls font-normal text-muted-foreground"
                  onClick={() => setSelectedChart(item.key)}>
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center h-full overflow-auto">
            <div className="flex-1 max-w-[900px] h-full p-4">
              <div className="border h-[60vh] rounded-[.4rem]">
                <Suspense fallback={<Loader />}>
                  <SelectedChartComponent />
                </Suspense>
                <div className="mt-4 flex gap-2">
                  <Button variant={'outline'}>
                    <Download size={16} />
                  </Button>
                  <Button variant={'outline'}>
                    <Printer size={16} />
                  </Button>
                </div>
                <div className="mt-4 flex flex-col gap-2 w-full pb-20">
                  <Textarea rows={6} placeholder="Take a note ..."></Textarea>
                  <Button variant={'secondary'} className="w-fit">
                    Add
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-[400px] h-full py-4">
              <SelectColumns />
              <Alert className="bg-cyan-50 dark:bg-cyan-800 mt-4">
                <ShieldQuestion className="h-4 w-4" />
                <AlertTitle className="uppercase">Comment</AlertTitle>
                {
                  <AlertDescription className="text-muted-foreground">
                    {comments.find((comment) => comment.key === selectedChart)?.description}
                  </AlertDescription>
                }
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualize;
