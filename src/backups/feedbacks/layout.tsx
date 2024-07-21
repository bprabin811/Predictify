// app/layout.tsx (or any server-side file)
import { Metadata } from 'next';
import SettingsLayout from './settingLayout';

export const metadata: Metadata = {
  title: 'Feedbacks',
  description: 'Feedbacks are a way to collect user opinions, suggestions, and reviews.',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SettingsLayout>{children}</SettingsLayout>
    </div>
  );
}
