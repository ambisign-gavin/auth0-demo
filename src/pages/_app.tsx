import 'src/styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from 'src/utils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMineProfile, useUserSession } from 'src/api/user';
import { useSetAtom } from 'jotai';
import { isAuthenticatedAtom } from 'src/atom';
import { useRouter } from 'next/router';
import { path, pathEq } from 'ramda';

export const themeOptions: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
        div#__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .Toastify__toast-theme--light.Toastify__toast--success {
          color: #fff;
          background-color: ${theme.palette.success.main};

          .Toastify__close-button {
            color: #ffffff;
          }
        }
        .Toastify__toast-theme--light.Toastify__toast--error {
          color: #fff;
          background-color: ${theme.palette.error.main};

          .Toastify__close-button {
            color: #ffffff;
          }
        }
      `,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#337cff',
    },
    secondary: {
      main: '#b9d2ff',
    },
    background: {
      default: '#202020',
      paper: '#252525',
    },
    text: {
      primary: '#eaeaea',
      secondary: '#747474',
    },
  },
};

const Authenticator = React.memo(() => {
  const { mutate } = useUserSession();

  const router = useRouter();

  const setAuthenticated = useSetAtom(isAuthenticatedAtom);

  const { isFetched, data: profile } = useMineProfile({
    onError: (error) => {
      if (pathEq(['response', 'data', 'code'], 4010001)(error)) {
        router.push('/emailVerification');
      }
      if (pathEq(['response', 'status'], 401)(error)
          && path(['response', 'data', 'loginURL'])(error)) {
        const loginURL: string = path<string>(['response', 'data', 'loginURL'])(error) as string;
        window.location.href = loginURL;
      }
    },
  });

  React.useEffect(() => {
    if (isFetched && profile) {
      mutate(undefined, {
        onSuccess: () => {
          queryClient.refetchQueries(['useUsersStatistics'], {
            exact: false,
          });
          queryClient.refetchQueries(['useUsers'], {
            exact: false,
          });
        },
      });
      setAuthenticated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched, profile]);
  return null;
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={createTheme(themeOptions)}>
        <CssBaseline />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          icon={false}
          transition={Flip}
        />
        <Authenticator />
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
