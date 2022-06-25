import {
  Tab,
  Text,
  Box,
  Flex,
  Grid,
  Link,
  Tabs,
  Image,
  HStack,
  TabList,
  GridItem,
  TabPanel,
  TabPanels,
  useColorMode,
  Avatar,
  AvatarGroup,
  VStack,
  Button,
  Divider,
  IconButton,
} from '@chakra-ui/react'
import { Tooltip } from '../../components/Tooltip/Tooltip'
import { useParams } from 'react-router-dom'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import { Header } from '../../components/Header/Header'
import { Footer } from '../../components/Footer/Footer'

const cast = [
  {
    id: 1,
    name: 'Brad Pitt',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 1'
  },
  {
    id: 2,
    name: 'Tom Hanks',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 2'
  },
  {
    id: 3,
    name: 'Brad Pitt',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 1'
  },
  {
    id: 4,
    name: 'Tom Hanks',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 2'
  },
  {
    id: 5,
    name: 'Brad Pitt',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 1'
  },
  {
    id: 6,
    name: 'Tom Hanks',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 2'
  },
  {
    id: 7,
    name: 'Brad Pitt',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 1'
  },
  {
    id: 8,
    name: 'Tom Hanks',
    image: 'https://via.placeholder.com/100x100',
    role: 'role 2'
  }
]

const genres = [
  'comedy', 'drama', 'action'
]

const recentReviews = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      image: 'https://via.placeholder.com/100x100'
    },
    rating: 2.5,
    content: 'Mid',
    date: '2020-01-01',
    likes: [
      {
        id: 1,
        user: {
          name: 'John Doe'
        }
      }, {
        id: 2,
        user: {
          name: 'Some friend'
        }
      }
    ],
    comments: [
      {
        id: 1,
        user: {
          name: 'Some friend'
        },
        content: 'You are right',
      }
    ]
  },
  {
    id: 2,
    user: {
      name: 'John Doe',
      image: 'https://via.placeholder.com/100x100'
    },
    rating: 5,
    content: 'Dope',
    date: '2020-01-01',
    likes: [
      {
        id: 1,
        user: {
          name: 'John Doe'
        }
      }, {
        id: 2,
        user: {
          name: 'Some friend'
        }
      }
    ],
    comments: [
      {
        id: 1,
        user: {
          name: 'Some friend'
        },
        content: 'You are right',
      }
    ]
  },
  {
    id: 3,
    user: {
      name: 'John Doe',
      image: 'https://via.placeholder.com/100x100'
    },
    rating: 5,
    content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti reprehenderit, laborum, delectus ab saepe quam magni voluptates, quod eaque iusto suscipit qui ea tempore accusamus cumque aliquam nam neque labore?',
    date: '2020-01-01',
    likes: [
      {
        id: 1,
        user: {
          name: 'John Doe'
        }
      }, {
        id: 2,
        user: {
          name: 'Some friend'
        }
      }
    ],
    comments: [
      {
        id: 1,
        user: {
          name: 'Some friend'
        },
        content: 'You are right',
      }
    ]
  },
  {
    id: 4,
    user: {
      name: 'John Doe',
      image: 'https://via.placeholder.com/100x100'
    },
    rating: 5,
    content: 'Cool',
    date: '2020-01-01',
    comments: [
      {
        id: 1,
        user: {
          name: 'Some friend'
        },
        content: 'You are right',
      }
    ]
  },
  {
    id: 5,
    user: {
      name: 'John Doe',
      image: 'https://via.placeholder.com/100x100'
    },
    rating: 5,
    content: 'Cool',
    date: '2020-01-01',
    likes: [
      {
        id: 1,
        user: {
          name: 'John Doe'
        }
      }, {
        id: 2,
        user: {
          name: 'Some friend'
        }
      }
    ]
  },
]

const crew = [
  {
    id: 1,
    name: 'Akira Kurosawa',
    role: 'Diretor'
  },
  {
    id: 2,
    name: 'Akira Kurosawa',
    role: 'Pagodeiro'
  },
  {
    id: 3,
    name: 'Akira Kurosawa',
    role: 'Servente'
  },
  {
    id: 4,
    name: 'Akira Kurosawa',
    role: 'Humorista'
  },
  {
    id: 5,
    name: 'Akira Kurosawa',
    role: 'Faxineiro'
  },
]

