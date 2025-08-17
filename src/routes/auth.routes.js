import { Router } from 'express'
import { registerUser } from '../controllers/auth.controller.js'
import { userRegistrationValidator } from '../validators/index.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

router
  .route('/register')
  .post(userRegistrationValidator(), validate,upload.single('avatar'), registerUser)

export default router
