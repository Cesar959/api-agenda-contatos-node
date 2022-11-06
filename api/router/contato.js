const { Router } = require('express')
const controllerContatos = require('../controller/Contatos')
const { verificacaoToken } = require('../middleware/auth')
const uploadContato = require('../middleware/uploadimage')

const app = Router()

app.get('/contatos', verificacaoToken, controllerContatos.lista)
app.post('/contatos', verificacaoToken, controllerContatos.cadastro)
app.post('/contatos/:id/foto', verificacaoToken, uploadContato.single('foto'), controllerContatos.cadastroFoto)
app.put('/contatos/:id/foto', verificacaoToken, uploadContato.single('foto'), controllerContatos.alterarFoto)
app.get('/contatos/:id', verificacaoToken, controllerContatos.selecionar)
app.put('/contatos/:id', verificacaoToken, controllerContatos.atualizar)
app.delete('/contatos/:id', verificacaoToken, controllerContatos.deletar)

module.exports = app
