import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { User, Session } from '../models/index.js'
import { SECRET } from '../utils/config.js'

const router = Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ where: {username: username} })

  const passwordCorrect = password === 'secret' // for demonstrations purposes only
  
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'invalid username or password' })
  } else if (user.disabled) {
    return res.status(401).json({ error: 'user is disabled' })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, SECRET)

  await Session.create({
    token,
    userId: user.id,
    active: true
  })
  
  return res.status(200).json({ 
    token, 
    username: user.username, 
    name: user.name 
  })
})

export default router