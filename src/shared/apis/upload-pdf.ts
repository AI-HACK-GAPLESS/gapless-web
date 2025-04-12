import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { PATH_API } from './path';

const convertBase64 = (file: File | Blob): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // 'data:image/...;base64,' 부분을 제거
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String || null);
    };
    // reader.onerror = (error) => reject(error);
    reader.onerror = reject;
  });
};

export const uploadFile = async (data: File) => {
  const response = await fetch(PATH_API.upload('pdf'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ encoded_pdf: await convertBase64(data) }),
  });

  if (!response.ok) {
    throw new Error('Failed to upload file');
  }

  return response.json();
};

// query
export const useUploadFile = (
  options?: Omit<UseMutationOptions<File, unknown, unknown>, 'mutationKey'>
) => {
  return useMutation({
    mutationFn: uploadFile,
    ...options,
  });
};
