export const generateSubtitles = (news: string): string[] => {
  const sentences = news.split(/[.!?]+/).filter(s => s.trim().length > 20)
  return sentences.slice(0, 2).map(s => s.trim())
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
