export function getNamesInitials(fullName: string) {
  if (typeof fullName !== 'string') {
    return ''
  }

  const words = fullName.split(' ')

  const firstCharacter = words[0].charAt(0)
  const lastCharacter = words[words.length - 1].charAt(0)

  return firstCharacter + lastCharacter
}
