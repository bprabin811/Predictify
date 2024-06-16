'use client';
import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { ChevronRight, GanttChart, LogOut, LogIn } from 'lucide-react';
import useAuthStore from '@/store/auth/AuthStore';
import usePlanStore from '@/store/plan/planStore';
import { useEffect } from 'react';
import { Separator } from './ui/separator';

export function Navbar() {
  const { isLoggedIn, logout } = useAuthStore();
  const user = isLoggedIn;
  const isAdmin = undefined;

  const { checkPlan, plan, remainingDays, isLoading, error } = usePlanStore();

  useEffect(() => {
    if (isLoggedIn) {
      checkPlan();
    }
  }, [isLoggedIn, checkPlan]);

  console.log(plan);

  return (
    <nav className="sticky z-[100] h-20 inset-x-0 top-0 w-full border-b border-[#ddd] dark:border-[#666] backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            <img src="/logo.png" alt="Logo" className="w-10" />
            Predictify
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                  onClick={() => logout()}>
                  <LogOut className="mr-1.5 h-5 w-5" />
                  Sign out
                </Link>
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/workspace"
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  <GanttChart className="mr-1.5 h-5 w-5" />
                  Workspace
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  <LogIn className="mr-1.5 h-5 w-5" />
                  Login
                </Link>
                <Separator orientation='vertical' className='h-8'/>

                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  Get started
                  <ChevronRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
