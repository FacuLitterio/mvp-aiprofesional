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
