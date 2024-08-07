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

interface CorrelationMatrixProps {
  dataset: any;
}

const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ dataset }: any) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [correlationMatrix, setCorrelationMatrix] = useState<
    Record<string, Record<string, number>>
  >({});

  useEffect(() => {
    if (!dataset || dataset.length === 0) {
      return;
    }

    const numericColumns = Object.keys(dataset[0])
      .filter((key) => typeof dataset[0][key] === 'number')
      .filter((key) => key.toLowerCase() !== 'id');

    setSelectedColumns(numericColumns);

    const matrix = calculateCorrelationMatrix(dataset, numericColumns);
    setCorrelationMatrix(matrix);
  }, [dataset]);

  const handleColumnSelect = (value: string) => {
    if (!selectedColumns.includes(value)) {
      const updatedColumns = [...selectedColumns, value];
      setSelectedColumns(updatedColumns);

      const matrix = calculateCorrelationMatrix(dataset, updatedColumns);
      setCorrelationMatrix(matrix);
    }
  };

  const handleColumnRemove = (value: string) => {
    const updatedColumns = selectedColumns.filter((col) => col !== value);
    setSelectedColumns(updatedColumns);

    const matrix = calculateCorrelationMatrix(dataset, updatedColumns);
    setCorrelationMatrix(matrix);
  };

  const getColorForValue = (value: number) => {
    if (Number.isNaN(value)) return 'bg-yellow-700/20';
    if (value === 1) return 'bg-teal-900/20';
    if (value >= 0.95) return 'bg-green-800/20';
    if (value >= 0.9) return 'bg-green-700/20';
    if (value >= 0.85) return 'bg-green-600/20';
    if (value >= 0.8) return 'bg-green-500/20';
    if (value >= 0.75) return 'bg-green-400/20';
    if (value >= 0.7) return 'bg-green-300/20';
    if (value >= 0.65) return 'bg-green-200/20';
    if (value >= 0.6) return 'bg-green-100/20';
    if (value >= 0.55) return 'bg-green-950/20';
    if (value >= 0.5) return 'bg-cyan-900/20';
    if (value >= 0.45) return 'bg-cyan-800/20';
    if (value >= 0.4) return 'bg-cyan-700/20';
    if (value >= 0.35) return 'bg-cyan-600/20';
    if (value >= 0.3) return 'bg-cyan-500/20';
    if (value >= 0.25) return 'bg-cyan-400/20';
    if (value >= 0.2) return 'bg-cyan-300/20';
    if (value >= 0.15) return 'bg-cyan-200/20';
    if (value >= 0.1) return 'bg-cyan-100/20';
    if (value >= 0.05) return 'bg-cyan-50/20';
    if (value >= 0) return 'bg-orange-50/20';
    if (value >= -0.05) return 'bg-orange-100/20';
    if (value >= -0.1) return 'bg-orange-200/20';
    if (value >= -0.15) return 'bg-orange-300/20';
    if (value >= -0.2) return 'bg-orange-400/20';
    if (value >= -0.25) return 'bg-orange-500/20';
    if (value >= -0.3) return 'bg-orange-600/20';
    if (value >= -0.35) return 'bg-orange-700/20';
    if (value >= -0.4) return 'bg-orange-800/20';
    if (value >= -0.45) return 'bg-orange-900/20';
    if (value >= -0.5) return 'bg-red-100/20';
    if (value >= -0.55) return 'bg-red-200/20';
    if (value >= -0.6) return 'bg-red-300/20';
    if (value >= -0.65) return 'bg-red-400/20';
    if (value >= -0.7) return 'bg-red-500/20';
    if (value >= -0.75) return 'bg-red-600/20';
    if (value >= -0.8) return 'bg-red-700/20';
    if (value >= -0.85) return 'bg-red-800/20';
    if (value >= -0.9) return 'bg-red-900/20';
    if (value >= -1) return 'bg-red-950/20';
    return 'bg-blue-500/20';
  };

  const renderTable = () => {
    if (selectedColumns.length === 0) return null;

    return (
      <div className="w-full overflow-auto tex-14">
        <table>
          <thead>
            <tr>
              <th className="bg-card sticky left-0 z-10 border-t border-l"></th>
              {selectedColumns.map((col, index) => (
                <th
                  key={index}
                  className="text-right text-xs uppercase font-normal px-4 py-4 border-b bg-card border-x border-t">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedColumns.map((col1, index) => (
              <tr key={index}>
                <td className="text-right text-12 uppercase px-4 border-r sticky left-0 bg-card z-10 border-l border-y">
                  {col1}
                </td>
                {selectedColumns.map((col2, index) => (
                  <td
                    key={index}
                    className={`px-8 py-4 text-start
                    ${getColorForValue(
                      correlationMatrix[col1][col2],
                    )} text-12  text-primary border-b border-r hover:shadow-xl hover:scale-[110%] cursor-pointer`}>
                    {correlationMatrix[col1][col2].toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-wrap gap-2">
        {selectedColumns.map((col, index) => (
          <span
            key={index}
            className="bg-secondary py-2 px-4 rounded-md flex gap-2 items-center text-12 font-semibold">
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
        <SelectTrigger className="w-[30%] mb-4">
          <SelectValue placeholder="Select columns" />
        </SelectTrigger>
        <SelectContent>
          {dataset.length > 0 ? (
            Object.keys(dataset[0])
              .filter((col) => !selectedColumns.includes(col))
              .map((col, index) => (
                <SelectItem key={index} value={col}>
                  {col}
                </SelectItem>
              ))
          ) : (
            <SelectItem value="">No columns available</SelectItem>
          )}
        </SelectContent>
      </Select>
      {renderTable()}
    </div>
  );
};

export default CorrelationMatrix;
