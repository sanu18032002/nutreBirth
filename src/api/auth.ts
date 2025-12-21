export async function loginWithGoogle(idToken: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
  const res = await fetch(`${baseUrl}/auth/google`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ idToken }),
  })

  if (!res.ok) {
    throw new Error('Authentication failed')
  }

  return res.json()
}
