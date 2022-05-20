import { userType } from '../userTypes'
import { userRepository } from '../userRepository'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'
import { IncomingHttpHeaders } from 'http'

export const me = {
  type: userType,
  resolve: async (_: any, _args: any, ctx: IncomingHttpHeaders) => {
    const { payload } = getHeadersPayload(ctx)
    // console.log(payload)
    if (!payload) {
      return null
    }

    return await userRepository.findOne(payload.id)
  }
}
