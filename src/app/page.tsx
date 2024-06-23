import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { ArrowRight, Check, Star } from 'lucide-react';
import Phone from '@/components/Phone';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-4 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 place-items-center">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              {/* <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28' />
                <img src='https://prabinbhatt.com.np/static/media/prabin.feee7f0e28ded5421b08.png' className='w-full' />
              </div> */}

              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-3xl md:text-4xl lg:text-5xl">
                <span className="bg-primary px-2 text-white">Analyze</span> Your business By
                yorself.
              </h1>

              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,{' '}
                <span className="font-semibold">one-of-one</span> phone case. CaseCobra allows you
                to protect your memories, not just your phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Data Visualization
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Feature Engineering
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Train data
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Prediction from trained model
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div className="col-span-full lg:col-span-2 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit ">
            <div className="relative md:max-w-xl">
              <Image
                src="/line.png"
                className="absolute w-20 -left-6 -bottom-6 select-none"
                alt="Description"
              />
              <Phone className="w-full" imgSrc="" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <Footer />
    </div>
  );
}
