import type { SEOMetrics } from "../types"
import { validateTitle, validateSlug } from "./validation"

export const calculateKeywordDensity = (
  text: string,
  keyword: string,
): number => {
  if (!keyword) return 0

  const words = text.toLowerCase().split(/\s+/)
  const keywordCount = words.filter(word =>
    word.includes(keyword.toLowerCase()),
  ).length

  return words.length > 0 ? (keywordCount / words.length) * 100 : 0
}

export const calculateSEOMetrics = (
  title: string,
  slug: string,
  content: string,
): SEOMetrics => {
  const titleWords = title.toLowerCase().split(/\s+/)
  const mainKeyword = titleWords[0] || ""

  return {
    titleLength: title.length,
    slugLength: slug.length,
    keywordDensity: calculateKeywordDensity(content, mainKeyword),
    isValidTitle: validateTitle(title),
    isValidSlug: validateSlug(slug),
  }
}
