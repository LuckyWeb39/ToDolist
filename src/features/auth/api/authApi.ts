import {LoginInputs} from "@/features/auth/lid/schemas";
import {BaseResponse} from "@/common/types";
import {baseApi} from "@/app/baseApi.ts";

export const authApi = baseApi.injectEndpoints({

    endpoints: (build) => ({

        me: build.query<BaseResponse<{id: number; email: string; login: string}>, void>({
            query: ()=> 'auth/me'
        }),

        login: build.mutation<BaseResponse<{userId: number; token: string}>, LoginInputs>({
            query: body => ({
                url: 'auth/login',
                method: 'POST',
                body,
            })
        }),

        logout: build.mutation<BaseResponse, void>({
            query: ()=>({
                url: 'auth/login',
                method: 'DELETE',
            })
        }),
    })
})

export const {useMeQuery, useLoginMutation, useLogoutMutation} = authApi