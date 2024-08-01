import React from 'react';
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

const UploadDatasetDialog: React.FC = () => {
  const { postDataset, isLoading, isSuccess }: any = useDatasetStore();
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
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        parse(csvData, {
          header: true,
          complete: async (result) => {
            const jsonData = result.data;
            await postDataset(values.name, values.description, jsonData, 0);
            toast.success('Data uploaded successfully.');
          },
        });
      };
      if (values.file) {
        reader.readAsText(values.file);
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex items-center">
          <Button variant="secondary" className="pl-10">
            <Upload size={16} className="absolute left-3" />
            Upload dataset
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
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="file" className="block text-sm font-medium">
              CSV or Excel File
            </label>
            <Input
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
              className="mt-1 block w-full"
            />
            {formik.touched.file && formik.errors.file ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.file}</div>
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
