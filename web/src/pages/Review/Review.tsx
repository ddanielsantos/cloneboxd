import { Box, Text, Button, Avatar, Flex, Link, Grid, GridItem } from '@chakra-ui/react'
import { startTransition } from 'react'
import { useLazyLoadQuery } from 'react-relay'
import { useNavigate, useParams } from 'react-router-dom'
import { graphql } from 'relay-runtime'
import { Header } from '../../components/Header/Header'
import { ReviewQuery } from './__generated__/ReviewQuery.graphql'

export const Review = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { singleReview } = useLazyLoadQuery<ReviewQuery>(
    graphql`
      query ReviewQuery ($id: ID!){
        singleReview(id: $id) {
          id
          movie {
            id
            title
            releaseDate
          }
          watchedAt
          rating
          user {
            fullName
          }
          text
        }
      }
    `, { id: id || '' })

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
        // templateColumns='repeat(4, 1fr)'
        // border='1px solid blue'
        // m={'1em'}
        p="1em"
        w={['100%', '100%', '48em']}
        gap={5}
        as='main'
      >
        <GridItem
          // border='1px solid red'
          display={'flex'}
          flexDirection='column'
          alignItems={'start'}
          gap='0.3em'
        >
          <Text
            onClick={() => {
              startTransition(() => navigate(`/movie/${singleReview?.movie.id}`))
            }}
            fontSize={'3xl'}
            fontWeight={'extrabold'}
          >
            {singleReview?.movie.title}
          </Text>

          <Text>
            {singleReview?.movie.releaseDate.slice(0, 4)}
          </Text>
        </GridItem>

        <GridItem
          border='1px solid red'
        >
          <Flex
            alignItems={'center'}
            // border='1px solid red'
            gap='0.5em'
          >
            <Avatar size={'sm'} />
            <Flex
              gap='0.25em'
            // 
            >
              <Text>
                a {singleReview?.rating} &#9733; review by
              </Text>
              <Link>
                {singleReview?.user.fullName}
              </Link>
            </Flex>
          </Flex>
        </GridItem>

        <GridItem
          border='1px solid red'
        >
          <Text
            fontStyle={'italic'}
            fontSize='sm'
          >
            watched on {singleReview?.watchedAt && new Date(+singleReview.watchedAt).toLocaleDateString()}
          </Text>
          <Text>
            {singleReview?.text}
          </Text>
        </GridItem>
      </Grid>

    </Box>
  )
}