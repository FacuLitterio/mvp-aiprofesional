import type { SEOMetrics } from "../types"

export const validateTitle = (title: string): boolean => {
  const length = title.length
  return length >= 35 && length <= 65 && !/^[0-9\s]*$/.test(title)
}

export const validateSlug = (slug: string): boolean => {
  const kebabCaseRegex = /^[a-z0-9-]+$/
  const length = slug.length
  return (
    kebabCaseRegex.test(slug) &&
    length > 0 &&
    length <= 60 &&
    !slug.startsWith("-") &&
    !slug.endsWith("-")
  )
}

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60)
    .replace(/^-+|-+$/g, "")
}

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

export const extractKeyTerms = (text: string): string[] => {
  const words = text
    .toLowerCase()
    .replace(/[^\w\sáéíóúñü]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 3)

  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 12)
    .map(([word]) => word)
}

export const generateSubtitles = (news: string): string[] => {
  const sentences = news.split(/[.!?]+/).filter(s => s.trim().length > 20)
  return sentences.slice(0, 2).map(s => s.trim())
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

// Function to extract markdown links from HTML content
export const extractMarkdownLinks = (htmlContent: string): string[] => {
  if (!htmlContent) return []

  // Match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links: string[] = []
  let match

  while ((match = markdownLinkRegex.exec(htmlContent)) !== null) {
    const linkText = match[1]
    const linkUrl = match[2]
    links.push(`${linkText} (${linkUrl})`)
  }

  return links
}

// Function to convert markdown links to HTML links
export const convertMarkdownLinksToHTML = (htmlContent: string): string => {
  if (!htmlContent) return ""

  return htmlContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  )
}

// Function to extract URL and text from internal link format
export const parseInternalLink = (
  linkText: string,
): { url: string; text: string } => {
  const urlRegex = /\(([^)]+)\)$/
  const urlMatch = urlRegex.exec(linkText)
  const url = urlMatch ? urlMatch[1] : ""
  const text = linkText.replace(/\s*\([^)]+\)$/, "")

  return { url, text }
}

// Function to extract subtitles from HTML content
export const extractSubtitlesFromHTML = (htmlContent: string): string[] => {
  if (!htmlContent) return []

  const subtitleMatches = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/g)
  if (subtitleMatches) {
    return subtitleMatches.map(match =>
      match.replace(/<h2[^>]*>(.*?)<\/h2>/, "$1"),
    )
  }
  return []
}
