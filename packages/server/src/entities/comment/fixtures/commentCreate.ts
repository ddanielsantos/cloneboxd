import { CommentModel } from '../commentModel'

export async function createComment(user: { id?: string }) {
  const comment = await CommentModel.findOne({ user: user.id })

  if (comment) return comment

  const document = new CommentModel({
    user: user.id,
    content: 'cool'
  })

  await document.save()

  return document
}
