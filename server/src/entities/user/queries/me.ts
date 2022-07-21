import { userType } from '../userTypes'
import { UserModel } from '../userModel'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { IncomingHttpHeaders } from 'http'

export const me = {
  type: userType,
  resolve: async (_: any, _args: any, ctx: IncomingHttpHeaders) => {
    const { payload } = getHeadersPayload(ctx)

    if (!payload) {
      return null
    }

    return await UserModel.findOne({
      _id: payload.id
    })
  }
}