export const MovieDetails = () => {
  const { colorMode } = useColorMode()
  const { movieId } = useParams()

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
        templateColumns='repeat(4, 1fr)'
        // m={'1em'}
        p="1em"
        w={['100%', '100%', '48em']}
        gap={5}
        as='main'
      >
        <GridItem
          order={1}
          colSpan={3}
          display={['block']}
        >
          <Text
            fontSize={'4xl'}
            fontWeight={'extrabold'}
          >
            Film title here
          </Text>
          <HStack
            spacing={1}
            justifyContent={'flex-start'}
          >
            <Text
              fontSize={'md'}
            >2020</Text>

            <span>·</span>

            <Text
              fontSize={'md'}
            >4.6 &#9733;</Text>
          </HStack>

        </GridItem>

        <GridItem
          colSpan={[3, 2, 1]}
          alignContent={'end'}
          order={[2, 3]}
          justifySelf={['center', 'start', 'center']}
        >
          <Image
            width={'150px'}
            height={'200px'}
            objectFit='cover'
            m={0}
            borderRadius={'1em'}
            borderWidth={3}
            borderColor={colorMode === 'light' ? 'blackAlpha.600' : 'whiteAlpha.900'}
            borderStyle={'solid'}
            src={`https://via.placeholder.com/150x200?text=${movieId}`}
            alt='TODO: alt'
          />

        </GridItem>

        <GridItem
          colSpan={[4, 3]}
          order={[3, 2]}
        >
          <Text
            textAlign={'justify'}
            fontSize={'md'}
            fontWeight={'medium'}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis maxime veritatis recusandae? Maxime, ipsam voluptas id dolorem tempora quis delectus? Suscipit in quam quasi atque esse quae laudantium sapiente magnam!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore temporibus sed, qui delectus laboriosam omnis nemo quis totam provident amet et sequi laborum, vel voluptate tempora atque voluptatem quibusdam reiciendis!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, porro! Autem excepturi optio sunt in neque praesentium fugiat velit, error iste! Suscipit numquam, excepturi tempore optio voluptas autem nam voluptatibus.
          </Text>
        </GridItem>

        <GridItem
          colSpan={[4, 3]}
          order={4}
        >
          <Tabs>
            <TabList>
              <Tab>Cast</Tab>
              <Tab>Crew</Tab>
              <Tab>Genres</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex
                  w={'100%'}
                  flexWrap={'wrap'}
                  gap={1}
                >
                  {
                    cast.map((actor, index) => <Tooltip key={index} inside={actor.name} popup={actor.role} />)
                  }
                </Flex>
              </TabPanel>

              <TabPanel>
                <Flex
                  w={'100%'}
                  flexWrap={'wrap'}
                  gap={1}
                >
                  {
                    crew.map((person, index) => <Tooltip key={index} inside={person.name} popup={person.role} />)
                  }
                </Flex>
              </TabPanel>

              <TabPanel>
                <Flex
                  w={'100%'}
                  flexWrap={'wrap'}
                  gap={1}
                >
                  {
                    genres.map((genre, index) => <Box key={index} padding={1} bg={colorMode === 'light' ? 'gray.200' : 'whiteAlpha.300'} cursor={'pointer'} borderRadius={'md'} _hover={{ bg: colorMode === 'light' ? 'gray.400' : 'gray.500', transitionDuration: '0.5s', }} fontSize={'sm'} >{genre}</Box>)
                  }
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>

        <GridItem
          colStart={4}
          order={5}
        >
          <Text
            fontWeight={'bold'}
          >
            Seen by:
          </Text>

          <AvatarGroup max={5} size={'sm'}
            spacing={0.5}
          >

            {
              Array(10).fill(0).map((_, index) => {
                return (
                  <Avatar
                    key={index}
                    size={'sm'}
                  // src={`https://via.placeholder.com/100x100?text=${index}`}
                  />
                )
              })
            }

          </AvatarGroup>

        </GridItem>

        <GridItem
          order={6}
          colSpan={[4, 3]}
        >
          <Text
            fontWeight={'bold'}
          >
            Stats: 🚧 add cool charts here
          </Text>
        </GridItem>

        <GridItem
          order={7}
          colSpan={[4, 1]}
        >
          {/* TODO: change these buttons to a call to login, if unlogged */}
          <VStack>
            <Button
              fontSize={'sm'}
              w={'100%'}
            >
              Create review
            </Button>
            <Button
              fontSize={'sm'}
              w={'100%'}
            >
              Share with friends
            </Button>
            <Button
              fontSize={'sm'}
              w={'100%'}
            >
              Add to watchlist
            </Button>
            <Button
              fontSize={'sm'}
              w={'100%'}
            >
              Add to other list
            </Button>
          </VStack>

        </GridItem>

        <GridItem
          order={8} colSpan={4}
          as='section'
        >
          <Text
            fontWeight={'bold'}
          >
            Recent reviews:
          </Text>

          <Divider my={'1em'} />

          <VStack gap={'0.5em'}
            w="100%"
          >
            {
              recentReviews.map((review, index) => {
                return (
                  <Box
                    key={index}
                    w={'100%'}
                    borderRadius={'md'}
                    p={'1em'}
                    _hover={{
                      bg: 'whiteAlpha.200',
                      transitionDuration: '0.5s',
                    }}
                    gap={'1em'}
                    display={'flex'}
                  >
                    <Avatar size="sm" />
                    <Box
                      fontSize={'sm'}
                      display='flex'
                      flexDirection={'column'}
                      justifyContent={'space-evenly'}
                      gap={'1em'}
                    >
                      <Text>
                        a {review.rating} &#x2605; review by
                        <Link
                          ml={1}
                        >
                          {review.user.name}
                        </Link>
                      </Text>
                      <Text textAlign={'justify'}>
                        {review.content}
                      </Text>

                      <Flex alignItems={'center'} gap={3}>

                        <Flex alignItems={'center'} gap={1}>
                          <Text whiteSpace={'nowrap'}>
                            {review.likes?.length || 0}
                          </Text>
                          {/* TODO: check if the user liked, instead of using the number of likes */}
                          <IconButton size={'xs'} aria-label='like review' variant='ghost' p={0} icon={review.likes?.length ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />} />

                        </Flex>

                        <Flex alignItems={'center'} gap={1}>
                          <Text>
                            {review.comments?.length || 0}
                          </Text>
                          <IconButton size={'xs'} aria-label='comment on review' variant='ghost' icon={<AiOutlineComment size={18} />} />
                        </Flex>

                      </Flex>

                    </Box>

                  </Box>
                )
              })
            }
          </VStack>

          <Button
            mr={'auto'}
            variant='ghost'
          >
            See more
          </Button>
        </GridItem>

        <GridItem
          order={9} colSpan={[4]}
          as='section'
        >
          <Text
            fontWeight={'bold'}
          >
            Top reviews:
          </Text>

          <Divider my={'1em'} />


          <VStack gap={'0.5em'}
            w="100%"
          >
            {
              recentReviews.map((review, index) => {
                return (
                  <Box
                    key={index}
                    w={'100%'}
                    borderRadius={'md'}
                    p={'1em'}
                    _hover={{
                      bg: 'whiteAlpha.200',
                      transitionDuration: '0.5s',
                    }}
                    gap={'1em'}
                    display={'flex'}
                  >
                    <Avatar size="sm" />
                    <Box
                      fontSize={'sm'}
                      display='flex'
                      flexDirection={'column'}
                      justifyContent={'space-evenly'}
                      gap={'1em'}
                    >
                      <Text>
                        a {review.rating} &#x2605; review by
                        <Link
                          ml={1}
                        >
                          {review.user.name}
                        </Link>
                      </Text>
                      <Text textAlign={'justify'}>
                        {review.content}
                      </Text>

                      <Flex alignItems={'center'} gap={3}>

                        <Flex alignItems={'center'} gap={1}>
                          <Text whiteSpace={'nowrap'}>
                            {review.likes?.length || 0}
                          </Text>
                          {/* TODO: check if the user liked, instead of using the number of likes */}
                          <IconButton size={'xs'} aria-label='like review' variant='ghost' p={0} icon={review.likes?.length ? <AiFillHeart size={18} /> : <AiOutlineHeart size={18} />} />

                        </Flex>

                        <Flex alignItems={'center'} gap={1}>
                          <Text>
                            {review.comments?.length || 0}
                          </Text>
                          <IconButton size={'xs'} aria-label='comment on review' variant='ghost' icon={<AiOutlineComment size={18} />} />
                        </Flex>

                      </Flex>

                    </Box>

                  </Box>
                )
              })
            }
          </VStack>


        </GridItem>

      </Grid>
      <Footer />
    </Box >
  )
}
