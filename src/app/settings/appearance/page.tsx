'use client';
import { useEffect, useState } from 'react'; // Added useState and useEffect for managing local storage and theme state
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Receipt } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTheme } from 'next-themes';

const SettingsProfilePage = () => {
  const { setTheme, resolvedTheme } = useTheme(); // Get the current resolved theme

  const [activeTheme, setActiveTheme] = useState('system'); // State to track active theme

  useEffect(() => {
    // Retrieve active theme from local storage on mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setActiveTheme(storedTheme);
    }
  }, []);

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setActiveTheme(theme);
    localStorage.setItem('theme', theme); // Store theme preference in local storage
  };

  return (
    <div className="space-y-6">
      <div className="mt-2">
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <p className="text-sm text-muted-foreground">
          Upgrade your current plan at any time to unlock additional features and resources that
          support your business growth.
        </p>
      </div>
      <Separator />
      <div className="flex space-x-4 ">
        <Card
          onClick={() => handleThemeChange('light')}
          className={
            activeTheme === 'light' ? 'border border-primary w-[300px]' : 'w-[300px] shadow-none'
          }>
          <CardHeader className="h-[150px]">
            <CardTitle className="text-xl font-semibold">Light Mode</CardTitle>
            <CardDescription>Switch to light mode for a brighter experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
              <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          onClick={() => handleThemeChange('dark')}
          className={
            activeTheme === 'dark' ? 'border border-primary w-[300px] ' : 'w-[300px] shadow-none'
          }>
          <CardHeader className="h-[150px]">
            <CardTitle className="text-xl font-semibold">Dark Mode</CardTitle>
            <CardDescription>Switch to dark mode for a darker experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          onClick={() => handleThemeChange('system')}
          className={
            activeTheme === 'system' ? 'border border-primary w-[300px]' : 'w-[300px] shadow-none'
          }>
          <CardHeader className="h-[150px]">
            <CardTitle className="text-xl font-semibold">System Preference</CardTitle>
            <CardDescription>Switch to System Preference.</CardDescription>
          </CardHeader>
          <CardContent>
            {activeTheme === 'light' ? (
              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Alert className="bg-red-50 dark:bg-orange-600 dark:bg-opacity-10">
        <Receipt className="h-4 w-4" />
        <AlertTitle>Important Notice!</AlertTitle>
        <AlertDescription>
          Please note that pricing and billing terms are subject to change. Predictify reserves the
          right to discontinue or modify pricing plans, features, or billing cycles at any time.
          Changes will be communicated via email or through our website. In the event of any
          changes, you will have the option to continue or cancel your subscription as per our terms
          of service.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SettingsProfilePage;
