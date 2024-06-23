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

// export function PieChart() {
//   const data = [
//     {
//       name: 'John',
//       age: 30,
//     },
//     {
//       name: 'John',
//       age: 50,
//     },
//     {
//       name: 'Jane',
//       age: 25,
//     },
//     {
//       name: 'Joe',
//       age: 40,
//     },
//   ];

//   const columnNames = Object.keys(data[0] || {});

//   // State to manage the selected column for the pie chart
//   const [selectedColumn, setSelectedColumn] = useState(columnNames[0]);

//   // Effect to log the selected column whenever it changes
//   useEffect(() => {
//     console.log(`Selected column for pie chart: ${selectedColumn}`);
//   }, [selectedColumn]);

//   const getSeries = () => {
//     if (!selectedColumn || data.some((item) => item[selectedColumn] === undefined)) {
//       console.error(`Invalid column selected: ${selectedColumn}`);
//       return [];
//     }

//     const uniqueValues = [...new Set(data.map((item) => item[selectedColumn]))];
//     const counts = uniqueValues.map((value) => ({
//       name: value,
//       y: data.filter((item) => item[selectedColumn] === value).length,
//     }));

//     return [
//       {
//         type: 'pie',
//         name: `${selectedColumn} (count)`,
//         data: counts,
//       },
//     ];
//   };

//   const darkThemeOptions = {
//     chart: {
//       type: 'pie',
//       backgroundColor: '#1f1f1f',
//       style: {
//         color: '#FFFFFF',
//       },
//     },
//     title: {
//       text: 'Pie Chart',
//       style: {
//         color: '#FFFFFF',
//       },
//     },
//     tooltip: {
//       style: {
//         color: '#FFFFFF',
//       },
//     },
//     plotOptions: {
//       pie: {
//         dataLabels: {
//           color: '#FFFFFF',
//         },
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
//         <CardTitle>Pie Chart</CardTitle>
//         <CardDescription>Select a column to display in the pie chart.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="mb-4">
//           <Select onValueChange={(value) => setSelectedColumn(value)}>
//             <SelectTrigger className="w-full bg-[#333333] text-white border-none">
//               <SelectValue placeholder="Select a Column" />
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

// export default PieChart;
