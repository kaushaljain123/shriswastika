const express = require("express")
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { uploadXlxsData } = require('../controllers/uploadXlxsController')
const { protect, admin } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'xlxsUpload/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

function checkFileType(file, cb) {
    const filetypes = /xlsx/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Xlxs File  Only')
    }
}

const upload = multer({
    storage,
    //     fileFilter: function (req, file, cb) {
    //         // checkFileType(file, cb)
    //     },
})

router.post('/uploadXlxs', upload.single('file'), uploadXlxsData, (req, res) => {

    // res.send(`/${req.file.path}`)
})

// router.route('/uploadXlsxFile').get(uploadXlxsData)

module.exports = router