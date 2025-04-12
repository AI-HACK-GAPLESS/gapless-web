import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { PATH_API } from './path';
import { queryKeyFactory } from './query-key-factory';

const getDictEntries = async (server_id: string, platform = 'discord') => {
  const response = await fetch(
    PATH_API.dict.all + `?server_id=${server_id}&platform=${platform}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch dict entries.');
  }
  return response.json();
};

// query
interface ResponseType {
  keyword: string;
  description: string;
  id?: string;
}

export const useGetDictEntries = ({
  serverId,
  platform,
  ...props
}: { serverId: string; platform: 'discord' | 'slack' } & Omit<
  UseQueryOptions,
  'queryKey'
>) => {
  return useQuery({
    queryKey: queryKeyFactory.dict.all,
    queryFn: async () => {
      const res = await getDictEntries(serverId, platform);

      return res.entries;
    },
    enabled: !!serverId && !!platform,
    ...props,
  }) as UseQueryResult<ResponseType[], Error>;
};
