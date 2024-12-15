var express = require('express');
var router = express.Router();
const multer  = require('multer')
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
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
    
  console.log(`Zure izena: ${izena}. Fitxategia: ${file.path}`)
    
  res.send("Jasota");
})

module.exports = router;
