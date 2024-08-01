'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Method {
  method: string;
  description: string;
  orderIndex: number;
  canSkip: string;
}

interface SelectMethodsProps {
  methods: Method[];
  feature: string;
  selectedColumns: any[];
}

const SelectMethods: React.FC<SelectMethodsProps> = ({ methods, feature, selectedColumns }) => {
  const formik = useFormik({
    initialValues: {
      selectedMethod: '',
    },
    validationSchema: Yup.object({
      selectedMethod: Yup.string().required('Selecting a method is required'),
    }),
    onSubmit: (values) => {
      toast('Event has been created', {
        description: JSON.stringify(
          {
            selectedColumns,
            selectedMethod: values.selectedMethod,
          },
          null,
          2,
        ),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full border rounded-[.4rem] ">
      <CardHeader className="border-b py-3">
        <h2 className="font-semibold text-sm uppercase">Select {feature} Options</h2>
      </CardHeader>
      <CardContent className="w-full h-full flex flex-col gap-4 py-4">
        <div className="w-full flex flex-col gap-2">
          <h2 className="uppercase text-xs font-semibold">Options</h2>
          <div className="w-full flex flex-wrap gap-2">
            <Select
              onValueChange={(value) => formik.setFieldValue('selectedMethod', value)}
              value={formik.values.selectedMethod}>
              <SelectTrigger className="w-full text-muted-foreground">
                <SelectValue placeholder="Select a Method" />
              </SelectTrigger>
              <SelectContent>
                {methods.map((method) => (
                  <SelectItem key={method.orderIndex} value={method.method}>
                    {method.method} - {method.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.selectedMethod && formik.errors.selectedMethod ? (
              <div className="text-red-500 text-xs">{formik.errors.selectedMethod}</div>
            ) : null}
          </div>
        </div>
        <Button type="submit" variant="default" className="w-fit">
          {'Apply'}
        </Button>
      </CardContent>
    </form>
  );
};

export default SelectMethods;
