'use client';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { ChevronRight, LogIn } from 'lucide-react';
import { Separator } from './ui/separator';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-[#ddd] dark:border-[#666] backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold gap-2">
            <div className="bg-[url('/light_logo.png')] dark:bg-[url('/dark_logo.png')] bg-cover bg-center h-[24px] w-[24px]"></div>
            Predictify
          </Link>
          <div className="h-full flex items-center space-x-4">
            <Link
              href="/auth/login"
              className={buttonVariants({
                size: 'sm',
                variant: 'ghost',
              })}>
              <LogIn className="mr-1.5 h-5 w-5" />
              Login
            </Link>
            <Separator orientation="vertical" className="h-8" />

            <Link
              href="/auth/login"
              className={buttonVariants({
                size: 'sm',
                className: 'hidden sm:flex items-center gap-1',
              })}>
              Get started
              <ChevronRight className="ml-1.5 h-5 w-5" />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
