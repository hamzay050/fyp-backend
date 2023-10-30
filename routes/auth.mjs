import express from 'express'
const router = express.Router()
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  logout
} from '../controller/auth.mjs'
import verifyAccessToken from '../middleware/verifyAccessToken .mjs'

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.post('/logout', logout)
router.put('/changePassword', verifyAccessToken, changePassword)

export default router
