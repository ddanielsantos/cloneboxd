import { Routes } from './routes/authRoute'
import RelayEnvironment from './relay/environment'
import { Center, useColorMode } from '@chakra-ui/react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

function App() {
  const { colorMode } = useColorMode()

  return (
    <>
      <Center h={'100vh'} backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
        <Routes />
      </Center>
    </>
  )
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <App />
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
