import { validationResult } from "express-validator"
import { ApiError } from "../utils/api-error.js"

const validate = async()=>{
    const errors = validationResult(req)

    if(errors.isEmpty())
        return next()

    const extractedError = []
    errors.array().map((err) => extractedError.push({
        [err.path]:err.message
    }))

    throw new ApiError(422,"Received data is not valid: ", extractedError)
}

export default validate