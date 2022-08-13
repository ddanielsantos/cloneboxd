import { CommentModel } from '../../commentModel'
import { createUser } from '../../../user/fixture/createUser'

export async function createComment() {
  const comment = await CommentModel.findOne({ content: 'cool' })

  if (comment) return comment

  const user = await createUser({ admin: false })

  const document = new CommentModel({
    user: user.id,
    content: 'cool'
  })

  await document.save()

  return document
}
