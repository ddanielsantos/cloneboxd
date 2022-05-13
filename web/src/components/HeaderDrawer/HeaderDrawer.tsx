import { Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex } from "@chakra-ui/react"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../../helpers/localStorage"
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const HeaderDrawer = ({ onClose, isOpen }: Props) => {
  const navigate = useNavigate()
  const drawerOptions = [
    {
      label: 'Ver perfil',
      onClick: () => { }
    },
    {
      label: 'Sair',
      onClick: () => {
        removeToken()
        navigate('/login')
      }
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