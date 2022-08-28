import { QueryClient } from '@tanstack/react-query';
import { pathOr } from 'ramda';
import { toast } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      onError: (error) => {
        const errorCode = pathOr(-1, ['response', 'data', 'code'], error);
        const errorMessage = pathOr('unknow error, please try again.', ['response', 'data', 'message'], error);
        toast.error(`${errorMessage}(${errorCode})`);
      },
    },
  },
});

export default queryClient;
