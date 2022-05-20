import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import RelayEnvironment from './relay/environment'
import { AuthProvider } from './contexts/AuthContext'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <BrowserRouter>
        <ChakraProvider >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  )
}