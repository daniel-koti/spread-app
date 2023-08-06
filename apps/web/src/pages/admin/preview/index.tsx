import { useEffect, useState } from 'react'

export default function Preview() {
  const [file, setFile] = useState<string | null>(null)

  useEffect(() => {
    const voucher = localStorage.getItem('voucher')
    setFile(voucher)
  }, [])

  setTimeout(() => {
    localStorage.removeItem('voucher')
  }, 3000)

  return (
    <div className="h-screen w-full">
      <iframe className="w-full h-full" src={file}></iframe>
    </div>
  )
}
