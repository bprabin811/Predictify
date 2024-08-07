'use client';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

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
import AlertBox from '@/components/utils/AlertBox';

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
  // const savedLayout = localStorage.getItem('layout');
  // let layout = ['bottom'];
  // if (savedLayout) {
  //   const parsedLayout = JSON.parse(savedLayout);
  //   if (Array.isArray(parsedLayout.items)) {
  //     layout = parsedLayout.items;
  //   }
  // }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ['bottom'],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    localStorage.setItem('layout', JSON.stringify(data));
    toast('Layout updated successfully.', {
      position: 'top-right',
      duration: 2000,
    });
  }

  return (
    <>
      <h3 className="text-lg font-medium">Appearance Settings</h3>
      <p className="text-sm text-muted-foreground">
        Upgrade your current plan at any time to unlock additional features and resources that
        support your business growth.
      </p>
      <Separator className="my-4" />
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

      <AlertBox
        icon={<Info className="h-4 w-4" />}
        title="Information"
        description="The selected theme (light, dark, or system) will be applied throughout the entire
          application. However, changes to the layout will only take effect within the workspace."
      />
    </>
  );
};

export default SettingsProfilePage;
