const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
    const { name, username, password } = request.body
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return response.status(400).json({ error: 'Username already taken' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
    
        const newUser = new User ({ 
            name, 
            username, 
            passwordHash 
        })
    
        const savedUser = await newUser.save()
        response.status(201).json(savedUser)
        
    } catch (error) {
        response.status(400).json({ error: 'Invalid username or password' })
    }
})

module.exports = usersRouter