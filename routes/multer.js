const multer = require('multer');
const { v4 : uuidv4 } = require ('uuid');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb (null, '/public/uploads/');
    },
    filename: function (req, res, cb) {
        const uniqueFilename = uuidv4();
        cb(null, uniqueFilename);
    }
});

const upload = multer({storage : storage});