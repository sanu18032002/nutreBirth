export async function loginWithGoogle(idToken: string) {
  const apiBaseUrl =
    (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://localhost:8080'

  const res = await fetch(`${apiBaseUrl}/auth/google`, {
    method: 'POST',
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
