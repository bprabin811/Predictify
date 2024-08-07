import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Trash } from 'lucide-react';
import { Button } from '../ui/button';

interface CommonConfirmationAlertProps {
  component: React.ReactNode;
  title: string;
  description: string;
  handleConfirm: () => void;
}

export function CommonConfirmationAlert({
  component,
  title,
  description,
  handleConfirm,
}: CommonConfirmationAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{component}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-start">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-start">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-end gap-4">
          <AlertDialogCancel className="w-fit m-0">Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-fit m-0" onClick={handleConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
