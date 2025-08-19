import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = import.meta.env.VITE_API_URL as string

const baseQuery = fetchBaseQuery({
  baseUrl,
})

export const api = createApi({
  tagTypes: ["News"],
  baseQuery,
  endpoints: () => ({}),
})
