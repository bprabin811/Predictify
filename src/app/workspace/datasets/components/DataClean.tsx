'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ViewDataTable from '@/components/processes/view';
import { CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eraser, FileStack, History, Plus, ShieldQuestion, Undo2 } from 'lucide-react';
import CorrelationMatrix from './CorrelationMatrix';
import { dummyData } from './data';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Dataset {
  [key: string]: any;
}

interface Version {
  id: number;
  timestamp: string;
  description: string;
  data: [];
}

interface DataCleaningProps {
  dataset: Dataset[];
  applyChanges: (newDataset: Dataset[]) => void;
}

const validationSchema = Yup.object().shape({
  missingValueOption: Yup.string().required('This field is required'),
});

const DataCleaning: React.FC<DataCleaningProps> = ({ applyChanges }) => {
  const [dataset, setDataset] = useState<any>(dummyData);
  const [versions, setVersions] = useState<Version[]>([]);
  const [description, setDescription] = useState<string>('');

  const handleCreateVersion = () => {
    createVersion(description);
    setDescription('');
  };

  const createVersion = (description: string) => {
    const newVersion: Version = {
      id: versions.length,
      timestamp: new Date().toLocaleString(),
      description,
      data: dataset,
    };
    setVersions([...versions, newVersion]);
  };

  const restoreVersion = (id: number) => {
    const version = versions.find((v) => v.id === id);
    if (version) {
      setDataset(version.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      missingValueOption: 'none',
      normalizeOption: false,
    },
    validationSchema,
    onSubmit: (values) => {
      // Logic to update preview based on form values

      // toast({
      //   title: 'You submitted the following values:',
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
      //     </pre>
      //   ),
      // });
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="w-full flex flex-col gap-4 items-start justify-start">
      <div className=" w-full flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-[30%] max-h-[300px] border rounded-[.4rem] dark:bg-card">
            <CardHeader className="border-b">
              <h2 className="uppercase flex items-center gap-2 font-semibold">
                <Eraser size={20} className="text-green-500" />
                Data Cleaning
              </h2>
            </CardHeader>
            <CardContent className="w-full h-full flex flex-col gap-4 py-4">
              <h2 className="uppercase font-semibold text-xs">Handle missing value</h2>
              <form onSubmit={formik.handleSubmit} className="w-full">
                <Select
                  onValueChange={(value) => formik.setFieldValue('missingValueOption', value)}
                  value={formik.values.missingValueOption}
                  name="missingValueOption">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="mean">Fill with Mean</SelectItem>
                    <SelectItem value="median">Fill with Median</SelectItem>
                    <SelectItem value="mode">Fill with Mode</SelectItem>
                    <SelectItem value="remove">Remove Rows</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.missingValueOption && formik.errors.missingValueOption ? (
                  <div className="text-red-500 text-sm">{formik.errors.missingValueOption}</div>
                ) : null}

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="normalize"
                    checked={formik.values.normalizeOption}
                    onCheckedChange={() =>
                      formik.setFieldValue('normalizeOption', !formik.values.normalizeOption)
                    }
                    name="normalizeOption"
                  />
                  <label htmlFor="normalize" className="text-sm font-medium leading-none">
                    Normalize data
                  </label>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="submit" className="mt-4">
                      {' '}
                      Apply Changes
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Clean Dataset</DialogTitle>
                      <DialogDescription>
                        {"Make changes to your profile here. Click save when you're done."}
                      </DialogDescription>
                    </DialogHeader>
                    <h2 className="uppercase font-semibold text-xs">Create New Version</h2>
                    <Textarea
                      value={description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                      }
                      placeholder="Version Description"
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant={'secondary'}
                          className="w-fit"
                          onClick={handleCreateVersion}>
                          <Plus size={16} /> Create Version
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant={'link'} className="w-fit">
                          Skip
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </form>
            </CardContent>
          </div>
          <div className="w-[30%] border rounded-[.4rem] dark:bg-card">
            <CardHeader className="border-b">
              <h2 className="font-normal uppercase flex items-center gap-2">
                <History size={20} className="text-blue-500" />
                Version History
              </h2>
            </CardHeader>
            <CardContent className="w-full grid grid-cols-1 grid-rows-1 gap-4 py-4">
              {versions.length === 0 ? (
                <div className="w-full flex items-center flex-col gap-4 pt-10">
                  <FileStack size={20} className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No versions have been created yet.
                  </p>
                </div>
              ) : (
                versions.map((version) => (
                  <div key={version.id} className="mb-2 p-2 border rounded">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-semibold">{version.timestamp}</p>
                        <p className="text-xs text-muted-foreground">{version.description}</p>
                      </div>
                      <Button variant={'outline'} onClick={() => restoreVersion(version.id)}>
                        <Undo2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </div>
        </div>
        <Alert className="w-full bg-red-50 dark:bg-opacity-10">
          <ShieldQuestion className="h-4 w-4" />
          <AlertTitle className="uppercase">Comment</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia nostrum ipsam
            voluptate, et suscipit nam, nulla quam sapiente dolorum, accusamus ad. Nesciunt mollitia
            magni totam placeat animi, alias odio officiis!
          </AlertDescription>
        </Alert>
      </div>
      <div className="w-full mb-4">
        <h2 className="font-semibold uppercase mb-3">Correlation Matrix</h2>
        <CorrelationMatrix />
      </div>
    </div>
  );
};

export default DataCleaning;
