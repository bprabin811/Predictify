'use client';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LineChart() {
  const data = [
    {
      name: 'John',
      age: 30,
    },
    {
      name: 'John',
      age: 50,
    },
    {
      name: 'Jane',
      age: 25,
    },
    {
      name: 'Joe',
      age: 40,
    },
  ];

  const columnNames = Object.keys(data[0] || {});

  // State to manage the selected column for the line chart
  const [selectedColumnLine, setSelectedColumnLine] = useState(columnNames[0]);

  // Effect to log the selected column whenever it changes
  useEffect(() => {
    console.log(`Selected column for line chart: ${selectedColumnLine}`);
  }, [selectedColumnLine]);

  const getSeries = (column) => {
    if (!column || data.some((item) => item[column] === undefined)) {
      console.error(`Invalid column selected: ${column}`);
      return [];
    }

    const uniqueValues = [...new Set(data.map((item) => item[column]))];
    const counts = uniqueValues.map((value) => ({
      name: value,
      y: data.filter((item) => item[column] === value).length,
    }));

    return [
      {
        type: 'line',
        name: `${column} (count)`,
        data: counts,
      },
    ];
  };

  const xAxisCategories = data.map((item) => item[selectedColumnLine]);

  const darkThemeOptions = {
    chart: {
      type: 'line',
      backgroundColor: '#1f1f1f',
      style: {
        color: '#FFFFFF',
      },
    },
    title: {
      text: 'Line Chart',
      style: {
        color: '#FFFFFF',
      },
    },
    xAxis: {
      categories: xAxisCategories,
      title: {
        text: selectedColumnLine,
        style: {
          color: '#FFFFFF',
        },
      },
      labels: {
        style: {
          color: '#FFFFFF',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Value',
        style: {
          color: '#FFFFFF',
        },
      },
      labels: {
        style: {
          color: '#FFFFFF',
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#FFFFFF',
      },
    },
    credits: {
      enabled: false,
    },
    series: getSeries(selectedColumnLine),
  };

  return (
    <Card className="border-none shadow-none bg-[#1F1F1F] text-white">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Select a column to display in the line chart.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(value) => setSelectedColumnLine(value)}>
            <SelectTrigger className="w-full bg-[#333333] text-white border-none">
              <SelectValue placeholder="Select a Column" />
            </SelectTrigger>
            <SelectContent className="bg-[#333333] text-white border-none">
              <SelectGroup>
                <SelectLabel className="text-gray-300">Columns</SelectLabel>
                {columnNames.map((column) => (
                  <SelectItem key={column} value={column} className="text-white">
                    {column}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <HighchartsReact highcharts={Highcharts} options={darkThemeOptions} />
      </CardContent>
    </Card>
  );
}

export default LineChart;
