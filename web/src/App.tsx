import { Login } from './pages/Login'
import {
  HiOutlineSun,
  HiOutlineMoon
} from 'react-icons/hi'
import {
  Center,
  useColorMode,
  Circle
} from '@chakra-ui/react'

function App() {
  const { colorMode, setColorMode } = useColorMode()

  return (
    <>
      <Center
        h={'100vh'}
        backgroundColor={colorMode === 'light' ? 'white' : 'gray.800'}
      >
        <Login />
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

export default App
