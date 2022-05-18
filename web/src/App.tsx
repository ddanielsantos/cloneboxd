import { Suspense } from 'react'
import { Center } from '@chakra-ui/react'
import { Routes } from './routes/authRoute'
import { Providers } from './Providers'

function App() {
  return (
    <Suspense fallback={'Loading...'}>
      <Center h={'100vh'}>
        <Routes />
      </Center>
    </Suspense>
  )
}

function AppRoot() {
  return (
    <Providers>
      <App />
    </Providers>
  )
}

export default AppRoot
