'use client';

import { useGetDictEntries } from '@/shared/apis/get-dict-entries';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

const platform = 'discord';

const Page = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { data } = useGetDictEntries({
    serverId,
    platform,
  });

  return (
    <main className="w-full p-10 min-h-svh bg-[#15161A] flex flex-col">
      <div className="flex flex-col gap-8 items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} priority />
        <h1 className="text-[#A9ABB8] font-semibold text-2xl">
          View Dictionary
        </h1>
      </div>

      <div className="mt-10 max-w-xl container mx-auto flex-1 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {(data ?? []).map((item, i) => (
            <div key={i} className="bg-[#2B2D36] p-4 rounded-lg">
              <div className="w-full bg-[#2B2D36] text-[#A9ABB8] border-none outline-none">
                {item.keyword}
              </div>
              <div className="w-full bg-[#2B2D36] text-[#A9ABB8] border-none outline-none mt-2">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
