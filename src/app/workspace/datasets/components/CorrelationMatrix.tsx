import React, { useState, useEffect } from 'react';
import { calculateCorrelationMatrix } from './calculations';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import { dummyData as data } from './data';

const dummyData: Record<any, any>[] = data;

const CorrelationMatrix: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [correlationMatrix, setCorrelationMatrix] = useState<
    Record<string, Record<string, number>>
  >({});

  useEffect(() => {
    const numericColumns = Object.keys(dummyData[0])
      .filter((key) => typeof dummyData[0][key] === 'number')
      .filter((key) => key.toLowerCase() !== 'id'); 

    setSelectedColumns(numericColumns);

    const matrix = calculateCorrelationMatrix(dummyData, numericColumns);
    setCorrelationMatrix(matrix);
  }, []);

  const handleColumnSelect = (value: string) => {
    if (!selectedColumns.includes(value)) {
      const updatedColumns = [...selectedColumns, value];
      setSelectedColumns(updatedColumns);

      const matrix = calculateCorrelationMatrix(dummyData, updatedColumns);
      setCorrelationMatrix(matrix);
    }
  };

  const handleColumnRemove = (value: string) => {
    const updatedColumns = selectedColumns.filter((col) => col !== value);
    setSelectedColumns(updatedColumns);

    const matrix = calculateCorrelationMatrix(dummyData, updatedColumns);
    setCorrelationMatrix(matrix);
  };

  const getColorForValue = (value: number) => {
    if (Number.isNaN(value)) return 'bg-cyan-700';
    if (value >= 0.9) return 'bg-green-800';
    if (value >= 0.8) return 'bg-green-700';
    if (value >= 0.7) return 'bg-green-600';
    if (value >= 0.6) return 'bg-green-500';
    if (value >= 0.5) return 'bg-green-400';
    if (value >= 0.4) return 'bg-green-300';
    if (value >= 0.3) return 'bg-green-200';
    if (value >= 0.2) return 'bg-green-100';
    if (value >= 0.1) return 'bg-green-50';
    if (value >= 0) return 'bg-red-50';
    if (value >= -0.1) return 'bg-red-100';
    if (value >= -0.2) return 'bg-red-200';
    if (value >= -0.3) return 'bg-red-300';
    if (value >= -0.4) return 'bg-red-400';
    if (value >= -0.5) return 'bg-red-500';
    if (value >= -0.6) return 'bg-red-600';
    if (value >= -0.7) return 'bg-red-700';
    if (value >= -0.8) return 'bg-red-800';
    if (value >= -0.9) return 'bg-red-900';
    return 'bg-blue-500';
  };

  const renderTable = () => {
    if (selectedColumns.length === 0) return null;

    return (
      <table>
        <thead>
          <tr>
            <th></th>
            {selectedColumns.map((col) => (
              <th key={col} className="text-left text-xs uppercase font-normal px-4 pb-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedColumns.map((col1) => (
            <tr key={col1}>
              <td className="text-right pr-4 text-xs uppercase">{col1}</td>
              {selectedColumns.map((col2) => (
                <td
                  key={col2}
                  className={`border px-4 ${getColorForValue(
                    correlationMatrix[col1][col2],
                  )} bg-opacity-80 dark:text-black dark:bg-opacity-60`}>
                  {correlationMatrix[col1][col2].toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-wrap gap-2">
        {selectedColumns.map((col) => (
          <span
            key={col}
            className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
            {col}
            <X
              size={16}
              className="text-red-500 cursor-pointer"
              onClick={() => handleColumnRemove(col)}
            />
          </span>
        ))}
      </div>

      <Select onValueChange={handleColumnSelect} value="">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select columns" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(dummyData[0])
            .filter((col) => !selectedColumns.includes(col))
            .map((col) => (
              <SelectItem key={col} value={col}>
                {col}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {renderTable()}
    </div>
  );
};

export default CorrelationMatrix;
