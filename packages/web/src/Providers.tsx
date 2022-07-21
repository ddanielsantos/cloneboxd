import theme from './theme'
import '@fontsource/inter/800.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/400.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import RelayEnvironment from './relay/environment'
import { AuthProvider } from './contexts/AuthContext'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <BrowserRouter>
        <ChakraProvider
          theme={theme}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  )
}