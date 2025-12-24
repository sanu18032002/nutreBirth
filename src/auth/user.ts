export type AppUser = {
  email: string
  name: string
  plan: 'FREE' | 'PREMIUM'
}

export function getUser(): AppUser | null {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}

export function isPremium(): boolean {
  return getUser()?.plan === 'PREMIUM'
}
