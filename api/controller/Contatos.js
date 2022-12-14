const database = require('../models')
const fs = require('fs')

class controllerContatos {

    static async cadastroFoto(req, res){
        const { id } = req.params
        const foto  = req.file.filename

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        try {

            const validacaoToken = await database.tokenInactive.findAndCountAll({ where: { token: token }})

            if(validacaoToken.count > 0)
            {
                return res.status(403).json({ msg: "Token invalido"})
            }

            const dados =  await database.Contatos.update({ foto }, { where: { id: id }})
            res.status(200).json({ foto: req.file.filename })

        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }
    }
    

    static async alterarFoto(req, res){
        const { id } = req.params
        const foto  = req.file.filename

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        try {

            const validacaoToken = await database.tokenInactive.findAndCountAll({ where: { token: token }})

            if(validacaoToken.count > 0)
            {
                return res.status(403).json({ msg: "Token invalido"})
            }

            const foto_atual = await database.Contatos.findByPk(Number(id))

            let link = "./api/public/upload/contato/" + foto_atual['foto']

            if(fs.existsSync(link))
            {
                fs.unlink(`${link}`, async (erro, sucesso) => {

                    if(erro){
    
                        res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${erro}`})
                    }
                    else 
                    {
                        const dados =  await database.Contatos.update({ foto }, { where: { id: id }})
                        res.status(200).json({ foto: req.file.filename })
                    }
                })
            }
            else 
            {
                const dados =  await database.Contatos.update({ foto }, { where: { id: id }})
                res.status(200).json({ foto: req.file.filename })
            }


        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }
    }
    
    static async lista(req, res){

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        try {

            const validacaoToken = await database.tokenInactive.findAndCountAll({ where: { token: token }})
            console.log(validacaoToken.count)

            if(validacaoToken.count > 0)
            {
                return res.status(403).json({ msg: "Token invalido"})
            }

            const dados =  await database.Contatos.findAll()
            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }

    }

    static async selecionar(req, res){
        const { id } = req.params

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        try {

            const validacaoToken = await database.tokenInactive.findAndCountAll({ where: { token: token }})

            if(validacaoToken.count > 0)
            {
                return res.status(403).json({ msg: "Token invalido"})
            }

            const dados =  await database.Contatos.findByPk(Number(id))
            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }

    }

    static async cadastro(req, res){
        const { foto, nome, email, data_nascimento, descricao, telefone } = req.body

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        try {

            const validacaoToken = await database.tokenInactive.findAndCountAll({ where: { token: token }})

            if(validacaoToken.count > 0)
            {
                return res.status(403).json({ msg: "Token invalido"})
            }

            const dados =  await database.Contatos.create({ foto, nome, email, data_nascimento, descricao, telefone })
            res.status(200).json(dados)

        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }
    }

    static async atualizar(req, res){
        const { id } = req.params
        const { foto, nome, email, data_nascimento, descricao, telefone } = req.body

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        try {

            const validacaoToken = await database.tokenInactive.findAndCountAll({ where: { token: token }})

            if(validacaoToken.count > 0)
            {
                return res.status(403).json({ msg: "Token invalido"})
            }

            const dados =  await database.Contatos.update({ foto, nome, email, data_nascimento, descricao, telefone }, { where: { id: id }})
            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }
    }

    static async deletar(req, res){
        const { id } = req.params

        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        try {

            const validacaoToken = await database.tokenInactive.findAndCountAll({ where: { token: token }})

            if(validacaoToken.count > 0)
            {
                return res.status(403).json({ msg: "Token invalido"})
            }

            const dados =  await database.Contatos.destroy({ where: { id: id }})
            res.status(200).json(dados)
        } catch (error) {
            res.status(500).json({ msg: `Não foi possivel trazer as infromações: Mensagem de Erro: ${error.message}`})
        }
    }
}

module.exports = controllerContatos