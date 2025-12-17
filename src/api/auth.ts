export async function loginWithGoogle(idToken: string) {
  const res = await fetch('http://localhost:8080/auth/google', {
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
