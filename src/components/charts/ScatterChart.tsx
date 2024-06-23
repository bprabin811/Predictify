// import React, { useEffect, useState } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// export function ScatterChart() {
//   const data = [
//     {
//       a: 2,
//       b: 6,
//       c: 9,
//       d: 0.6,
//     },
//     {
//       a: 3,
//       b: 7,
//       c: 10,
//       d: 0.7,
//     },
//   ];
//   const columnNames = Object.keys(data[0] || {});

//   // State to manage the selected columns for the scatter plot
//   const [selectedXColumn, setSelectedXColumn] = useState(columnNames[0]);
//   const [selectedYColumn, setSelectedYColumn] = useState(columnNames[1]);

//   // Effect to log the selected columns whenever they change
//   useEffect(() => {
//     console.log(`Selected X column for scatter plot: ${selectedXColumn}`);
//     console.log(`Selected Y column for scatter plot: ${selectedYColumn}`);
//   }, [selectedXColumn, selectedYColumn]);

//   const getSeries = () => {
//     if (
//       !selectedXColumn ||
//       !selectedYColumn ||
//       data.some(
//         (item) => item[selectedXColumn] === undefined || item[selectedYColumn] === undefined,
//       )
//     ) {
//       console.error('Invalid columns selected');
//       return [];
//     }

//     const seriesData = data.map((item) => ({
//       x: parseFloat(item[selectedXColumn]),
//       y: parseFloat(item[selectedYColumn]),
//       name: `${item[selectedXColumn]}, ${item[selectedYColumn]}`,
//     }));

//     return [
//       {
//         type: 'scatter',
//         name: 'Data',
//         data: seriesData,
//       },
//     ];
//   };

//   const darkThemeOptions = {
//     chart: {
//       type: 'scatter',
//       backgroundColor: '#1f1f1f',
//       style: {
//         color: '#FFFFFF',
//       },
//     },
//     title: {
//       text: 'Scatter Plot',
//       style: {
//         color: '#FFFFFF',
//       },
//     },
//     xAxis: {
//       title: {
//         text: selectedXColumn,
//         style: {
//           color: '#FFFFFF',
//         },
//       },
//       labels: {
//         style: {
//           color: '#FFFFFF',
//         },
//       },
//     },
//     yAxis: {
//       title: {
//         text: selectedYColumn,
//         style: {
//           color: '#FFFFFF',
//         },
//       },
//       labels: {
//         style: {
//           color: '#FFFFFF',
//         },
//       },
//     },
//     legend: {
//       itemStyle: {
//         color: '#FFFFFF',
//       },
//     },
//     credits: {
//       enabled: false,
//     },
//     series: getSeries(),
//   };

//   return (
//     <Card className="border-none shadow-none bg-[#1F1F1F] text-white">
//       <CardHeader>
//         <CardTitle>Scatter Plot</CardTitle>
//         <CardDescription>Select columns for the scatter plot.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-4 flex gap-4">
//           <Select onValueChange={(value) => setSelectedXColumn(value)}>
//             <SelectTrigger className="w-full bg-[#333333] text-white border-none">
//               <SelectValue placeholder="X-Axis" />
//             </SelectTrigger>
//             <SelectContent className="bg-[#333333] text-white border-none">
//               <SelectGroup>
//                 <SelectLabel className="text-gray-300">Columns</SelectLabel>
//                 {columnNames.map((column) => (
//                   <SelectItem key={column} value={column} className="text-white">
//                     {column}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           <Select onValueChange={(value) => setSelectedYColumn(value)}>
//             <SelectTrigger className="w-full bg-[#333333] text-white border-none">
//               <SelectValue placeholder="Y-Axis" />
//             </SelectTrigger>
//             <SelectContent className="bg-[#333333] text-white border-none">
//               <SelectGroup>
//                 <SelectLabel className="text-gray-300">Columns</SelectLabel>
//                 {columnNames.map((column) => (
//                   <SelectItem key={column} value={column} className="text-white">
//                     {column}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//         <HighchartsReact highcharts={Highcharts} options={darkThemeOptions} />
//       </CardContent>
//     </Card>
//   );
// }

// export default ScatterChart;
