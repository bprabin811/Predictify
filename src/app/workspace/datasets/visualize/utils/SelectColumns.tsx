import { useState } from 'react';
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

const initialColumns: Column[] = [
  { id: 'col1', name: 'Col1' },
  { id: 'col2', name: 'Col2' },
  { id: 'col3', name: 'Col3' },
];
const SelectColumns = () => {
  const [availableColumns, setAvailableColumns] = useState<Column[]>(initialColumns);
  const [selectedXColumns, setSelectedXColumns] = useState<Column[]>([]);
  const [selectedYColumns, setSelectedYColumns] = useState<Column[]>([]);

  const handleSelectColumn = (columnId: string, axis: 'x' | 'y') => {
    const column = availableColumns.find((col) => col.id === columnId);
    if (!column) return;

    if (axis === 'x') {
      setSelectedXColumns([...selectedXColumns, column]);
    } else {
      setSelectedYColumns([...selectedYColumns, column]);
    }
    setAvailableColumns(availableColumns.filter((col) => col.id !== columnId));
  };

  const handleRemoveColumn = (columnId: string, axis: 'x' | 'y') => {
    const column = (axis === 'x' ? selectedXColumns : selectedYColumns).find(
      (col) => col.id === columnId,
    );
    if (!column) return;

    setAvailableColumns([...availableColumns, column]);
    if (axis === 'x') {
      setSelectedXColumns(selectedXColumns.filter((col) => col.id !== columnId));
    } else {
      setSelectedYColumns(selectedYColumns.filter((col) => col.id !== columnId));
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
          <span className="text-xs text-muted-foreground">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <div className="w-full flex flex-wrap gap-2">
            {selectedXColumns.map((col) => (
              <span
                key={col.id}
                className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
                {col.name}
                <X
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemoveColumn(col.id, 'x')}
                />
              </span>
            ))}
          </div>
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
        </div>

        <div className="w-full flex flex-col gap-2">
          <h2 className="uppercase font-semibold text-xs">Y-axis</h2>
          <span className="text-xs text-muted-foreground">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </span>
          <div className="w-full flex flex-wrap gap-2">
            {selectedYColumns.map((col) => (
              <span
                key={col.id}
                className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
                {col.name}
                <X
                  size={16}
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemoveColumn(col.id, 'y')}
                />
              </span>
            ))}
          </div>
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
        </div>
      </CardContent>
    </div>
  );
};

export default SelectColumns;