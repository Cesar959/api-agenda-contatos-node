const { Router } = require('express')
const controllerContatos = require('../controller/Contatos')
const { verificacaoToken } = require('../middleware/auth')

const app = Router()

app.get('/contatos', verificacaoToken, controllerContatos.lista)
app.post('/contatos', verificacaoToken, controllerContatos.cadastro)
app.get('/contatos/:id', verificacaoToken, controllerContatos.selecionar)
app.put('/contatos/:id', verificacaoToken, controllerContatos.atualizar)
app.delete('/contatos/:id', verificacaoToken, controllerContatos.deletar)

module.exports = app
