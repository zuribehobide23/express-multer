var express = require('express');
var router = express.Router();
const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    const filetypes = /png|jpg/; 
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Soilik PNG eta JPG fitxategiak onartzen dira'));
    }
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    const file = req.file
    const izena = req.body.izena;
    
    console.log(`Zure izena: ${izena}. Fitxategia: https://miniature-chainsaw-69965xxq4vj6c55xj.github.dev/${file.path}`)
    
    res.send("Jasota")
})

module.exports = router;
