const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const studentController = require('../controllers/student');

router.post('/register', upload.single('photo'), studentController.register);
router.post('/login', studentController.register);

module.exports = router;
