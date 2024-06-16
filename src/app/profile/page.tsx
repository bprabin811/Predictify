'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import WorkSpaceLayout from '@/components/WorkspaceLayout';
import useAuthStore from '@/store/auth/AuthStore';
import { useEffect, useState } from 'react';
import usePlanStore from '@/store/plan/planStore';

export function ProfilePage() {
  const { isSuccess, isLoading, fetchMe, myData } = useAuthStore();
  const { checkPlan, plan, remainingDays } = usePlanStore();
  const [data, setdata] = useState([]);

  const userId = localStorage.getItem('user');

  useEffect(() => {
    fetchMe();
  }, []);

  useEffect(() => {
    setdata(myData);
  }, [myData]);

  useEffect(() => {
    if (userId) {
      checkPlan();
    }
  }, [userId, checkPlan]);

  console.log(data);

  return (
    <WorkSpaceLayout>
      {isLoading ? (
        <>Loading ...</>
      ) : (
        <div className="w-full flex md:flex-col sm:flex-col gap-5 h-full p-5 ">
          <div className="grid max-w-full flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/workspace">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                My Profile
              </h1>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0" className="shadow-none">
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Username</Label>
                        <Input
                          id="first_name"
                          type="text"
                          className="w-full"
                          defaultValue={data.username}
                          disabled
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          className="w-full"
                          defaultValue={data?.email}
                          disabled
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="description">Address</Label>
                        <Textarea id="address" defaultValue="" className="min-h-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle>Need Assistance?</CardTitle>
                    <CardDescription>
                      Our dedicated support team is here to help you with any questions or issues
                      you may encounter. Contact us anytime and we'll be happy to assist you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm">Help Center</Button>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {plan === 'premium' && (
                  <Card>
                    <CardContent className='py-4'>
                      <p>Premium Plan</p>
                      <span>({remainingDays} days remaining)</span>
                    </CardContent>
                  </Card>
                )}
                {plan === 'basic' && (
                  <Card className="shadow-none">
                    <CardHeader>
                      <CardTitle>Upgrade to Pro</CardTitle>
                      <CardDescription>
                        Unlock all features and get unlimited access to our support team.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        Upgrade
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </WorkSpaceLayout>
  );
}

export default ProfilePage;
