import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface Column {
  id: string;
  name: string;
}

interface SelectOneColumnForXAndYProps {
  data: Record<string, any>[];
  selectedColumns: (columns: { x: Column | null; y: Column | null }) => void; // Callback function
}

const SelectOneColumnForXAndY = ({ data, selectedColumns }: SelectOneColumnForXAndYProps) => {
  const [availableColumns, setAvailableColumns] = useState<Column[]>([]);
  const [selectedXColumn, setSelectedXColumn] = useState<Column | null>(null);
  const [selectedYColumn, setSelectedYColumn] = useState<Column | null>(null);

  useEffect(() => {
    if (data.length > 0) {
      const columns = Object.keys(data[0]).map((key) => ({
        id: key,
        name: key,
      }));
      setAvailableColumns(columns);
    }
  }, [data]);

  useEffect(() => {
    selectedColumns({ x: selectedXColumn, y: selectedYColumn });
  }, [selectedXColumn, selectedYColumn, selectedColumns]);

  const handleSelectColumn = (columnId: string, axis: 'x' | 'y') => {
    const column = availableColumns.find((col) => col.id === columnId);
    if (!column) return;

    if (axis === 'x') {
      setSelectedXColumn(column);
    } else {
      setSelectedYColumn(column);
    }

    setAvailableColumns(availableColumns.filter((col) => col.id !== columnId));
  };

  const handleRemoveColumn = (axis: 'x' | 'y') => {
    if (axis === 'x' && selectedXColumn) {
      setAvailableColumns([...availableColumns, selectedXColumn]);
      setSelectedXColumn(null);
    } else if (axis === 'y' && selectedYColumn) {
      setAvailableColumns([...availableColumns, selectedYColumn]);
      setSelectedYColumn(null);
    }
  };

  return (
    <div className="w-full border rounded-[.4rem] dark:bg-[#111]">
      <CardHeader className="border-b">
        <h2 className="font-normal">SELECT COLUMNS</h2>
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col gap-4 py-4">
        <div className="w-full flex flex-col gap-2">
          <h2 className="uppercase font-semibold text-xs">X-axis</h2>
          <span className="text-xs text-muted-foreground">Select a column for the X-axis.</span>
          <div className="w-full flex flex-wrap gap-2">
            {selectedXColumn && (
              <span className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
                {selectedXColumn.name}
                <X
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemoveColumn('x')}
                />
              </span>
            )}
          </div>
          {!selectedXColumn && (
            <Select onValueChange={(value) => handleSelectColumn(value, 'x')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Columns" />
              </SelectTrigger>
              <SelectContent>
                {availableColumns.map((col) => (
                  <SelectItem key={col.id} value={col.id}>
                    {col.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="w-full flex flex-col gap-2">
          <h2 className="uppercase font-semibold text-xs">Y-axis</h2>
          <span className="text-xs text-muted-foreground">Select a column for the Y-axis.</span>
          <div className="w-full flex flex-wrap gap-2">
            {selectedYColumn && (
              <span className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
                {selectedYColumn.name}
                <X
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemoveColumn('y')}
                />
              </span>
            )}
          </div>
          {!selectedYColumn && (
            <Select onValueChange={(value) => handleSelectColumn(value, 'y')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Columns" />
              </SelectTrigger>
              <SelectContent>
                {availableColumns.map((col) => (
                  <SelectItem key={col.id} value={col.id}>
                    {col.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default SelectOneColumnForXAndY;
