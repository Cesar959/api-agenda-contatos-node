const { Router } = require('express')
const controllerUsuarios = require('../controller/Usuarios')
const { verificacaoTokenRefresh } = require('../middleware/auth')

const app = Router()

app.post('/signup', controllerUsuarios.signup)
app.post('/login', controllerUsuarios.login)
app.post('/tokenRefresh', verificacaoTokenRefresh,controllerUsuarios.refreshToken)

module.exports = app
