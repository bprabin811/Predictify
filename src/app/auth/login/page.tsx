'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuthStore from '@/store/auth/AuthStore';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('username is required'),
  password: Yup.string().required('Password is required'),
});

export function LoginForm() {
  const { toast } = useToast();
  const { isSuccess, isLoading, login, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      console.log('Logged In');
      window.location.href = '/workspace';
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen flex items-center">
      <MaxWidthWrapper className="p-20 flex items-center justify-evenly">
        <Card className="max-w-sm border-none">
          <CardHeader>
            <CardTitle className="text-2xl ">Log in</CardTitle>
            <CardDescription>Enter your information below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={(values) => {
                const response = login(values.username, values.password);
                console.log(response, 'ppp');
                toast({
                  title: 'You have been logged in successfully.',
                  description: new Date().getUTCDate(),
                });
              }}>
              {({ isSubmitting }) => (
                <Form className="grid gap-4">
                  <Button variant="outline" className="w-full flex gap-2 text-gray-500">
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
                    <span className="text-gray-500 text-xs mx-2">or</span>
                    <hr className="flex-1 border-t" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="username"
                      placeholder="usertest09"
                      className="border border-[#555]"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                      </Link> */}
                      <Button variant={'link'} className="m-0 p-0">
                        Forgot your password?
                      </Button>
                    </div>
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
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    Continue
                  </Button>
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
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="underline font-semibold">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </MaxWidthWrapper>
    </div>
  );
}

export default LoginForm;