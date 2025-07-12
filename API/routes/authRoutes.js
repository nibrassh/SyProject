import express from 'express'
import { signIn } from '../controllers/authController.js';

const authRoute= express.Router()

authRoute.post('/signin',signIn)

export default authRoute;