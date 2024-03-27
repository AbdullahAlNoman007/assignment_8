import express from 'express'
import validateRequest from '../../middleWare/validationRequest'
import { forgetpasswordValidation, loginValidation, passwordValidation, resetPasswordValidation } from './auth.validation'
import { authController } from './auth.controller'
import { UserRole } from '@prisma/client'
import auth from '../../middleWare/auth'

const router = express.Router()

router.post('/login', validateRequest(loginValidation), authController.login)

export const authRouter = router