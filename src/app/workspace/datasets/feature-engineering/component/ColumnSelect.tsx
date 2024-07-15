'use client';
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
import { Checkbox } from '@/components/ui/checkbox';

interface Column {
  id: string;
  name: string;
}

interface SelectColumnsProps {
  dataset: any[];
  selectedColumns: (columns: Column[]) => void; // Callback function
}

const SelectColumnsComponent: React.FC<SelectColumnsProps> = ({ dataset, selectedColumns }) => {
  const [selectedXColumns, setSelectedXColumns] = useState<Column[]>([]);
  const [availableColumns, setAvailableColumns] = useState<Column[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Ensure dataset is available and columns are initialized correctly
  useEffect(() => {
    if (dataset.length > 0) {
      const columns = Object.keys(dataset[0]).map((key, index) => ({
        id: `col${index + 1}`,
        name: key,
      }));
      setAvailableColumns(columns);
    }
  }, [dataset]);

  // Update formik and parent component when selected columns change
  useEffect(() => {
    selectedColumns(selectedXColumns); // Call the callback function whenever selectedXColumns changes
    formik.setFieldValue('columns', selectedXColumns);
  }, [selectedXColumns, selectedColumns]);

  const formik = useFormik({
    initialValues: {
      columns: [],
    },
    validationSchema: Yup.object({
      columns: Yup.array().min(1, 'At least one column must be selected'),
    }),
    onSubmit: (values) => {
      selectedColumns(selectedXColumns);
    },
  });

  const handleSelectColumn = (id: string) => {
    const selectedColumn = availableColumns.find((col) => col.id === id);
    if (selectedColumn) {
      const newSelectedColumns = [...selectedXColumns, selectedColumn];
      setSelectedXColumns(newSelectedColumns);
      setAvailableColumns(availableColumns.filter((col) => col.id !== id));
    }
  };

  const handleRemoveColumn = (id: string) => {
    const removedColumn = selectedXColumns.find((col) => col.id === id);
    if (removedColumn) {
      const newSelectedColumns = selectedXColumns.filter((col) => col.id !== id);
      setSelectedXColumns(newSelectedColumns);
      setAvailableColumns([...availableColumns, removedColumn]);
    }
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedXColumns(availableColumns);
      setAvailableColumns([]);
    } else {
      setAvailableColumns([...availableColumns, ...selectedXColumns]);
      setSelectedXColumns([]);
    }
    setSelectAll(!selectAll);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full border rounded-[.4rem] dark:bg-card">
      <CardHeader className="border-b py-3">
        <h2 className="font-semibold text-sm">SELECT COLUMNS</h2>
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col gap-4 py-4">
        <div className="w-full flex flex-col gap-4">
          <div>
            <h2 className="uppercase font-semibold text-xs">Select Columns</h2>
            <span className="text-xs text-muted-foreground">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </div>
          {selectedXColumns.length > 0 && (
            <div className="w-full flex flex-wrap gap-2">
              {selectedXColumns.map((col) => (
                <span
                  key={col.id}
                  className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
                  {col.name}
                  <X
                    size={16}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleRemoveColumn(col.id)}
                  />
                </span>
              ))}
            </div>
          )}
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
          {formik.touched.columns && formik.errors.columns ? (
            <div className="text-red-500 text-xs">{formik.errors.columns}</div>
          ) : null}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="selectall"
              name="selectAll"
              onCheckedChange={handleSelectAll}
              checked={selectAll}
            />
            <label htmlFor="selectall" className="text-sm font-medium leading-none">
              Select all columns
            </label>
          </div>
        </div>
      </CardContent>
    </form>
  );
};

export default SelectColumnsComponent;
