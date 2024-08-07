'use client';
import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { Code2, MoveDown, MoveRight, Paperclip, Link as LinkShare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Loader from '@/components/Loader';
import { PresetShare } from '../components/share';
import { PresetSave } from '../components/save';
import { ScrollArea } from '@/components/ui/scroll-area';
import APIIntegrationDialog from '@/components/org/DeveloperAPI';
import SettingsMenu from '@/components/org/SettingsMenu';

interface FieldSchema {
  name: string;
  type: 'string' | 'int' | 'float';
}

interface DataSetExample {
  input_fields: FieldSchema[];
  target_field: FieldSchema;
}

const dataSetExample: DataSetExample = {
  input_fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'age',
      type: 'int',
    },
    {
      name: 'height',
      type: 'float',
    },
  ],
  target_field: {
    name: 'salary',
    type: 'float',
  },
};

const getDynamicSchema = (fields: FieldSchema[]) => {
  const shape: Record<string, any> = {};
  fields.forEach((field) => {
    if (field.type === 'string') {
      shape[field.name] = Yup.string().required('Required field');
    } else {
      shape[field.name] = Yup.number().required('Required field');
    }
  });
  return Yup.object().shape(shape);
};

const ModelSpaceLayout: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dataset, setDataset] = useState<File | null>(null);
  const [modalFile, setModalFile] = useState<File | null>(null);
  const [modalAPI, setModalAPI] = useState(false);
  const [targetColumn, setTargetColumn] = useState(dataSetExample.target_field.name);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Untitled');

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
  };

  const handleDatasetUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDataset(file);
      console.log('Dataset file selected:', file);
    }
  };

  const handleModalUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setModalFile(file);
      setModalOpen(true);
      console.log('Modal file selected:', file);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="border-r h-full w-[20%] px-4">
        <ScrollArea className="w-full flex h-full justify-between gap-2">
          <div className="flex z-40 font-semibold text-xl gap-4 h-[60px] items-center">
            <Link href="/">
              <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
            </Link>
            Model Test
          </div>
          <div className="flex-1 mt-4">
            <aside className="grid items-start  gap-6 text-sm font-medium ">
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Upload Modal</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-6">
                  <input
                    type="file"
                    accept=".json, .modal"
                    onChange={handleModalUpload}
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <Button variant={'default'}>Upload</Button>
                  <span className="mt-2 text-sm text-gray-500">
                    Supports JSON and MODAL up to 5MB
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Upload Dataset</label>
                <div className="p-2 mb-2 w-full flex items-center justify-start gap-4 border rounded-md cursor-pointer">
                  <input
                    type="file"
                    accept=".csv, .xlsx"
                    onChange={handleDatasetUpload}
                    className="absolute opacity-0 cursor-pointer"
                  />
                  <Paperclip size={16} />
                  <h3 className="font-normal">Upload Data Sample</h3>
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium">Target Column</label>
                <Select onValueChange={setTargetColumn}>
                  <SelectTrigger className="w-full border">
                    <SelectValue placeholder="Select a Column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Columns</SelectLabel>
                      <SelectItem value={dataSetExample.target_field.name}>
                        {dataSetExample.target_field.name}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </aside>
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col items-center justify-between h-[100vh] w-[80%]">
        <div className="flex h-[60px] w-full border-b">
          <div className="flex items-center justify-between w-full px-4 pl-2">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                placeholder="Untitled"
                className="font-semibold focus:outline-none"
                autoFocus
              />
            ) : (
              <h1 className=" font-semibold" onClick={handleTitleClick}>
                {title || 'Untitled'}
              </h1>
            )}
            <div className="flex items-center gap-4">
              <div className="px-4">
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={'outline'}
                      className="p-2 w-full flex items-center justify-start gap-4 border rounded-md cursor-pointer">
                      <Code2 size={16} />
                      Developer
                    </Button>
                  </DialogTrigger>
                  <APIIntegrationDialog />
                </Dialog>
              </div>

              <PresetSave />
              <PresetShare />
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
        <div className="relative w-full h-[90vh] px-4 pl-2">
          <main className="w-full h-full flex items-start justify-between ">
            <Card className=" shadow-none w-[60%] flex flex-col">
              <Formik
                initialValues={{ name: '', age: '', height: '' }}
                validationSchema={getDynamicSchema(dataSetExample.input_fields)}
                onSubmit={(values, { setSubmitting }: FormikHelpers<any>) => {
                  console.log(values);
                  setSubmitting(false);
                }}>
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <CardHeader className="p-4">
                      <span className="font-semibold">Form</span>
                    </CardHeader>
                    <Separator />
                    <CardContent className="items-start grid grid-cols-2 gap-2 p-4">
                      {dataSetExample.input_fields.map((field, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          <Label htmlFor={field.name}>{field.name}</Label>
                          <Field
                            name={field.name}
                            type={field.type === 'string' ? 'text' : 'number'}
                            as={Input}
                            id={field.name}
                            placeholder={field.name}
                          />
                          <ErrorMessage
                            name={field.name}
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      ))}
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-4 flex items-center justify-end">
                      <Button variant={'default'} type="submit">
                        Feed data
                      </Button>
                    </CardFooter>
                  </Form>
                )}
              </Formik>
            </Card>

            <MoveRight className="absolute left-[65%] top-28" />
            <div className="h-full w-[30%] flex flex-col justify-between items-center">
              <Card className="shadow-none w-full h-[50%]">
                <CardHeader className="p-4">
                  <span className="font-semibold">Model</span>
                </CardHeader>
                <Separator />
              </Card>
              <MoveDown />
              <Card className="shadow-none w-full h-[30%]">
                <CardHeader className="p-4">
                  <span className="font-semibold">Prediction</span>
                </CardHeader>
                <Separator />
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={targetColumn}>{targetColumn}</Label>
                    <Input type="number" id={targetColumn} placeholder={targetColumn} disabled />
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModelSpaceLayout;
