'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { LockKeyhole, ShieldCheck } from 'lucide-react';

const EmailSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const VerificationSchema = Yup.object().shape({
  code: Yup.string().required('Verification code is required'),
});

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

interface FormValues {
  email: string;
  code: string;
  username: string;
  password: string;
}

export default function SignupForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState<number>(1);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const stepParam = query.get('step');
      if (stepParam) {
        setStep(Number(stepParam));
      }
    }
  }, []);

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (step === 1) {
      // Handle email submission
      setStep(2);
      router.push(`${pathname}?step=2`);
      actions.setSubmitting(false);
    } else if (step === 2) {
      // Handle verification code submission
      setStep(3);
      router.push(`${pathname}?step=3`);
      actions.setSubmitting(false);
    } else if (step === 3) {
      toast({
        title: 'You have been signed up successfully.',
        description: new Date().toString(),
      });
      window.location.href = '/workspace';
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <MaxWidthWrapper className="p-20 flex items-center justify-center flex-col gap-10">
        <Link href="/" className="max-w-sm flex z-40 font-semibold gap-2">
          <div className="bg-[url('/light_logo.svg')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
          Predictify
        </Link>
        <Card className="max-w-sm border-none">
          <CardHeader>
            <CardTitle className="text-2xl mb-2">
              {step === 2 && (
                <div className="bg-gray-100 dark:bg-gray-600 h-10 w-10 flex items-center justify-center rounded-full">
                  <ShieldCheck className="rotate-[-30deg]" />
                </div>
              )}
              {step === 3 && (
                <div className="bg-gray-100 dark:bg-gray-600 h-10 w-10 flex items-center justify-center rounded-full">
                  <LockKeyhole className="rotate-[-30deg]" />
                </div>
              )}
            </CardTitle>
            <span className="text-xl font-semibold">
              {step === 1 && 'Get started for free'}
              {step === 2 && 'Enter the verification code sent to your email'}
              {step === 3 && 'Create a secure password'}
            </span>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                email: '',
                code: '',
                username: '',
                password: '',
              }}
              validationSchema={
                step === 1 ? EmailSchema : step === 2 ? VerificationSchema : SignupSchema
              }
              onSubmit={handleSubmit}>
              {({ isSubmitting, values }) => (
                <Form className="grid gap-4">
                  {step === 1 && (
                    <>
                      <Button variant="outline" className="w-full flex gap-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48">
                            <path
                              fill="#fbc02d"
                              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            <path
                              fill="#e53935"
                              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                            <path
                              fill="#4caf50"
                              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                            <path
                              fill="#1565c0"
                              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                          </svg>
                        </div>
                        Login with Google
                      </Button>
                      <div className="flex items-center my-2">
                        <hr className="flex-1 border-t" />
                        <span className=" text-xs mx-2">or</span>
                        <hr className="flex-1 border-t" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Field
                          as={Input}
                          id="username"
                          name="username"
                          type="text"
                          placeholder="John Doe"
                          className="border border-[#555]"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          placeholder="youremail@example.com"
                          className="border border-[#555]"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Continue
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="code">Verification Code</Label>
                        <Field
                          as={Input}
                          id="code"
                          name="code"
                          type="text"
                          placeholder="Enter verification code"
                          className="border border-[#555]"
                        />
                        <ErrorMessage
                          name="code"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                        <CardDescription className="text-xs flex items-center justify-start gap-2">
                          <p>Check your email for the verification code.</p>{' '}
                          <Button variant={'link'} className="m-0 p-0">
                            Resend
                          </Button>
                        </CardDescription>
                      </div>
                      <Button type="submit" className="w-full">
                        Continue
                      </Button>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Password"
                          className="border border-[#555]"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className=" flex flex-col gap-2">
                        {values.password && (
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold">Password strength:</p>
                            <div className="flex-1 bg-gray-200 rounded-full h-1 mr-2">
                              <div
                                className={`h-1 rounded-full ${
                                  values.password.length >= 8 &&
                                  /[a-z]/.test(values.password) &&
                                  /[A-Z]/.test(values.password) &&
                                  /[0-9]/.test(values.password) &&
                                  /[!@#$%^&*]/.test(values.password)
                                    ? 'bg-green-500'
                                    : 'bg-red-500'
                                }`}
                                style={{
                                  width: `${Math.min(100, values.password.length * 12.5)}%`,
                                }}></div>
                            </div>
                            <span
                              className={`text-xs ${
                                values.password.length >= 8 &&
                                /[a-z]/.test(values.password) &&
                                /[A-Z]/.test(values.password) &&
                                /[0-9]/.test(values.password) &&
                                /[!@#$%^&*]/.test(values.password)
                                  ? 'text-green-500'
                                  : 'text-red-500'
                              }`}>
                              {values.password.length >= 8 &&
                              /[a-z]/.test(values.password) &&
                              /[A-Z]/.test(values.password) &&
                              /[0-9]/.test(values.password) &&
                              /[!@#$%^&*]/.test(values.password)
                                ? 'Strong'
                                : 'Weak'}
                            </span>
                          </div>
                        )}
                        <p className="text-xs font-semibold ">Must contain at least</p>
                        <CardDescription className="text-xs flex flex-col gap-1  list-disc">
                          <li>8 characters</li>
                          <li>1 lower case character</li>
                          <li>1 upper case character</li>
                          <li>1 number</li>
                          <li>1 special character</li>
                        </CardDescription>
                      </div>

                      <Button type="submit" className="w-full">
                        Sign Up
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <CardDescription className="text-xs">
              {'By clicking "Continue with Google/Email" you agree to our User'}{' '}
              <Link href="#" className="underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href={'#'} className="underline">
                Privacy Policy
              </Link>
            </CardDescription>
            <div className="mt-4 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline font-semibold">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
    </div>
  );
}
