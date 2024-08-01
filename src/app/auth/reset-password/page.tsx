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
import React, { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import useAuthStore from '@/store/auth/AuthStore';
import Loader from '@/components/Loader';
import { Eye, EyeOff } from 'lucide-react';

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const PasswordReset = () => {
  const { passwordReset, isLoading, isSuccess }: any = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [key, setKey] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const workspaceParam = searchParams.get('key');
    if (workspaceParam) {
      setKey(workspaceParam);
    }
  }, [searchParams]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="h-screen w-screen flex items-center">
      <MaxWidthWrapper className="flex items-center justify-center flex-col gap-5">
        <Link href="/" className="max-w-sm flex z-40 font-semibold gap-2">
          <div className="bg-[url('/light_logo.png')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
          Predictify
        </Link>
        <Card className="max-w-sm border-none">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Please provide your new password to update your credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ password: '' }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                const success = await passwordReset(key, values.password);
                if (success) {
                  router.push('/auth/login');
                }
              }}>
              {({ values }) => (
                <Form className="flex flex-col gap-4 relative">
                  <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="border border-[#555]"
                    />
                    <div
                      className="absolute right-2 top-8 cursor-pointer"
                      onClick={togglePasswordVisibility}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
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
                    <CardDescription className="text-xs flex flex-col gap-1 list-disc">
                      <li>8 characters</li>
                      <li>1 lower case character</li>
                      <li>1 upper case character</li>
                      <li>1 number</li>
                      <li>1 special character</li>
                    </CardDescription>
                  </div>

                  <Button type="submit" className="w-full">
                    Reset password
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
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

const PasswordResetPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PasswordReset />
    </Suspense>
  );
};

export default PasswordResetPage;
