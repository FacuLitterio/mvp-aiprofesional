// API Types
export type NewsRequest = {
  session: string
  news: string
}

export type NewsResponse = {
  Titulos: string[]
  Slug: string
  Categoria: string
  Noticia: string
}

export type IAPIError = {
  message: string
  status?: number
  retry?: boolean
}

export class APIError extends Error implements IAPIError {
  status?: number
  retry?: boolean

  constructor(message: string, status?: number, retry = true) {
    super(message)
    this.name = "APIError"
    this.status = status
    this.retry = retry
  }
}

// Wizard State Types
export type WizardState = {
  step: number
  originalNews: string
  selectedTitle: string
  editableTitle: string
  slug: string
  category: string
  optimizedNews: string
  titles: string[]
  internalLinks: string[]
  subtitles: string[]
  keyTerms: string[]
}

// SEO Metrics Types
export type SEOMetrics = {
  titleLength: number
  slugLength: number
  keywordDensity: number
  isValidTitle: boolean
  isValidSlug: boolean
}
