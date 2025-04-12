'use client';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';
import Image from 'next/image';
import React from 'react';
import UploadPdf from './upload-pdf';
import UploadText from './upload-text';

const Page = () => {
  const [tab, setTab] = React.useState<'pdf' | 'text'>('pdf');

  return (
    <main className="w-full p-10 min-h-svh bg-[#15161A] flex flex-col">
      <div className="flex flex-col gap-8 items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} priority />
        <h1 className="text-[#A9ABB8] font-semibold text-2xl">
          Upload Dictionary
        </h1>
      </div>

      <div className="mt-10 max-w-xl container mx-auto flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="w-full flex gap-4">
            <Button
              className={cn(
                'flex-1',
                tab === 'pdf'
                  ? 'bg-[#FF006F] text-white hover:bg-[#FF006F]'
                  : 'bg-[#2B2D36] hover:bg-[#2B2D36]'
              )}
              onClick={() => setTab('pdf')}
            >
              PDF
            </Button>
            <Button
              className={cn(
                'flex-1',
                tab === 'text'
                  ? 'bg-[#FF006F] text-white hover:bg-[#FF006F]'
                  : 'bg-[#2B2D36] hover:bg-[#2B2D36]'
              )}
              onClick={() => setTab('text')}
            >
              Text
            </Button>
          </div>

          {tab === 'pdf' ? <UploadPdf /> : <UploadText />}
        </div>
      </div>
    </main>
  );
};

export default Page;
