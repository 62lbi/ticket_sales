/** load library 'multer' and 'path' */
const multer = require(`multer`)
const path = require(`path`)

/** storage configuration */
const storage = multer.diskStorage({
    /** define storage folder */
    destination: (req, file, cb) => {
        cb(null, `./image`)
    },

    /** define filename for upload file */
    filename: (req, file, cb) => {
        cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    /**storage configuration */
    storage: storage,
    /** filter uploaded file */
    fileFilter: (req, file, cb) => {
        /** filter type of file */
        const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'] //these are the files that is accepted/tolerated
        if (!acceptedType.includes(file.mimetype)) {
            cb(null, false) //refusing to upload
            return cb(`Invalid file type (${file.mimetype})`)
        }

        //filter size of life
        const fileSize = req.headers[`content-length`]
        const maxSize = (1 * 1024 * 1024) //basically, the max amount is 1 MB
        if(fileSize > maxSize){
            cb(null, false) //refuse to upload
            return cb(`File size is too large`)
        }
        cb(null, true) //accept upload, the difference is in the null and false. after the null.
    }

})
module.exports = upload
