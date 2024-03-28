import express from 'express'
import { userController } from './user.controller'
import auth from '../../middleWare/auth'

const router = express.Router()

router.post(
    '/create-user',
    auth(),
    userController.createUser)


export const userRouter = router