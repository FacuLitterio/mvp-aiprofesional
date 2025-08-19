import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useGenerateNewsMutation } from "../../../common/api/Endpoints/NewsApi"
import type { IAPIError, NewsRequest, NewsResponse } from "../types"
import { APIError } from "../types"

export const useNewsGenerator = () => {
  const [generateNewsMutation, { isLoading }] = useGenerateNewsMutation()
  const [error, setError] = useState<IAPIError | null>(null)

  const generateNews = useCallback(
    async (news: string): Promise<NewsResponse> => {
      setError(null)

      const sessionId = uuidv4()
      const request: NewsRequest = {
        session: sessionId,
        news: news.slice(0, 20000), // Limitar tamaño
      }

      try {
        const response = await generateNewsMutation(request).unwrap()
        return response
      } catch (err: unknown) {
        // Type-safe error handling
        const errorMessage =
          err instanceof Error
            ? err.message
            : typeof err === "object" && err !== null && "data" in err
              ? ((err.data as { message?: string }).message ??
                "Error desconocido")
              : "Error desconocido"

        const errorStatus =
          typeof err === "object" && err !== null && "status" in err
            ? (err.status as number)
            : undefined

        const apiError: IAPIError = {
          message: errorMessage,
          status: errorStatus,
          retry: errorStatus ? errorStatus >= 500 : true,
        }

        setError(apiError)
        throw new APIError(
          apiError.message,
          apiError.status,
          apiError.retry ?? true,
        )
      }
    },
    [generateNewsMutation],
  )

  const generateFallback = useCallback((news: string): NewsResponse => {
    // Fallback local si la IA falla
    const words = news.toLowerCase().split(/\s+/).slice(0, 50)
    const firstSentence = news.split(".")[0]

    const fallbackTitles = [
      firstSentence.slice(0, 60),
      `Noticia: ${firstSentence.slice(0, 50)}`,
      `Último momento: ${words.slice(0, 8).join(" ")}`,
      `Actualidad: ${words.slice(2, 10).join(" ")}`,
    ]

    const slug = firstSentence
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60)

    return {
      Titulos: fallbackTitles,
      Slug: slug,
      Categoria: "general",
      Noticia: news,
    }
  }, [])

  return {
    generateNews,
    generateFallback,
    loading: isLoading,
    error,
  }
}
