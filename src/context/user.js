import React, { createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const value = {
    username: 'username',
  }
  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}
