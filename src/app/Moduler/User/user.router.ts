import express, { NextFunction, Request, Response } from 'express'
import { userController } from './user.controller'
import { UserRole } from '@prisma/client'
import auth from '../../middleWare/auth'
import validateRequest from '../../middleWare/validationRequest'


const router = express.Router()

router.post(
    '/create-user',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    userController.createUser)


export const userRouter = router