import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = import.meta.env.VITE_API_URL as string

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: headers => {
    headers.set("Authorization", `Bearer null`)
    return headers
  },
})

export const api = createApi({
  tagTypes: [],
  baseQuery,
  endpoints: () => ({}),
})
