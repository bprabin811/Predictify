'use client';
import React, { useState, useMemo } from 'react';
import WorkSpaceLayout from '@/components/WorkspaceLayout';
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronRight,
  Search,
} from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';

// Dummy data
const dummyData = [
  {
    id: 1,
    address: '123 Maple St, Springfield, IL',
    price: 250000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1500,
    lot_size: '0.25 acres',
    year_built: 1995,
    status: 'For Sale',
    agent: 'Alice Johnson',
  },
  {
    id: 2,
    address: '456 Oak St, Springfield, IL',
    price: 320000,
    bedrooms: 4,
    bathrooms: 3,
    sq_ft: 2000,
    lot_size: '0.30 acres',
    year_built: 2000,
    status: 'For Sale',
    agent: 'Bob Smith',
  },
  {
    id: 3,
    address: '789 Pine St, Springfield, IL',
    price: 180000,
    bedrooms: 2,
    bathrooms: 1,
    sq_ft: 1200,
    lot_size: '0.20 acres',
    year_built: 1985,
    status: 'For Sale',
    agent: 'Carol Lee',
  },
  {
    id: 4,
    address: '101 Cedar St, Springfield, IL',
    price: 275000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1600,
    lot_size: '0.27 acres',
    year_built: 1998,
    status: 'For Sale',
    agent: 'David Brown',
  },
  {
    id: 5,
    address: '202 Birch St, Springfield, IL',
    price: 350000,
    bedrooms: 4,
    bathrooms: 3,
    sq_ft: 2100,
    lot_size: '0.35 acres',
    year_built: 2005,
    status: 'For Sale',
    agent: 'Emma Davis',
  },
  {
    id: 6,
    address: '303 Elm St, Springfield, IL',
    price: 260000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1550,
    lot_size: '0.26 acres',
    year_built: 1997,
    status: 'For Sale',
    agent: 'Frank Wilson',
  },
  {
    id: 7,
    address: '404 Walnut St, Springfield, IL',
    price: 290000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1700,
    lot_size: '0.28 acres',
    year_built: 2001,
    status: 'For Sale',
    agent: 'Grace Miller',
  },
  {
    id: 8,
    address: '505 Ash St, Springfield, IL',
    price: 240000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1450,
    lot_size: '0.24 acres',
    year_built: 1994,
    status: 'For Sale',
    agent: 'Hank Moore',
  },
  {
    id: 9,
    address: '606 Redwood St, Springfield, IL',
    price: 300000,
    bedrooms: 4,
    bathrooms: 3,
    sq_ft: 1900,
    lot_size: '0.29 acres',
    year_built: 2003,
    status: 'For Sale',
    agent: 'Ivy Clark',
  },
  {
    id: 10,
    address: '707 Cypress St, Springfield, IL',
    price: 270000,
    bedrooms: 3,
    bathrooms: 2,
    sq_ft: 1600,
    lot_size: '0.27 acres',
    year_built: 1999,
    status: 'For Sale',
    agent: 'Jack White',
  },
];

// Generate columns dynamically from data keys
const generateColumns = (data: any[]) => {
  if (!data || !data.length) return [];
  return Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
    cell: (info: any) => info.getValue(),
    enableSorting: true,
    enableFiltering: true,
  }));
};

const ViewDataTable = () => {
  const [data, setData] = useState(dummyData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(() => generateColumns(data), [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: 'auto',
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3" />
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
            placeholder="Search..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto ">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none py-3 ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-3 bg-transparent uppercase">
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() ? (
                            <button onClick={() => header.column.toggleSorting()} className="ml-2">
                              {header.column.getIsSorted() ? (
                                header.column.getIsSorted() === 'desc' ? (
                                  <ArrowDownWideNarrow size={16} />
                                ) : (
                                  <ArrowUpNarrowWide size={16} />
                                )
                              ) : (
                                <ArrowDownUp size={16} />
                              )}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-start py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDataTable;
