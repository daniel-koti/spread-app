export function getNamesInitials(fullName: string) {
  if (typeof fullName !== 'string') {
    return ''
  }

  const words = fullName.split(' ')

  const firstCharacter = words[0].charAt(0)
  const lastCharacter = words[words.length - 1].charAt(0)

  return firstCharacter + lastCharacter
}

export const convertFileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      if (reader.result) {
        const base64String = reader.result?.toString()
        resolve(base64String)
      } else {
        reject(new Error('Erro ao converter o arquivo para base64'))
      }
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
}
