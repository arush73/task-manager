import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/api-response.js'

const healthCheck = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'server is working fine!!!'))
})

export { healthCheck }
