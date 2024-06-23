// 'use client';
// import WorkSpaceLayout from '@/components/WorkspaceLayout';

// import * as React from 'react';
// import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   FilterFn,
// } from '@tanstack/react-table';
// import Papa from 'papaparse';
// import * as XLSX from 'xlsx';

// import { Button, buttonVariants } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Separator } from '@/components/ui/separator';
// import useDatasetStore from '@/store/dataset/DatasetStore';

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
// import Link from 'next/link';
// import { ChevronRight } from 'lucide-react';

// // Function to generate columns dynamically
// const generateColumns = (data) => {
//   if (data.length === 0) return [];
//   const keys = Object.keys(data[0]);

//   return keys.map((key) => ({
//     accessorKey: key,
//     header: ({ column }) => (
//       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
//         {key.charAt(0).toUpperCase() + key.slice(1)}
//         <CaretSortIcon className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div>{row.getValue(key)}</div>,
//   }));
// };

// const globalFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
//   return row.original[columnId]?.toString().toLowerCase().includes(filterValue.toLowerCase());
// };

// export function ImportData() {
//   const {
//     isLoading,
//     fetchRecentDataset,
//     activeId,
//     isActive,
//     fetchActiveDataset,
//     tableDatas,
//     createDataset,
//   } = useDatasetStore();
//   const [data, setData] = React.useState([]);
//   const [globalFilter, setGlobalFilter] = React.useState('');
//   const columns = React.useMemo(() => generateColumns(data), [data]);

//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [fileName, setFileName] = React.useState('');
//   const [isUpload, setisUpload] = React.useState(false);
//   const [desc, setDesc] = React.useState('');

//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   React.useEffect(() => {
//     if (isActive) {
//       fetchActiveDataset(token, userId, 1);
//     } else {
//       fetchRecentDataset(token, userId, 1);
//     }
//   }, [isActive, token, userId, fetchActiveDataset, fetchRecentDataset]);

//   React.useEffect(() => {
//     setData(tableDatas);
//     setisUpload(false);
//   }, [tableDatas]);

//   const handlePostData = () => {
//     const formData = {
//       dataset_name: fileName,
//       description: desc,
//       content: data,
//     };
//     createDataset(token, userId, 1, formData);
//   };

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//       globalFilter,
//     },
//     globalFilterFn,
//   });

//   return (
//     <WorkSpaceLayout>
//       <div className="max-w-[80vw]">
//         <div className="w-full p-5 flex items-center justify-between">
//           {/* Upload data here */}
//           <div className="grid w-full max-w-sm items-center gap-3">
//             <label htmlFor="file" className="text-lg font-semibold text-gray-700">
//               Select File
//             </label>

//           </div>
//           {data.length > 0 && isUpload ? (
//             <div>
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button variant="outline">Upload Data</Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px]">
//                   <DialogHeader>
//                     <DialogTitle>Upload Dataset</DialogTitle>
//                     <DialogDescription>
//                       Make changes to your dataset here. Click save when you're done.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="flex flex-col items-start gap-4">
//                       <Label htmlFor="name" className="text-right">
//                         Filename
//                       </Label>
//                       <Input id="name" value={fileName || ''} className="col-span-3" />
//                     </div>
//                     <div className="flex flex-col items-start gap-4">
//                       <Label htmlFor="username" className="text-right">
//                         Description
//                       </Label>
//                       <Textarea
//                         placeholder="Type your message here."
//                         className="col-span-3"
//                         onChange={(e) => setDesc(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button type="submit" onClick={handlePostData}>
//                       Save changes
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           ) : data.length > 0 ? (
//             <Link
//               href="/workspace/analytics"
//               className={buttonVariants({
//                 size: 'sm',
//                 className: 'hidden sm:flex items-center gap-1',
//               })}>
//               View Analytics
//               <ChevronRight className="ml-1.5 h-5 w-5" />
//             </Link>
//           ) : (
//             ''
//           )}
//         </div>
//         <Separator className="max-w-[60vw] m-5" />
//         <div className="w-full p-5">
//           {/* <div className="flex items-center py-4">
//             <Input
//               placeholder="Search..."
//               value={globalFilter ?? ''}
//               onChange={(event) => setGlobalFilter(event.target.value)}
//               className="max-w-sm"
//             />
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="ml-auto">
//                   Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 {table
//                   .getAllColumns()
//                   .filter((column) => column.getCanHide())
//                   .map((column) => {
//                     return (
//                       <DropdownMenuCheckboxItem
//                         key={column.id}
//                         className="capitalize"
//                         checked={column.getIsVisible()}
//                         onCheckedChange={(value) => column.toggleVisibility(!!value)}>
//                         {column.id}
//                       </DropdownMenuCheckboxItem>
//                     );
//                   })}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div> */}
//           {/* <div className="rounded-md border overflow-x-auto">
//             <Table className="min-w-full">
//               <TableHeader>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => {
//                       return (
//                         <TableHead key={header.id} className="py-3">
//                           {header.isPlaceholder
//                             ? null
//                             : flexRender(header.column.columnDef.header, header.getContext())}
//                         </TableHead>
//                       );
//                     })}
//                   </TableRow>
//                 ))}
//               </TableHeader>
//               <TableBody>
//                 {table.getRowModel().rows?.length ? (
//                   table.getRowModel().rows.map((row) => (
//                     <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
//                       {row.getVisibleCells().map((cell) => (
//                         <TableCell key={cell.id} className="text-start py-3">
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} className="h-24 text-center">
//                       No results.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div> */}
//           {/* <div className="flex items-center justify-end space-x-2 py-4">
//             <div className="flex-1 text-sm text-muted-foreground">
//               {table.getFilteredSelectedRowModel().rows.length} of{' '}
//               {table.getFilteredRowModel().rows.length} row(s) selected.
//             </div>
//             <div className="space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}>
//                 Previous
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}>
//                 Next
//               </Button>
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </WorkSpaceLayout>
//   );
// }

// export default ImportData;
