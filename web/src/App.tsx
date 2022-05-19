import { Center } from '@chakra-ui/react'
import { Routes } from './routes/authRoute'
import { Providers } from './Providers'
import ErrorBoundaryRetry from './ErrorBoundary'

function App() {
  return (
    <Center h={'100vh'}>
      <Routes />
    </Center>
  )
}

function AppRoot() {
  return (
    <Providers>
      <ErrorBoundaryRetry>
        <App />
      </ErrorBoundaryRetry>
    </Providers>
  )
}

export default AppRoot
