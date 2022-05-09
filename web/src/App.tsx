import {
  HiOutlineSun,
  HiOutlineMoon
} from 'react-icons/hi'
import {
  Center,
  useColorMode,
  Circle
} from '@chakra-ui/react'
import RelayEnvironment from './relay/environment'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import { Routes } from './routes/Authentication'

function App() {
  const { colorMode, setColorMode } = useColorMode()

  return (
    <>
      <Center h={'100vh'} backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}>
        <Routes />
      </Center>

      <Circle
        position={'absolute'}
        top={0}
        right={0}
        onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        size={'3em'}
      >
        {colorMode === 'dark' ? <HiOutlineSun size={'1.5em'} /> : <HiOutlineMoon size={'1.5em'} />}
      </Circle>
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
