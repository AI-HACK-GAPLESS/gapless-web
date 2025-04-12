import toast from 'react-hot-toast';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { PATH_API } from './path';

type Payload = {
  platform: 'discord' | 'slack';
  server_id: string;
  title: string;
  description: string;
};

export const customServer = async (data: Payload) => {
  const response = await fetch(PATH_API.customServer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to customizing server');
  }

  return response.json();
};

// query
export const useCustomServer = (
  options?: Omit<UseMutationOptions<Payload, unknown, unknown>, 'mutationKey'>
) => {
  return useMutation({
    mutationFn: customServer,
    onError: () => {
      toast.error('failed to customize the server.');
    },
    ...options,
  });
};
