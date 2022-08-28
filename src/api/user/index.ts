import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiCaller from 'src/api/apiCaller';
import { toast } from 'react-toastify';
import { values } from 'ramda';

type IProfile = {
  signUpAt: string;
  email: string;
  name: string;
  registerSource: string;
  emailVerified: boolean;
};

export const useMineProfile = (options?: UseQueryOptions<IProfile>) => useQuery<IProfile>(
  ['useMineProfile'],
  () => apiCaller.get<IProfile, IProfile>('/users/mine/profile'),
  options,
);

export const useUpdateName = () => useMutation(
  (body: { name: string }) => apiCaller.put('/users/mine/profile', body),
  {
    onSuccess: () => {
      toast.success('Update name success.');
    },
  },
);

type IUpdatePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const useUpdatePassword = () => useMutation(
  (body: IUpdatePassword) => apiCaller.put('/users/mine/password', body),
  {
    onSuccess: () => {
      toast.success('Update password success.');
    },
  },
);

type IUsersStatistics = {
  userCount: number;
  todayActivedSessionCount: number;
  averageActivedSessionCountLastWeek: number;
};

export const useUsersStatistics = (
  options?: UseQueryOptions<IUsersStatistics>,
) => useQuery<IUsersStatistics>(
  ['useUsersStatistics'],
  () => apiCaller.get<IUsersStatistics, IUsersStatistics>('/users/statistics'),
  options,
);

type IUser = {
  id: number;
  name: string;
  loginCount: number;
  signUpAt: string;
  lastSessionAt: string;
};

export const useUsers = (
  querys: IPaginationQuery,
  options?: UseQueryOptions<IApiPaginationResponse<IUser>>,
) => useQuery<IApiPaginationResponse<IUser>>(
  ['useUsers', ...values(querys)],
  () => apiCaller.get<
  IApiPaginationResponse<IUser>,
  IApiPaginationResponse<IUser>
  >('/users', {
    params: {
      ...querys,
    },
  }),
  options,
);

export const useSendVerificationEmail = () => useMutation(() => apiCaller.post('/users/mine/verificationEmail'), {
  onSuccess: () => {
    toast.success('Send verification email success.');
  },
});

export const useUserSession = () => useMutation(() => apiCaller.put('/users/mine/session'));
