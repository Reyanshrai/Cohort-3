import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const refreshUser = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      setUser(null)
      setIsLoading(false)
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to fetch user data')
      }

      setUser(result.data.user)
      return result.data.user
    } catch (requestError) {
      setUser(null)
      setError(requestError.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearUser = () => {
    localStorage.removeItem('accessToken')
    setUser(null)
    setError(null)
  }

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  return (
    <UserContext.Provider
      value={{ user, isLoading, error, setUser, refreshUser, clearUser }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used inside a UserProvider')
  }

  return context
}