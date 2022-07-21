import {
  Flex,
  Button,
  Drawer,
  Divider,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/react"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const HeaderDrawer = ({ onClose, isOpen }: Props) => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const drawerOptions = [
    {
      label: 'See profile',
      onClick: () => { }
    },
    {
      label: 'Search movie',
      onClick: () => navigate('/search-movie')
    },
    {
      label: 'About',
      onClick: () => navigate('/about')
    },
    {
      label: 'Log out',
      onClick: () => signOut()
    }
  ]

  return (
    <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          borderBottomWidth='1px'
        >
          <DrawerCloseButton />
          <ThemeSwitcher />

        </DrawerHeader>
        <DrawerBody>

          <Flex
            flexDirection={'column'}
            gap={'1em'}
          >
            {
              drawerOptions.map((item, index) => {
                return (
                  <Fragment
                    key={index}
                  >
                    <Button
                      noOfLines={1}
                      size={'sm'}
                      onClick={item.onClick}
                      variant={'ghost'}
                    >
                      {item.label}
                    </Button>
                    {
                      index !== drawerOptions.length - 1 ? <Divider /> : null
                    }
                  </Fragment>
                )
              })
            }
          </Flex>

        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}