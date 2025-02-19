import { apiBaseQuery } from "./api"
import { createApi } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getUserInfo: builder.query<any, void>({
      query: () => '/user',
    }),
    updatePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (data) => ({
        url: 'user/password',
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteUserAccount: builder.mutation<void, { password: string }>({
      query: (data) => ({
        url: 'user',
        method: 'DELETE',
        body: data,
      }),
    }),
    updateUserInfo: builder.mutation<void, { name: string }>({
      query: (data) => ({
        url: 'user',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdatePasswordMutation,
  useDeleteUserAccountMutation,
  useUpdateUserInfoMutation,
} = userApi;