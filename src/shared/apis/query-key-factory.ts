import { PATH_API } from './path';

export const queryKeyFactory = {
  isRegistered: [PATH_API.isRegistered] as const,
  dict: {
    all: [PATH_API.dict.all] as const,
  },
};
