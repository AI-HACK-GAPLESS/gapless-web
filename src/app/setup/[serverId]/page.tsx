'use client';

import { useCustomServer } from '@/shared/apis/custom-server';
import { useGutIsRegistered } from '@/shared/apis/is-registered';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const platform = 'discord';

const Page = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { replace } = useRouter();

  const [values, setValues] = React.useState({ title: '', description: '' });

  const { data, isLoading } = useGutIsRegistered({
    serverId,
    platform,
  });
  const submitMutation = useCustomServer();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (!values.title) {
      toast.error('Please enter a server title.');
      return;
    }
    submitMutation.mutate(
      {
        server_id: serverId as string,
        platform,
        ...values,
      },
      {
        onSuccess: () => {
          toast.success('Successfully customized the server.');
          replace(`/dict/${serverId}`);
        },
      }
    );
  };

  const disabled = submitMutation.isPending || !values.title;

  return (
    <main className="w-full p-10 min-h-svh bg-[#15161A] flex flex-col">
      {isLoading ? (
        <div className="flex flex-col gap-8 items-center my-auto">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            priority
            className="animate-spin"
            style={{ animationDuration: '2s' }}
          />
          <h1 className="text-[#A9ABB8] font-semibold text-2xl">Loading...</h1>
        </div>
      ) : data?.is_registered ? (
        <div className="flex flex-col gap-8 items-center my-auto">
          <Image src="/logo.png" alt="Logo" width={100} height={100} priority />
          <h1 className="text-[#A9ABB8] font-semibold text-2xl">
            Server Already Registered
          </h1>
          <p className="text-[#A9ABB8] text-lg">
            This server is already registered. Please use a different server.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              priority
            />
            <h1 className="text-[#A9ABB8] font-semibold text-2xl">
              Setup Server
            </h1>
          </div>

          <div className="mt-10 max-w-xl container mx-auto flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[#00B7C3]">Server Title</label>
              <input
                name="title"
                placeholder="Server Title"
                value={values.title}
                onChange={onChange}
                className="w-full p-2 rounded-md bg-[#1A1C21] text-[#A9ABB8]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#00B7C3]">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                value={values.description}
                onChange={onChange}
                rows={10}
                className="w-full p-2 rounded-md bg-[#1A1C21] text-[#A9ABB8]"
              />
            </div>

            <Button
              disabled={disabled}
              onClick={onSubmit}
              className={cn(
                disabled
                  ? 'bg-[#2B2D36] hover:bg-[#2B2D36] cursor-not-allowed'
                  : 'bg-[#FF006F] text-white hover:bg-[#FF006F] hover:scale-97'
              )}
            >
              {submitMutation.isPending ? 'SAVING...' : 'SAVE'}
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
