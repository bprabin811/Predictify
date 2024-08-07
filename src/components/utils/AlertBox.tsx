import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AlertBox: React.FC<AlertBoxProps> = ({ icon, title, description }) => {
  return (
    <Alert className="bg-red-800/10 my-4">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertBox;
