import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { PATH_API } from './path';
import { queryKeyFactory } from './query-key-factory';
import { useRouter } from 'next/navigation';

const getIsRegistered = async (server_id: string, platform = 'discord') => {
  const response = await fetch(
    PATH_API.isRegistered + `?server_id=${server_id}&platform=${platform}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch is registered.');
  }
  return response.json();
};

// query
interface ResponseType {
  is_registered: boolean;
}

export const useGutIsRegistered = ({
  serverId,
  platform,
  ...props
}: { serverId: string; platform: 'discord' | 'slack' } & Omit<
  UseQueryOptions,
  'queryKey'
>) => {
  const { replace } = useRouter();
  return useQuery({
    queryKey: queryKeyFactory.isRegistered,
    queryFn: async () => {
      const res = await getIsRegistered(serverId, platform);

      if (res.is_registered) {
        return replace('/dict/' + serverId);
      }

      return res;
    },
    enabled: !!serverId && !!platform,
    ...props,
  }) as UseQueryResult<ResponseType, Error>;
};
