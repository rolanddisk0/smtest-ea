import { useContext } from 'react'
import { UserContext } from 'context/user'

const useUser = () => {
  const context = useContext(UserContext)
  return context
}

export default useUser
