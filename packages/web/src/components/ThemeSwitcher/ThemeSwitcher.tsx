import { Button, useColorMode } from '@chakra-ui/react'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi'

export const ThemeSwitcher = () => {
  const { colorMode, setColorMode } = useColorMode()

  return (
    <Button
      size={'3em'}
      variant={'ghost'}
      onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
    >
      {
        colorMode === 'dark'
          ? <HiOutlineMoon size={'1.5em'} />
          : <HiOutlineSun size={'1.5em'} />
      }
    </Button>
  )
}
