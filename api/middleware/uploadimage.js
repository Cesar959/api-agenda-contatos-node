const multer = require('multer')
const { uuid } = require('uuidv4')

module.exports = (multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'api/public/upload/contato/')
        },
        filename: function (req, file, cb) {
            const extensaoArquivo = file.originalname.split('.')[1]
          cb(null, req.params.id + '--' + uuid() + '-' + Date.now() +'.' + extensaoArquivo)
        }
      })
}))