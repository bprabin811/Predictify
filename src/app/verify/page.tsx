'use client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

import { MailCheck } from 'lucide-react';

export function InputOTPForm() {
  return (
    <MaxWidthWrapper className="p-20 h-full w-full flex flex-col">
      <Card className='shadow-none'>
        <CardContent className="w-full flex flex-col items-center justify-center gap-3 py-4">
          <MailCheck />
          <CardTitle className='text-xl'>Check your e-mail</CardTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsum id, dolor voluptates
            et inventore illo assumenda hic porro sapiente asperiores, nihil odio ratione est
            quidem? Error porro repellat fugit!
          </p>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
}

export default InputOTPForm;
