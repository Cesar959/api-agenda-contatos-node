require('dotenv').config()
const express = require('express')
const router = require('./router')

const app = express()

app.use(express.json())

router(app)

app.listen(process.env.PORT, ()=> console.log(`Servidor online na porta ${process.env.PORT}`))