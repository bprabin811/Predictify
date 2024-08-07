'use client';
import React, { useState, useMemo } from 'react';
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

const ViewDataTable = ({ dataset }: any) => {
  const [data, setData] = useState(dataset);
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
                    <TableHead key={header.id} className="p-3 bg-secondary text-14 w-fit text-nowrap">
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
                  className="cursor-pointer ">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-start p-3 text-12 w-fit">
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
          {/* {table.getFilteredSelectedRowModel().rows.length} of{' '} */}
          {table.getFilteredRowModel().rows.length} row(s)
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
