import { getToken, isTokenExpired, setToken } from "@/features/auth/tokens"
import { fetchBaseQuery } from "@reduxjs/toolkit/query"

const apiUrl: string = 'https://api.lk-umiter.ru/v1/'

// export async function fetchApi<T>(
//   path: string,
//   init?: RequestInit,
// ): Promise<T> {
//   const response = await fetch(`${apiUrl}${path}`, init)
//   return await response.json()
// }

// export async function fetchApiResponse(
//   path: string,
//   init?: RequestInit,
// ) {
//   const response = await fetch(`${apiUrl}${path}`, init)
//   return response
// }

// const requestMiddleware = async (request) => {
//   if (isTokenExpired('access')) setToken('access', null);

//   const token = getToken('access');
//   if (token) {
//     return {
//       ...request,
//       headers: {
//         ...request.headers,
//         Authorization: `Bearer ${token}`,
//       },
//     };
//   }

//   return request;
// };

// export async function fetchApiAuth(
//   path: string,
//   init?: RequestInit,
// ) {
//   const modifiedRequest = await requestMiddleware({
//     ...init,
//     headers: {
//       ...init?.headers,
//     },
//   });

//   const response = await fetch(`${apiUrl}${path}`, modifiedRequest);
//   return await response.json();
// }

// export async function fetchApiAuthResponse(
//   path: string,
//   init?: RequestInit,
// ) {
//   const modifiedRequest = await requestMiddleware({
//     ...init,
//     headers: {
//       ...init?.headers,
//     },
//   });

//   const response = await fetch(`${apiUrl}${path}`, modifiedRequest);
//   return response;
// }

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
      if (isTokenExpired('access')) setToken('access', null);
      const token = getToken('access');
      if (token) {
          headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
  },
});