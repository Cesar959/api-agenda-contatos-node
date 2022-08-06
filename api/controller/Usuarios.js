const database = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class controllerUsuarios {

    static async signup(req, res){
        const {  nome, email, senha } = req.body

        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const senhaCryptografada = bcrypt.hashSync(senha, salt)

        try {
            const dados =  await database.Usuarios.create({ nome: nome, email: email, senha: senhaCryptografada })
            res.status(201).json({ nome: nome, email: email })
        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }
    }

    static async login(req, res){
        const { email, senha } = req.body

        try {
        
            const dados =  await database.Usuarios.findOne({ where: { email: email} })

            const comparacaoSenha = await bcrypt.compare(senha, dados.senha)

            if(comparacaoSenha)
            {
                res.status(401).json({ msg: 'credenciais invalidadas' })
            }
            else{
                const token = jwt.sign({ email:email }, process.env.SECURITY_TOKEN, { expiresIn: '1h' })
                const refreToken = jwt.sign({ token }, process.env.SECURITY_TOKEN, { expiresIn: '1d' })
                res.header('authorization', token)
                res.header('refreshToken', refreToken)
                res.status(200).json({ msg: 'Login efetuado com sucesso' })
            }


        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }
    }

    static async refreshToken(req, res){
        const authHeader = req.headers['refreshtoken']

        const token = authHeader && authHeader.split(' ')[1]

        try {

            const dados = await database.tokenInactive.create({ token: token, data: new Date() })
            
        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }

        if(token == null)
        {
            return res.status(403).json({ msg: "Token inexistente"})
        }

        const tokenNovo = jwt.sign({ token }, process.env.SECURITY_TOKEN, { expiresIn: '1h' })

        res.header('refreshToken', tokenNovo)
        return res.status(200).json({ msg: 'Refresh Token efetuado com sucesso' })

    }

}

module.exports = controllerUsuarios