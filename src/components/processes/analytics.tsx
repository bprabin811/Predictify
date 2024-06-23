// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import WorkSpaceLayout from '@/components/WorkspaceLayout';
// import { BarChart } from '@/components/charts/BarChart';
// import { LineChart } from '@/components/charts/LineChart';
// import { PieChart } from '@/components/charts/PieChart';
// import { ScatterChart } from '@/components/charts/ScatterChart';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { HistogramChart } from '@/components/charts/Histogram';
// import Chip from '../chip';
// import { Settings } from 'lucide-react';
// import { MagicWandIcon } from '@radix-ui/react-icons';
// import { Button } from '../ui/button';

// export function DataAnalytics() {
//   const [activeTab, setActiveTab] = useState('raw');
//   const [selectedCharts, setSelectedCharts] = useState(['Bar Chart']);

//   const charts = useMemo(
//     () => ({
//       raw: [
//         { name: 'Bar Chart', component: BarChart },
//         { name: 'Line Chart', component: LineChart },
//         { name: 'Pie Chart', component: PieChart },
//       ],
//       encoded: [
//         { name: 'Scatter Chart', component: ScatterChart },
//         { name: 'Histogram Chart', component: HistogramChart },
//       ],
//     }),
//     [],
//   );

//   useEffect(() => {
//     setSelectedCharts([charts[activeTab][0].name]);
//   }, [activeTab, charts]);

//   const handleChartSelection = (chartName) => {
//     setSelectedCharts((prevSelectedCharts) =>
//       prevSelectedCharts.includes(chartName)
//         ? prevSelectedCharts.filter((name) => name !== chartName)
//         : [...prevSelectedCharts, chartName],
//     );
//   };

//   return (
//     <main className="w-full flex">
//       <aside className="w-1/5 h-[80vh] border-r border-r-[#ccc] p-4 flex flex-col justify-between">
//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList className="w-full grid grid-cols-2">
//             <TabsTrigger value="raw">Basic</TabsTrigger>
//             <TabsTrigger value="encoded">Advanced</TabsTrigger>
//           </TabsList>
//           <TabsContent value={activeTab} id={`${activeTab}-data`}>
//             <div className="flex flex-col space-y-2">
//               {charts[activeTab].map((chart) => (
//                 <Chip
//                   key={chart.name}
//                   label={chart.name}
//                   selected={selectedCharts.includes(chart.name)}
//                   onClick={() => handleChartSelection(chart.name)}
//                 />
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//         <Button
//           variant={'outline'}
//           className="p-2 flex items-center justify-start gap-4 cursor-pointer">
//           <MagicWandIcon size={16} />
//           <h2>Generate Chart</h2>
//         </Button>
//       </aside>
//       <ScrollArea className="w-4/5 h-[80vh] p-5">
//         <div className="grid grid-cols-2 gap-4">
//           {selectedCharts.map((chartName) => {
//             const ChartComponent = (
//               charts.raw.concat(charts.encoded).find((chart) => chart.name === chartName) || {}
//             ).component;
//             return (<ChartComponent key={chartName} />) as JSX.Element;
//           })}
//         </div>
//       </ScrollArea>
//     </main>
//   );
// }

// export default DataAnalytics;
