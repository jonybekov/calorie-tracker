const http = require('http')

const express = require('express')
const app = express()
const server = http.createServer(app)

const { configDB } = require('./db/config')
const { Pool } = require("pg")
const pool = new Pool(configDB)
const db = require('./db')(pool)

const userRepository = require('./repositories/user-repository')(db)
const userService = require('./services/user-service')(userRepository)
const authMiddleware = require('./middleware/auth-middleware')(userService)

// Express init
app.use(express.json())
app.use(authMiddleware)
app.use(express.urlencoded({ extended: true }))

app.all('/', (req, res) => {
    res.send('pong')
})

app.post('/v1/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        const updatedUser = await userService.checkAuth(login, password);
        res.json(updatedUser)
    } catch(err) {
        res.status(404).send({
            message: err.message,
            code: 404
        })
    }
})

app.post('/v1/register', async (req, res, next) => {
    const { firstName, lastName, avatar = null, login, password } = req.body;

    try {
        const newUser = await userService.registerUser(firstName, lastName, avatar, login, password);
        res.json(newUser)
    } catch(err) {
        next(err)
    }
})

/**
 * Last error handler
 */
 app.use(async (err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: err.message,
            code: 500
        })
        return
    }

    res.status(404).json({
        ermessager: 'Not found',
        code: 404
    })
})

server.listen(3000, async () => {
    console.log('listening on *:3000')
})