const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
    //Esto lo estamos recibiendo en el body del req de vsRest
    const { name, username, password } = request.body

    //Aca debemos hacer las operaciones con bcrypt
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    //Esto es lo que recibe el model de mongoose
    const newUser = new User ({ 
        name, 
        username, 
        passwordHash 
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter