'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';
import useAuthStore from '@/store/auth/AuthStore';
import { useRouter } from 'next/navigation';


const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Email is required'),
});

const PasswordReset = () => {
  const router = useRouter();
  const { passwordResetRequest, isLoading, isSuccess }: any = useAuthStore();
  return (
    <div className="h-screen w-screen flex items-center">
      <MaxWidthWrapper className="flex items-center justify-center flex-col gap-5">
        <Link href="/" className="max-w-sm flex z-40 font-semibold gap-2">
          <div className="bg-[url('/light_logo.png')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
          Predictify
        </Link>
        <Card className="max-w-sm border-none">
          {isSuccess ? (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Email Sent Successfully</CardTitle>
                <CardDescription>
                  Please check your inbox for a link to reset your password.
                </CardDescription>
              </CardHeader>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-2xl">Request Password Reset</CardTitle>
                <CardDescription>
                  Please enter your email address to receive instructions for updating your
                  credentials.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={EmailSchema}
                  onSubmit={async (values) => {
                    await passwordResetRequest(values.email);
                  }}>
                  {({ values }) => (
                    <Form className="flex flex-col gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">New Password</Label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="border border-[#555]"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Request password'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </>
          )}
          <CardFooter>
            <Link href="/auth/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
    </div>
  );
};

export default PasswordReset;
