import toast from 'react-hot-toast';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { PATH_API } from './path';

type Payload = {
  platform: 'discord' | 'slack';
  server_id: string;
  entries: { keyword: string; description: string }[];
};

export const createDictEntries = async (data: Payload) => {
  const response = await fetch(PATH_API.dict.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to create entries');
  }

  return response.json();
};

// query
export const useCreateEntries = (
  options?: Omit<UseMutationOptions<Payload, unknown, unknown>, 'mutationKey'>
) => {
  return useMutation({
    mutationFn: createDictEntries,
    onError: () => {
      toast.error('failed to create entries');
    },
    ...options,
  });
};
