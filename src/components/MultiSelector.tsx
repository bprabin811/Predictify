import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';

interface MultiSelectorProps {
  options: any[];
  isMultiple?: boolean;
  onSelected: (value: any) => void;
}

const MultiSelector: React.FC<MultiSelectorProps> = ({ options, isMultiple, onSelected }) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Remove selected option from options list
  const filteredOptions = options.filter((option) => !selectedColumns.includes(option));

  const handleColumnSelect = (value: string) => {
    if (!selectedColumns.includes(value)) {
      const updatedColumns = isMultiple ? [...selectedColumns, value] : [value];
      setSelectedColumns(updatedColumns);
      onSelected(updatedColumns);
    }
  };

  const handleColumnRemove = (value: string) => {
    const updatedColumns = selectedColumns.filter((col) => col !== value);
    setSelectedColumns(updatedColumns);
    onSelected(updatedColumns);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-wrap gap-2">
        {selectedColumns.map((item) => (
          <span
            key={item}
            className="bg-gray-100 dark:bg-gray-900 py-2 px-4 rounded-md flex gap-2 items-center">
            {item}
            <X
              size={16}
              className="text-red-500 cursor-pointer"
              onClick={() => handleColumnRemove(item)}
            />
          </span>
        ))}
      </div>
      <Select onValueChange={handleColumnSelect} value="">
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select options" />
        </SelectTrigger>
        <SelectContent>
          {filteredOptions.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultiSelector;
