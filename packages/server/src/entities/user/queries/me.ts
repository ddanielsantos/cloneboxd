import { userType } from '../userTypes'
import { UserModel } from '../userModel'

export const me = {
  type: userType,
  resolve: async (_: any, _args: any, ctx: { user?: any }) => {
    if (!ctx.user) {
      return null
    }

    return await UserModel.findOne({
      _id: ctx.user.id
    })
  }
}
