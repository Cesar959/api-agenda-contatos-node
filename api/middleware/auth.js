require('dotenv').config()
const jwt = require('jsonwebtoken')


exports.verificacaoToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null)
    {
        return res.status(403).json({ msg: "Token inexistente"})
    }

    jwt.verify(token, process.env.SECURITY_TOKEN, (err, user)=>{

        if(err){
            return res.status(403).json({ msg: err.message})
        }

        next()
    })


    

}

exports.verificacaoTokenRefresh = async (req, res, next) => {
    const authHeader = req.headers['refreshtoken']

    const token = authHeader && authHeader.split(' ')[1]

    if(token == null)
    {
        return res.status(403).json({ msg: "Token inexistente"})
    }

    jwt.verify(token, process.env.SECURITY_TOKEN, (err, user)=>{

        if(err){
            return res.status(403).json({ msg: err.message})
        }

        next()

    })


}