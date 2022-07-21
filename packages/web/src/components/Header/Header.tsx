import {
  Flex,
  Text,
  Button,
  useDisclosure,
  useColorMode,
  Avatar,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { HeaderDrawer } from '../HeaderDrawer/HeaderDrawer'

export const Header = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

  return (
    <Flex
      as="header"
      p={"1em"}
      w='100%'
      bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
      justifyContent={'center'}
    >
      <Flex
        alignItems={'center'}
        w={['100%', '100%', '48em']}
        justifyContent={"space-between"}
      >
        <Button
          variant={'unstyled'}
          onClick={() => navigate('/')}
        >
          <Text
            fontSize={'3xl'}
            fontWeight={'bold'}
          >
            Cloneboxd
          </Text>
        </Button>

        <Avatar
          as='button'
          size='sm'
          cursor={'pointer'}
          onClick={onOpen}
        />

        <HeaderDrawer
          isOpen={isOpen}
          onClose={onClose}
        />
      </Flex>
    </Flex>
  )
}