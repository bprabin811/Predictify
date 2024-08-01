'use client';
import NotificationsCard from '@/components/org/Notifications';
import SettingsMenu from '@/components/org/SettingsMenu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MoveDown, MoveRight, X } from 'lucide-react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface FieldSchema {
  name: string;
  type: 'string' | 'int' | 'float';
}
interface DataSetExample {
  input_fields: FieldSchema[];
  target_field: FieldSchema;
}

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

const dataSetExample: DataSetExample = {
  input_fields: [
    {
      name: 'Pclass',
      type: 'int',
    },
    {
      name: 'Sex',
      type: 'string',
    },
    {
      name: 'Age',
      type: 'float',
    },
    {
      name: 'SibSp',
      type: 'int',
    },
    {
      name: 'Parch',
      type: 'int',
    },
    {
      name: 'Fare',
      type: 'float',
    },
    {
      name: 'Cabin',
      type: 'string',
    },
    {
      name: 'Embarked',
      type: 'string',
    },
  ],
  target_field: {
    name: 'Survived',
    type: 'int',
  },
};

const Playground = () => {
  const [targetColumn, setTargetColumn] = useState(dataSetExample.target_field.name);

  return (
    <div className="w-full">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-3">
          <div className="flex h-[60px] w-full items-center justify-between border-b px-4 bg-[#fbfafa] dark:bg-card ">
            <div className="h-[60px] flex z-40 font-semibold text-xl gap-4 items-center">
              <Link href="/">
                <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
              </Link>
              Predictify<Badge className="py-0">Beta</Badge>
            </div>
            <div className="flex gap-2">
              <NotificationsCard />
              <SettingsMenu isLabel={false} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-screen p-4 overflow-auto pb-20">
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
                  <CardHeader className="py-3 px-4">
                    <span className="font-semibold uppercase">Form</span>
                  </CardHeader>
                  <Separator />
                  <CardContent className="items-start grid grid-cols-3 gap-2 p-4">
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
                        <ErrorMessage name={field.name} component="div" className="text-red-600" />
                      </div>
                    ))}
                  </CardContent>
                  {/* <Separator /> */}
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
              <CardHeader className="py-3 px-4">
                <span className="font-semibold uppercase">Model</span>
              </CardHeader>
              <Separator />
            </Card>
            <MoveDown />
            <Card className="shadow-none w-full h-[30%]">
              <CardHeader className="py-3 px-4">
                <span className="font-semibold uppercase">Prediction</span>
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
  );
};

export default Playground;
