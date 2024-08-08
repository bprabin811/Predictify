'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { parse } from 'papaparse';
import { Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import useDatasetStore from '@/store/workspace/workspaceDatasets';
import { toast } from 'sonner';

// Define the shape of form values
interface FormValues {
  name: string;
  description: string;
  file: File | null;
}

interface UploadDatasetDialogProps {
  wid: number;
}

const UploadDatasetDialog: React.FC<UploadDatasetDialogProps> = (wid) => {
  const { postDataset, isLoading, isSuccess }: any = useDatasetStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      description: '',
      file: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string(),
      file: Yup.mixed().required('CSV or Excel file is required'),
    }),
    onSubmit: (values) => {
      // const reader = new FileReader();
      // reader.onload = (event) => {
      //   const csvData = event.target?.result as string;
      //   parse(csvData, {
      //     header: true,
      //     dynamicTyping: true,
      //     transform: (value, field) => {
      //       // Check if the value is empty or 'NA'
      //       if (value === '' || value === 'NA') {
      //         // If dynamicTyping is enabled, check the inferred type
      //         if (isNaN(value)) {
      //           // If the value is a string (not a number), return null
      //           return null;
      //         } else {
      //           // If the value is a number, return 0
      //           return 0;
      //         }
      //       }
      //       return value;
      //     },
      //     complete: async (result) => {
      //       const jsonData = result.data;
      //       await postDataset(values.name, values.description, jsonData, wid.wid);
      //     },
      //   });
      // };
      // if (values.file) {
      //   reader.readAsText(values.file);
      // }
      // formik.resetForm();
      // setIsDialogOpen(false);

      // Inside the onSubmit function
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        const columnMeta: { [key: string]: string } = {};

        parse(csvData, {
          header: true,
          dynamicTyping: false, // Disable dynamic typing to avoid automatic conversions
          transform: (value, field) => {
            // Determine the type if it hasn't been set yet
            if (!columnMeta[field]) {
              if (value === '' || value === 'NA') {
                columnMeta[field] = 'str'; // Treat empty or 'NA' as string initially
              } else if (!isNaN(Number(value))) {
                columnMeta[field] = 'float'; // Treat numeric strings as int
              } else {
                columnMeta[field] = 'str'; // Otherwise, treat as string
              }
            }
            return value; // Return the value without any conversion
          },
          complete: async (result) => {
            console.log('Column Metadata:', columnMeta); // Print the metadata
            // Optionally, you can still process the dataset
            await postDataset(values.name, values.description, result.data,columnMeta, wid.wid);
          },
        });
      };
      if (values.file) {
        reader.readAsText(values.file);
      }
      formik.resetForm();
      setIsDialogOpen(false);
    },
  });

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => {
        setIsDialogOpen(!isDialogOpen);
        formik.resetForm();
      }}>
      <DialogTrigger asChild>
        <div className="relative flex items-center">
          <Button variant="secondary" className="pl-10">
            <Upload size={16} className="absolute left-3" />
            Upload dataset
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="text-start">Upload Dataset</DialogTitle>
          <DialogDescription className="text-start">
            {"Make changes to your dataset here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-start justify-center w-full flex-col ">
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointe dark:bg-card hover:bg-gray-800/10 dark:border-gray-600 dark:hover:border-gray-500  cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {formik.values.name ? (
                  <p>Save as: {formik.values.file.name}</p>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">CSV/Excel</p>
                  </>
                )}
              </div>
              <input
                id="file"
                name="file"
                type="file"
                accept=".csv, .xlsx"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] || null;
                  formik.setFieldValue('file', file);
                  if (file) {
                    formik.setFieldValue('name', file.name);
                  }
                }}
                onBlur={formik.handleBlur}
                className="hidden"
              />
            </label>
            {formik.touched.file && formik.errors.file ? (
              <div className="text-red-500 text-sm mt-1">
                {JSON.stringify(formik.errors.file).replaceAll('"', '')}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="mt-1 block w-full"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="mt-1 block w-full"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDatasetDialog;
