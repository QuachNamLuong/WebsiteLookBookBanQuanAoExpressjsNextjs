
export async function uploadImage(
  file: File,
  onProgress: (event: { progress: number }) => void,
  signal: AbortSignal
): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("/api/upload/image", {
    method: "POST",
    body: formData,
    signal,
  })

  if (!res.ok) {
    throw new Error("Image upload failed")
  }

  const data = await res.json()

  // MUST return the image URL
  return data.url
}
