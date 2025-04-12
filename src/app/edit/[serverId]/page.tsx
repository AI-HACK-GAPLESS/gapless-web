'use client';

import { useCreateEntries } from '@/shared/apis/create-dic-entries';
import { queryKeyFactory } from '@/shared/apis/query-key-factory';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const platform = 'discord';

const Page = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { replace } = useRouter();

  const queryClient = useQueryClient();
  const prevData = queryClient.getQueryData(queryKeyFactory.dict.all);

  const [data, setData] = React.useState<
    { keyword: string; description: string }[]
  >([]);

  const createMutation = useCreateEntries();

  const onCreate = () => {
    const isValid = data?.every((item) => {
      return item.keyword && item.description;
    });
    if (!isValid) {
      toast.error('Please fill in all fields.');
      return;
    }
    createMutation.mutate(
      {
        server_id: serverId as string,
        platform,
        entries: data as any,
      },
      {
        onSuccess: () => {
          toast.success('Successfully created dictionary entries.');
          replace(`/view/${serverId}`);
        },
      }
    );
  };

  React.useEffect(() => {
    if (!prevData) {
      return;
    }
    setData(prevData as any);
  }, [prevData]);

  return (
    <main className="w-full p-10 min-h-svh bg-[#15161A] flex flex-col">
      <div className="flex flex-col gap-8 items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} priority />
        <h1 className="text-[#A9ABB8] font-semibold text-2xl">
          Edit Dictionary
        </h1>
      </div>

      <div className="mt-10 max-w-xl container mx-auto flex-1 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {(data ?? []).map((item, i) => (
            <div key={i} className="bg-[#2B2D36] p-4 rounded-lg">
              <input
                type="text"
                className="w-full bg-[#2B2D36] text-[#A9ABB8] border-none outline-none"
                value={item.keyword}
                onChange={(e) => {
                  const newData = [...(data ?? [])];
                  newData[i].keyword = e.target.value;
                  setData(newData);
                }}
              />
              <textarea
                className="w-full bg-[#2B2D36] text-[#A9ABB8] border-none outline-none mt-2"
                value={item.description}
                onChange={(e) => {
                  const newData = [...(data ?? [])];
                  newData[i].description = e.target.value;
                  setData(newData);
                }}
                rows={4}
                placeholder="Description"
              />
            </div>
          ))}
        </div>

        <Button
          // disabled={disabled}
          onClick={onCreate}
          className={cn(
            'bg-[#FF006F] text-white hover:bg-[#FF006F] hover:scale-97'
          )}
        >
          {createMutation.isPending ? 'CREATING...' : 'CREATE'}
        </Button>
      </div>
    </main>
  );
};

export default Page;
