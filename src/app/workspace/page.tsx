'use client';
import React, { useEffect, useState } from 'react';
import WorkSpaceLayout from '@/components/WorkspaceLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Search, Upload, MoreHorizontal, Settings2, FilePenLine, Trash, Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, usePathname } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Chip from '@/components/chip';

const invoices = [
  {
    id: 1,
    filename: 'covid_data.csv',
    uploaded_at: 'May 23, 2024',
    status: 'Untrained',
    comments: 'This a data of covid 19.',
    author: 'Prabin Bhatt',
  },
  {
    id: 2,
    filename: 'population.csv',
    uploaded_at: 'May 11, 2024',
    status: 'Trained',
    comments: 'This a population of Nepal.',
    author: 'Prabin Bhatt',
  },
  {
    id: 3,
    filename: 'covid_data.csv',
    uploaded_at: 'May 23, 2024',
    status: 'Trained',
    comments: 'This a data of covid 19.',
    author: 'Prabin Bhatt',
  },
  {
    id: 4,
    filename: 'population.csv',
    uploaded_at: 'May 11, 2024',
    status: 'Trained',
    comments: 'This a population of Nepal.',
    author: 'Prabin Bhatt',
  },
  {
    id: 5,
    filename: 'covid_data.csv',
    uploaded_at: 'May 23, 2024',
    status: 'Trained',
    comments: 'This a data of covid 19.',
    author: 'Prabin Bhatt',
  },
];

const validationSchema = Yup.object({
  comments: Yup.string().required('Comments are required'),
  file: Yup.mixed().required('A file is required'),
});

const FileUploadForm = ({ formik, fileName, handleFileUpload }: any) => (
  <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
    <div className="flex flex-col w-full max-w-sm items-start space-x-2">
      <label className="flex flex-col items-center justify-center w-full h-20 px-4 transition  border-2 border-dashed border-[#4a4b4a] rounded-lg cursor-pointer hover:border-gray-400 focus:outline-none">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-8 h-8  group-hover:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V8a4 4 0 014-4h4m4 4v8a4 4 0 01-4 4H7a4 4 0 01-4-4V8a4 4 0 014-4h4"></path>
          </svg>
          <p className="text-sm  group-hover:text-gray-700">
            {fileName ? `Selected file: ${fileName}` : 'Drag your file here or click to upload'}
          </p>
        </div>
        <input id="file" type="file" className="hidden" onChange={handleFileUpload} />
      </label>
      {formik.errors.file && formik.touched.file ? (
        <div className="text-red-500 text-sm">{formik.errors.file}</div>
      ) : null}
    </div>
    <div className="flex flex-col items-start gap-4">
      <Label htmlFor="name" className="text-right">
        Filename
      </Label>
      <Input id="name" value={fileName} className="col-span-3  border border-[#4a4b4a] " readOnly />
    </div>
    <div className="flex flex-col items-start gap-4">
      <Label htmlFor="comments" className="text-right">
        Comments
      </Label>
      <Textarea
        id="comments"
        placeholder="Type your message here."
        className="col-span-3 resize-none  border border-[#4a4b4a] "
        {...formik.getFieldProps('comments')}
      />
      {formik.errors.comments && formik.touched.comments ? (
        <div className="text-red-500 text-sm">{formik.errors.comments}</div>
      ) : null}
    </div>
    <DialogFooter>
      <Button type="submit" disabled={!formik.isValid} className="bg-[#4a4b4a]">
        Save Changes
      </Button>
    </DialogFooter>
  </form>
);

export function UserDashboard() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [filter, setFilter] = useState('All');

  const router = useRouter();

  const pathname = usePathname();
  const query = new URLSearchParams(window.location.search);
  const workspaceParam = query.get('wsn');

  const [workspace, setWorkspace] = useState(workspaceParam || 'Default');

  const handleRowClick = (invoiceId: number) => {
    router.push(`http://localhost:3000/workspace/view?id=${invoiceId}`);
  };

  const formik = useFormik({
    initialValues: {
      comments: '',
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Filename:', fileName);
      console.log('Data in JSON:', data);
      console.log('Comments:', values.comments);
    },
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    setFileName(file.name);
    formik.setFieldValue('file', file);

    if (fileType === 'text/csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setData(worksheet);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Unsupported file type');
    }
  };

  const filteredInvoices =
    filter === 'All' ? invoices : invoices.filter((invoice) => invoice.status === filter);

  return (
    <WorkSpaceLayout>
      <div className="flex flex-1 py-5 pl-3 gap-3 flex-col">
        <div className="flex-[7] py-2 flex flex-col gap-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="flex-1  shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {workspace}
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-sm cursor-pointer ">
                    <Settings2 size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                    <FilePenLine size={16} />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                    <Trash size={16} />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="relative flex items-center">
              <Search size={16} className="absolute left-3" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:border-transparent font-normal"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="mt-4 w-full flex items-center justify-end">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative flex items-center">
                    <Upload size={16} className="absolute left-3" />
                    <Button variant="outline" className="pl-10">
                      Upload Files
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] border-none ">
                  <DialogHeader>
                    <DialogTitle>Upload Dataset</DialogTitle>
                    <DialogDescription>
                      Make changes to your dataset here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <FileUploadForm
                    formik={formik}
                    fileName={fileName}
                    handleFileUpload={handleFileUpload}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            <Chip label="All" onClick={() => setFilter('All')} selected={filter === 'All'} />
            <Chip
              label="Trained"
              onClick={() => setFilter('Trained')}
              selected={filter === 'Trained'}
            />
            <Chip
              label="Untrained"
              onClick={() => setFilter('Untrained')}
              selected={filter === 'Untrained'}
            />
          </div>
          <div className="mt-4 flex  font-normal gap-4 flex-wrap">
            {filteredInvoices.map((invoice) => (
              <Card
                key={invoice.id}
                className="mb-4  border-none   cursor-pointer"
                onClick={() => handleRowClick(invoice.id)}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{invoice.filename}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={'ghost'}>
                        <MoreHorizontal size={16} className="cursor-pointer" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => handleRowClick(invoice.id)}>
                        <FilePenLine size={16} />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                        <Edit2 size={16} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                        <Trash size={16} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="text-sm">
                  <CardDescription className="flex flex-col gap-2">
                    <p>
                      <strong>Uploaded At:</strong> {invoice.uploaded_at}
                    </p>
                    <p>
                      <strong>Comments:</strong> {invoice.comments}
                    </p>
                    <p>
                      <strong>Author:</strong> {invoice.author}
                    </p>
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex gap-2 items-center">
                  <span>Status:</span>
                  <span>
                    {invoice.status === 'Untrained' ? (
                      <Badge variant="destructive">{invoice.status}</Badge>
                    ) : (
                      <Badge variant="secondary">{invoice.status}</Badge>
                    )}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </WorkSpaceLayout>
  );
}

export default UserDashboard;
