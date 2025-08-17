import { Router } from 'express'
import { registerUser } from '../controllers/auth.controller.js'
import { userRegistrationValidator } from '../validators/index.js'

const router = Router()

router
  .route('/register')
  .post(userRegistrationValidator(), validate, registerUser)

export default router
