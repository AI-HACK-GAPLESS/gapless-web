const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://gapless.vercel.app/api/'
    : 'http://localhost:3000/api/';

const path = (pathname: string) => BASE_URL + pathname;

export const PATH_API = {
  customServer: path('custom-server'),
  isRegistered: path('custom-server/is-registered'),
  dict: {
    all: path('get_dict_entries'),
    create: path('register_dict_entries'),
    update: path('update_dict_entries'),
    delete: path('delete_dict_entries'),
  },
  upload: (type: 'pdf' | 'text') => path(`upload-dict/${type}`),
};
