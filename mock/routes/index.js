import { Router } from 'express'
const router = Router()

router.use('login', import('./loginRoute'))
