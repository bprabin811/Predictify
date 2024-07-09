'use client';
import { useEffect, useState } from 'react'; // Added useState and useEffect for managing local storage and theme state
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import AppearanceCard from './components/AppearanceCard';
import { toast } from 'sonner';

const items = [
  {
    id: 'bottom',
    title: 'Bottom',
  },
  {
    id: 'right',
    title: 'Right',
  },
];

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const SettingsProfilePage = () => {
  const handleThemeChange = (layout: string) => {
    localStorage.setItem('layout', layout);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['bottom'],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    localStorage.setItem('layout', JSON.stringify(data));
    // toast('Layout updated successfully.', {
    //   type: 'success',
    //   position: 'bottom-left',
    //   duration: 1000,
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    // });
  }

  return (
    <div className="space-y-6 px-2 pr-4">
      <div className="mt-2">
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <p className="text-sm text-muted-foreground">
          Upgrade your current plan at any time to unlock additional features and resources that
          support your business growth.
        </p>
      </div>
      <Separator />
      <AppearanceCard />

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Navigation</FormLabel>
                    <FormDescription>
                      Select the items you want to display position of navigation bar.
                    </FormDescription>
                  </div>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([item.id]); // Only allow one selection
                                  } else {
                                    field.onChange(
                                      field.value?.filter((value) => value !== item.id),
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">{item?.title}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <Alert className="bg-red-50 dark:bg-orange-600 dark:bg-opacity-10">
        <Info className="h-4 w-4" />
        <AlertTitle>Information!</AlertTitle>
        <AlertDescription>
          The selected theme (light, dark, or system) will be applied throughout the entire
          application. However, changes to the layout will only take effect within the workspace.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SettingsProfilePage;
