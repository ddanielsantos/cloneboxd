import {
  Flex,
  Text,
  Circle,
  useDisclosure,
} from '@chakra-ui/react'
import { HeaderDrawer } from '../HeaderDrawer/HeaderDrawer'

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex
      py={"1em"}
      px={"3em"}
      w={'100%'}
      justifyContent={'center'}
    >
      <Flex
        alignItems={'center'}
        w={["100%", "100%", "48em"]}
        justifyContent={"space-between"}
      >
        <Text
          fontSize={[20]}
          fontWeight={'medium'}
        >
          Cloneboxd
        </Text>

        <Circle
          as={'button'}
          size={'2em'}
          bg={'gray.600'}
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