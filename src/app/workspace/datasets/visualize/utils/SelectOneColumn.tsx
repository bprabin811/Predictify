import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

interface SelectColumnsProps {
  dataset: any[];
  selectedColumn: (column: Column | null) => void;
}

const SelectOneColumn: React.FC<SelectColumnsProps> = ({ dataset, selectedColumn }) => {
  const [selectedColumnState, setSelectedColumnState] = useState<Column | null>(null);
  const [availableColumns, setAvailableColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (dataset.length > 0) {
      const columns = Object.keys(dataset[0]).map((key, index) => ({
        id: `col${index + 1}`,
        name: key,
      }));
      setAvailableColumns(columns);
    }
  }, [dataset]);

  const handleSelectColumn = (id: string) => {
    const selected = availableColumns.find((col) => col.id === id);
    if (selected) {
      setSelectedColumnState(selected);
      selectedColumn(selected);
    }
  };

  const handleRemoveColumn = () => {
    if (selectedColumnState) {
      selectedColumn(null); // Deselect the column
      setSelectedColumnState(null); // Clear selectedColumnState
    }
  };

  return (
    <div className="w-full border rounded-[.4rem] dark:bg-card">
      <CardHeader className="border-b py-3">
        <h2 className="font-semibold text-sm">SELECT COLUMN</h2>
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col gap-4 py-4">
        <div className="w-full flex flex-col gap-4">
          <div>
            <h2 className="uppercase font-semibold text-xs">Select Column</h2>
            <span className="text-xs text-muted-foreground">
              Select a column from the available options.
            </span>
          </div>
          {selectedColumnState && (
            <div className="w-full flex flex-wrap gap-2">
              <span
                key={selectedColumnState.id}
                className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
                {selectedColumnState.name}
                <X size={16} className="text-red-500 cursor-pointer" onClick={handleRemoveColumn} />
              </span>
            </div>
          )}
          {!selectedColumnState && (
            <Select onValueChange={handleSelectColumn}>
              <SelectTrigger className="w-full text-muted-foreground">
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

export default SelectOneColumn;
