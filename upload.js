// routes/upload.js
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const router = express.Router();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read', // Adjust based on your needs
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ url: req.file.location }); // URL of the uploaded file
});

module.exports = router;
