const getFirstLetters = (name: string | undefined) => {
  const avatarLetters =
    name
      ?.split(" ")
      .map(word => word[0].toUpperCase())
      .join("")
      .slice(0, 2) ?? ""
  return avatarLetters
}

export default getFirstLetters
