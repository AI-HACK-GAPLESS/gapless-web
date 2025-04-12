import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { PATH_API } from './path';

export const uploadText = async (data: string) => {
  const response = await fetch(PATH_API.upload('text'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: data }),
  });

  if (!response.ok) {
    throw new Error('Failed to upload text');
  }

  return response.json();
};

// query
export const useUploadText = (
  options?: Omit<UseMutationOptions<string, unknown, unknown>, 'mutationKey'>
) => {
  return useMutation({
    mutationFn: uploadText,
    ...options,
  });
};
