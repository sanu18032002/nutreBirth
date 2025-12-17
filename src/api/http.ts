export function authFetch(input: RequestInfo, init?: RequestInit) {
    const token = localStorage.getItem('authToken')

    return fetch(input, {
        ...init,
        headers: {
            ...(init?.headers || {}),
            Authorization: `Bearer ${token}`,
        },
    })
}
