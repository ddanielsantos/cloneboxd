import { Routes } from './routes/authRoute'
import RelayEnvironment from './relay/environment'
import { Center, useColorMode } from '@chakra-ui/react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { AuthProvider } from './contexts/AuthContext'
import { Suspense } from 'react'

function App() {
  const { colorMode } = useColorMode()

  return (
    <>
      <Center h={'100vh'} backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
        <Suspense fallback={'Loading...'}>
          <Routes />
        </Suspense>
      </Center>
    </>
  )
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
