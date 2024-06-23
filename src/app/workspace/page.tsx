'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import WorkSpaceLayout from '@/components/WorkspaceLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  Search,
  Upload,
  MoreHorizontal,
  Settings2,
  FilePenLine,
  Trash,
  Edit2,
  Sparkles,
  CopyX,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useFormik, ErrorMessage } from 'formik';
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
import HelpMenu from '@/components/HelpMenu';

interface Dataset {
  id: number;
  filename: string;
  uploaded_at: string;
  status: string;
  comments: string;
  author: string;
}

interface FormValues {
  comments: string;
  file: File | null;
}

const datasets: Dataset[] = [
  {
    id: 4,
    filename: 'population.csv',
    uploaded_at: 'May 11, 2024',
    status: 'Trained',
    comments: 'This is a population of Nepal.',
    author: 'Prabin Bhatt',
  },
];

const validationSchema = Yup.object({
  comments: Yup.string().required('Comments are required'),
  file: Yup.mixed().required('A file is required'),
});

interface FileUploadFormProps {
  formik: ReturnType<typeof useFormik<FormValues>>;
  fileName: string;
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ formik, fileName, handleFileUpload }) => (
  <form onSubmit={formik.handleSubmit} className="grid gap-4 py-4">
    <div className="flex flex-col w-full max-w-sm items-start space-x-2">
      <label className="flex flex-col items-center justify-center w-full h-20 px-4 transition border-2 border-dashed border-[#4a4b4a] rounded-lg cursor-pointer hover:border-gray-400 focus:outline-none">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-8 h-8 group-hover:text-gray-600"
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
          <p className="text-sm group-hover:text-gray-700">
            {fileName ? `Selected file: ${fileName}` : 'Drag your file here or click to upload'}
          </p>
        </div>
        <input id="file" type="file" className="hidden" onChange={handleFileUpload} />
      </label>
      <ErrorMessage name="file" component="div" className="text-red-500 text-sm" />
    </div>
    <div className="flex flex-col items-start gap-4">
      <Label htmlFor="name" className="text-right">
        Filename
      </Label>
      <Input id="name" value={fileName} className="col-span-3 border border-[#4a4b4a]" readOnly />
    </div>
    <div className="flex flex-col items-start gap-4">
      <Label htmlFor="comments" className="text-right">
        Comments
      </Label>
      <Textarea
        id="comments"
        placeholder="Type your message here."
        className="col-span-3 resize-none border border-[#4a4b4a]"
        {...formik.getFieldProps('comments')}
      />
      <ErrorMessage name="comments" component="div" className="text-red-500 text-sm" />
    </div>
    <DialogFooter>
      <Button type="submit" disabled={!formik.isValid} className="bg-[#4a4b4a]">
        Save Changes
      </Button>
    </DialogFooter>
  </form>
);

const UserDashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [fileName, setFileName] = useState('');
  const [filter, setFilter] = useState('All');

  const router = useRouter();
  const pathname = usePathname();
  const [workspace, setWorkspace] = useState<string>('Default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const workspaceParam = query.get('wsn');
      if (workspaceParam) {
        setWorkspace(workspaceParam);
      }
    }
  }, []);

  const handleRowClick = (datasetId: number) => {
    router.push(`/workspace/view?id=${datasetId}`);
  };

  const formik = useFormik<FormValues>({
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

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
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

  const filteredDatasets =
    filter === 'All' ? datasets : datasets.filter((dataset) => dataset.status === filter);

  return (
    <WorkSpaceLayout>
      <div className="flex flex-1 py-5 pl-3 gap-3 flex-col">
        <div className="flex-[7] py-2 flex flex-col gap-3">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {workspace}
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-sm cursor-pointer">
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
                <DialogContent className="sm:max-w-[425px] border-none">
                  <DialogHeader>
                    <DialogTitle>Upload Dataset</DialogTitle>
                    <DialogDescription>
                      {"Make changes to your dataset here. Click save when you're done."}
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
              label="Recent"
              onClick={() => setFilter('Recent')}
              selected={filter === 'Recent'}
            />
          </div>
          <div className="mt-4 flex font-normal gap-4 flex-wrap">
            {filteredDatasets.length >= 1 ? (
              <>
                {filteredDatasets.map((dataset) => (
                  <Card
                    key={dataset.id}
                    className="mb-4 border-none cursor-pointer"
                    onClick={() => handleRowClick(dataset.id)}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>{dataset.filename}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={'ghost'}>
                            <MoreHorizontal size={16} className="cursor-pointer" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="cursor-pointer flex items-center gap-2"
                            onClick={() => handleRowClick(dataset.id)}>
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
                          <strong>Uploaded At:</strong> {dataset.uploaded_at}
                        </p>
                        <p>
                          <strong>Comments:</strong> {dataset.comments}
                        </p>
                        <p>
                          <strong>Author:</strong> {dataset.author}
                        </p>
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <div className="w-full flex items-center justify-center flex-col gap-4">
                <div className="bg-gray-100 dark:bg-gray-600 h-12 w-12 flex items-center justify-center rounded-full">
                  <CopyX
                    style={{
                      animation: 'rotateIcon 3s infinite',
                    }}
                  />
                  <style>{`
                    @keyframes rotateIcon {
                      0% {
                        transform: rotate(0deg);
                      }
                      50% {
                        transform: rotate(30deg);
                      }
                      100% {
                        transform: rotate(0deg);
                      }
                    }
                  `}</style>
                </div>
                <span className="text-md text-muted-foreground tracking-tight">
                  You have no {filter} datasets
                </span>
              </div>
            )}
          </div>
        </div>
        <HelpMenu />
      </div>
    </WorkSpaceLayout>
  );
};

export default UserDashboard;
