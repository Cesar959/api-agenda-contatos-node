const router = require('express').Router
const routerContato = require('./contato')
const routerUsuarios = require('./Usuarios')

module.exports = app =>{
    app.use(routerContato, routerUsuarios)
}