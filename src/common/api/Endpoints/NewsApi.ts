import type {
  NewsRequest,
  NewsResponse,
} from "../../../features/NewArticle/types"
import { api } from "../api"

const API_ENDPOINT = "https://n8n.entalab.dev/webhook/news"
const TIMEOUT_MS = 600000 // 10 minutes

export const NewsApi = api.injectEndpoints({
  endpoints: builder => ({
    generateNews: builder.mutation<NewsResponse, NewsRequest>({
      query: request => ({
        url: API_ENDPOINT,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: request,
        // Custom timeout handling
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }),
      // Transform response to handle the output wrapper
      transformResponse: (response: unknown) => {
        // Handle potential response wrapper
        const rawData =
          typeof response === "object" &&
          response !== null &&
          "output" in response
            ? (response as { output: unknown }).output
            : response

        // Validate response structure
        if (
          !rawData ||
          typeof rawData !== "object" ||
          !Array.isArray((rawData as NewsResponse).Titulos) ||
          (rawData as NewsResponse).Titulos.length !== 4
        ) {
          throw new Error("Respuesta inválida: títulos incorrectos")
        }

        const data = rawData as NewsResponse

        if (!data.Slug || !data.Categoria || !data.Noticia) {
          throw new Error("Respuesta inválida: campos faltantes")
        }

        return data
      },
      // Handle errors
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error("Error generating news:", error)
        }
      },
    }),
  }),
})

export const { useGenerateNewsMutation } = NewsApi
