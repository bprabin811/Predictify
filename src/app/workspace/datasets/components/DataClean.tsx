'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eraser, FileStack, History, Plus, ShieldQuestion, Undo2 } from 'lucide-react';
import CorrelationMatrix from './CorrelationMatrix';
import { CommonConfirmationAlert } from '@/components/utils/CommonAlert';
import useDatasetStore from '@/store/workspace/workspaceDatasets';

interface DataCleaningProps {
  dataset: any;
  dataId: number;
}

const validationSchema = Yup.object().shape({
  missingValueOption: Yup.string().required('This field is required'),
});

const DataCleaning: React.FC<DataCleaningProps> = ({ dataset, dataId }: any) => {
  const { handleMissingValues, getTableDatas, isLoading }: any = useDatasetStore();
  const formik = useFormik({
    initialValues: {
      missingValueOption: 'drop',
    },
    validationSchema,
    onSubmit: async (values) => {
      const isSuccess = await handleMissingValues(dataId, values.missingValueOption);
      if (isSuccess) {
        getTableDatas(dataId);
      }
    },
  });

  return (
    <div className="container flex flex-col gap-4 items-start justify-start">
      <div className=" w-full flex flex-col gap-4">
        <div className="flex gap-4">
          <Card className="w-[30%] max-h-[300px] border rounded-[.4rem] shadow-none">
            <CardHeader className="flex flex-row items-center justify-between py-3 border-b">
              <CardTitle className="text-16 flex gap-2 items-center">
                <Eraser size={18} />
                Data Cleaning
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full flex flex-col gap-4 py-4">
              <h2 className="font-semibold text-14">Handle missing value</h2>
              <form onSubmit={formik.handleSubmit} className="w-full">
                <Select
                  onValueChange={(value) => formik.setFieldValue('missingValueOption', value)}
                  value={formik.values.missingValueOption}
                  name="missingValueOption">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mean">Fill with Mean</SelectItem>
                    <SelectItem value="median">Fill with Median</SelectItem>
                    <SelectItem value="most_occurred">Fill with Most Frequent Value</SelectItem>
                    <SelectItem value="drop">Remove Rows with Missing Values</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.missingValueOption && formik.errors.missingValueOption ? (
                  <div className="text-red-500 text-12 mt-4">
                    {formik.errors.missingValueOption}
                  </div>
                ) : null}
                <CommonConfirmationAlert
                  component={
                    <Button variant="default" className="mt-4">
                      {' '}
                      Apply Changes
                    </Button>
                  }
                  title="Are you sure you want to apply changes?"
                  description="This action cannot be undone."
                  handleConfirm={() => {
                    formik.handleSubmit();
                  }}
                />
              </form>
            </CardContent>
          </Card>
        </div>
        <Alert className="w-full bg-secondary">
          <ShieldQuestion className="h-4 w-4" />
          <AlertTitle className="uppercase">Readme</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            To obtain an accurate correlation matrix, please ensure the data is cleaned beforehand.
          </AlertDescription>
        </Alert>
      </div>
      <div className="w-full mb-10">
        <h2 className="font-semibold mb-3 text-24">Correlation Matrix</h2>
        <CorrelationMatrix dataset={dataset} />
      </div>
    </div>
  );
};

export default DataCleaning;
