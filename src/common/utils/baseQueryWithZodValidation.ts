import { ZodSchema } from "zod/v4";
import type {BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta,} from "@reduxjs/toolkit/query/react";
import {z} from "zod/v4";
import {setAppErrorAC} from "@/app/app-slice.ts";

type TBaseQuery= BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  { dataSchema?: ZodSchema<unknown> },
  FetchBaseQueryMeta
>;

export const baseQueryWithZodValidation: (baseQuery: TBaseQuery) => TBaseQuery =
  (baseQuery: TBaseQuery) => async (args, api, extraOptions) => {

    const returnValue = await baseQuery(args, api, extraOptions);
    const zodSchema = extraOptions?.dataSchema;

    const { data } = returnValue;
    if (data && zodSchema) {
      try {
        zodSchema.parse(data);
      } catch (error) {
          if (error instanceof z.ZodError) {
              console.table(error.issues)
              api.dispatch(setAppErrorAC({ error: "Zod error. Смотри консоль" }))
          }
      }
    }
    return returnValue;
  };