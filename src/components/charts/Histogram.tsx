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

export function HistogramChart() {
  const data = [
    {
      a: 2,
      b: 6,
      c: 9,
      d: 0.6,
    },
    {
      a: 3,
      b: 7,
      c: 10,
      d: 0.7,
    },
  ];
  const columnNames = Object.keys(data[0] || {});

  const [selectedColumn, setSelectedColumn] = useState(columnNames[0]);

  useEffect(() => {
    console.log(`Selected column for histogram: ${selectedColumn}`);
  }, [selectedColumn]);

  const getSeries = () => {
    if (!selectedColumn || data.some((item) => item[selectedColumn] === undefined)) {
      console.error('Invalid column selected');
      return [];
    }

    const values = data
      .map((item) => parseFloat(item[selectedColumn]))
      .filter((value) => !isNaN(value));

    const bins = 10; // Number of bins for the histogram
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binWidth = (max - min) / bins;

    const histogramData = Array(bins).fill(0);

    values.forEach((value) => {
      const binIndex = Math.floor((value - min) / binWidth);
      if (binIndex >= 0 && binIndex < bins) {
        histogramData[binIndex] += 1;
      } else if (binIndex === bins) {
        histogramData[binIndex - 1] += 1;
      }
    });

    const histogramSeries = histogramData.map((count, index) => [
      min + index * binWidth + binWidth / 2,
      count,
    ]);

    return [
      {
        name: `${selectedColumn} histogram`,
        type: 'column',
        data: histogramSeries,
        pointPadding: 0,
        groupPadding: 0,
        borderWidth: 1,
        shadow: false,
      },
    ];
  };

  const darkThemeOptions = {
    chart: {
      type: 'column',
      backgroundColor: '#1f1f1f',
      style: {
        color: '#FFFFFF',
      },
    },
    title: {
      text: 'Histogram Chart',
      style: {
        color: '#FFFFFF',
      },
    },
    xAxis: {
      title: {
        text: selectedColumn,
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
        text: 'Frequency',
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
    series: getSeries(),
  };

  return (
    <Card className="border-none shadow-none bg-[#1F1F1F] text-white">
      <CardHeader>
        <CardTitle>Histogram Chart</CardTitle>
        <CardDescription>Select a column to display in the histogram.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select onValueChange={(value) => setSelectedColumn(value)}>
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

export default HistogramChart;
