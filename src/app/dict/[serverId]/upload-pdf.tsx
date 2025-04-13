import { queryKeyFactory } from '@/shared/apis/query-key-factory';
import { useUploadFile } from '@/shared/apis/upload-pdf';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const UploadPdf = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const { replace } = useRouter();

  const queryClient = useQueryClient();

  const [file, setFile] = React.useState<File | null>(null);

  const submitMutation = useUploadFile();

  const onFileChange = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    setFile(file);
  };

  const onSubmit = () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }
    submitMutation.mutate(file, {
      onSuccess: (data: any) => {
        toast.success('File uploaded successfully');
        queryClient.setQueryData(queryKeyFactory.dict.all, data.terms);
        replace(`/edit/${serverId}`);
      },
      onError: () => {
        toast.error('Failed to upload file');
      },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileChange,
  });

  const disabled = submitMutation.isPending || !file;

  return (
    <div className="mt-10 w-full flex flex-col gap-10">
      <div
        {...getRootProps()}
        className="w-full h-32 border-dashed border-2 border-[#FF006F] rounded-lg flex justify-center items-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-[#A9ABB8]">Drop the files here ...</p>
        ) : (
          <p className="text-[#00B7C3] flex items-center gap-2">
            <svg
              width="19"
              height="22"
              viewBox="0 0 19 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7089 6.37056L4.78039 14.2155C4.10674 14.882 4.10674 15.9627 4.78039 16.6293C5.45405 17.2958 6.54627 17.2958 7.21993 16.6293L16.3682 7.57747C17.7155 6.24435 17.7155 4.08295 16.3682 2.74984C15.0209 1.41672 12.8364 1.41672 11.4891 2.74984L2.63683 11.5088C2.55164 11.5931 2.50905 11.6352 2.46894 11.6768C1.63145 12.546 1.15139 13.6927 1.12248 14.8932C1.12109 14.9507 1.12109 15.0103 1.12109 15.1295C1.12109 15.4014 1.12109 15.5374 1.12663 15.6523C1.2464 18.1378 3.25583 20.126 5.7678 20.2445C5.88391 20.25 6.02132 20.25 6.29613 20.25C6.4166 20.25 6.47683 20.25 6.53493 20.2486C7.74824 20.22 8.90721 19.745 9.78559 18.9164C9.82765 18.8767 9.87024 18.8345 9.95543 18.7502L16.3682 12.4051"
                stroke="#00B7C3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Drag and drop a file here, click to upload
          </p>
        )}
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

export default UploadPdf;
