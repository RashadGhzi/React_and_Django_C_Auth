// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    userCreation: builder.mutation({
      query: (body) => ({
        url: 'usercreationapi/',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    userLogin: builder.mutation({
      query: (body) => ({
        url: 'userloginapi/',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }),
    userProfile: builder.query({
      query: (access_token) => ({
        url: 'userprofileapi/',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${access_token}`,
        }
      })
    }),
    changePassword: builder.mutation({
      query: ({ body, access_token }) => ({
        url: `changepasswordapi/`,
        method: 'PUT',
        body: body,
        headers: {
          'authorization': `Bearer ${access_token}`,
          'content-type': 'application/json',
        }
      })
    }),
    passwordReset: builder.mutation({
      query: ((body) => {
        // console.log('email ',body);
        return {
          url: 'send/password/reset/email/',
          method: 'POST',
          body: body,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      })
    }),
    passwordResetConfirm: builder.mutation({
      query: ({ body, id, token }) => ({
        url: `reset/password/confirm/${id}/${token}/`,
        method: 'POST',
        body: body,
        headers: {
          'content-type': 'application/json',
        }
      })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserCreationMutation, useUserLoginMutation, useUserProfileQuery, useChangePasswordMutation, usePasswordResetMutation, usePasswordResetConfirmMutation } = userAuthApi;