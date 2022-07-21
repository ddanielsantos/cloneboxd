import { startTransition } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Text,
  Flex,
  Link,
  Image,
  Button,
  TabList,
  Divider,
  TabPanel,
  GridItem,
  TabPanels,
  useColorMode
} from '@chakra-ui/react'
import { Header } from '../../components/Header/Header'
import { ProfileQuery } from './__generated__/ProfileQuery.graphql'

const IMAGE_URL_PREFIX = 'https://image.tmdb.org/t/p/w92'

export const Profile = () => {
  const navigate = useNavigate()
  const { colorMode } = useColorMode()
  const { username } = useParams()

  const data = useLazyLoadQuery<ProfileQuery>(graphql`
    query ProfileQuery($username: String) {
      userList(username: $username) {
        edges {
          node {
            id
            fullName
            username
          }
        }
      }

      reviewList(first: 3 username: $username) {
        pageInfo {
          hasNextPage
        }
        edges {
          node {
            id
            text
            movie {
              id
              title
              posterPath
            }
          }
        }
      }
    }
  `, { username: username ?? '' })

  if (data.userList?.edges == null || !data.userList?.edges[0]) {
    return (
      <Box
        display={'flex'}
        flexDirection='column'
        gap='0.5em'
        alignItems={'center'}
      >
        <Text>
          Sorry, this user doesn't exist
        </Text>

        <Button
          onClick={() => {
            navigate('/')
          }}
        >
          Return to home page
        </Button>
      </Box>
    )
  }

  const user = data.userList?.edges[0]

  return (
    <Box
      minH={'100vh'}
      h={'100%'}
      w='100%'
      gap={4}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Header />

      <Grid
        w={['100%', '100%', '48em']}
        p='1em'
        as='main'
        gap={5}
      >
        <GridItem
          display={'flex'}
          gap={2}
          alignItems='center'
        >
          <Text
            fontSize={'2xl'}
            fontWeight={'extrabold'}
          >
            {user?.node?.fullName}
          </Text>

          <Text fontSize={'lg'}>
            @{user?.node?.username}
          </Text>
        </GridItem>

        <GridItem>
          <Divider />
        </GridItem>

        <GridItem>
          <Tabs
            align={'center'}
            isFitted
          >
            <TabList>
              <Tab>Reviews</Tab>
              <Tab>Lists</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <Flex
                  wrap={'wrap'}
                  gap={2}
                >
                  {data.reviewList?.edges?.map(edge => {
                    return (
                      <Link
                        key={edge?.node?.id}
                        w='100%'
                        textDecoration={'unset'}
                        onClick={() => {
                          startTransition(() => navigate(`/review/${edge?.node?.id}`))
                        }}
                        style={{
                          textDecoration: 'none'
                        }}
                      >

                        <Flex
                          p={4}
                          gap={4}
                          alignItems='start'
                          flexShrink={0}
                          borderRadius='md'
                          _hover={{
                            bg: colorMode === 'light' ? 'gray.200' : 'whiteAlpha.200',
                            transitionDuration: '0.5s',
                          }}
                        >
                          <Image
                            src={IMAGE_URL_PREFIX + edge?.node?.movie.posterPath}
                          />

                          <Box>
                            <Text
                              fontWeight={'bold'}
                              textAlign={'left'}
                            >
                              {edge?.node?.movie.title}
                            </Text>
                            <Text
                              textAlign={'left'}
                            >
                              {edge?.node?.text && edge.node.text.length >= 300 ? edge.node.text.slice(0, 300) + '...' : edge?.node?.text}
                            </Text>
                          </Box>
                        </Flex>
                      </Link>
                    )
                  })}
                </Flex>
                {
                  data.reviewList?.pageInfo.hasNextPage &&
                  <Button>
                    See more
                  </Button>
                }
              </TabPanel>
              <TabPanel>
                <Box
                  py={4}
                  borderRadius='md'
                  w='100%'
                  _hover={{
                    bg: 'gray.200',
                    transitionDuration: '0.5s',
                  }}
                >
                  <Text>
                    under development 🚧
                  </Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>

      </Grid>
    </Box>
  )
}