import { queryKeyFactory } from '@/shared/apis/query-key-factory';
import { useUploadText } from '@/shared/apis/upload-text';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const UploadText = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { replace } = useRouter();

  const [text, setText] = React.useState('');

  const queryClient = useQueryClient();

  const submitMutation = useUploadText();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const onSubmit = () => {
    if (!text) {
      toast.error('Please enter text to upload.');
      return;
    }

    submitMutation.mutate(text, {
      onSuccess: (data: any) => {
        toast.success('Text uploaded successfully');
        queryClient.setQueryData(queryKeyFactory.dict.all, data.terms);
        replace(`/edit/${serverId}`);
      },
      onError: () => {
        toast.error('Failed to upload text');
      },
    });
  };

  const disabled = submitMutation.isPending || !text;

  return (
    <div className="mt-10 w-full flex flex-col gap-10">
      <div className="w-full h-32 border-dashed border-2 border-[#FF006F] rounded-lg flex justify-center items-center cursor-pointer">
        <textarea
          className="w-full h-full p-4 bg-[#2B2D36] text-[#A9ABB8] rounded-lg"
          placeholder="Enter your text here..."
          value={text}
          onChange={onChange}
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
        {submitMutation.isPending ? 'SUBMITTING...' : 'SUBMIT'}
      </Button>
    </div>
  );
};

export default UploadText;
