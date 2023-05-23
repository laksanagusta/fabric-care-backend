const formidable = require('formidable')
const AWS = require('aws-sdk')
const {v4:uuidv4} = require('uuid')
const fs = require('fs')

const s3 = new AWS.S3({
    accessKeyId:process.env.AWS_ACCES_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const uploadImage = (req, res, next) => {    
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if(err) {
        return res.status(400).json({
          error: "Image couldn't be upload"
        })
      }

      console.table({err, fields, files})
      const {image} = files

      if (image.size > 2000000) {
        return res.status(400).json({
          error: "Image should be less than 2mb"
        })
      }

      const params = {
        Bucket: 'dika-portfolio',
        Key: `image/${uuidv4()}`,
        Body: fs.readFileSync(image.path),
        ACL: 'public-read',
        ContentType: 'image/png'
      }

      // Uploading files to the bucket
      s3.upload(params, function(err, data) {
        console.log(err)
        if (err) res.status(400).json({error: "Upload to s3 failed"}) 
        console.log('File upload success', data);
        req.imagePath = data.key  
        req.body = fields
        next()
      });
    })
}

const updateImage = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if(err) {
        return res.status(400).json({
          error: "Image couldn't be upload"
        })
      }

      //console.table({err, fields, files})
      const {image} = files

      if(image.size === 0){
        req.body = fields  
        next()
      }
      else{
        if (image.size > 2000000) {
          return res.status(400).json({
            error: "Image should be less than 2mb"
          })
        }

        const deleteParams = {
          Bucket: 'dika-portfolio',
          Key: `${fields.imagepath}`,
        }

        s3.deleteObject(deleteParams, function(err, data) {
            if(err) console.log("Delete failed during update")
            else console.log('Delete during update', data)
        })
  
        const params = {
          Bucket: 'dika-portfolio',
          Key: `image/${uuidv4()}`,
          Body: fs.readFileSync(image.path),
          ACL: 'public-read',
          ContentType: 'image/jpg'
        }
  
        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
          console.log(err)
          if (err) res.status(400).json({error: "Upload to s3 failed"}) 
          console.log('File upload success', data);
          req.imagePath = data.key  
          req.body = fields  
          next()
        });
      }
    })
}

const deleteImage = (req, res, next) => {
  const {imageUrl} = req.params

  const deleteParams = {
      Bucket: 'dika-portfolio',
      Key: `image/${imageUrl}`,
  }

  s3.deleteObject(deleteParams, function(err, data) {
      if(err) return res.status(400).json({error: "Delete failed during update "+data})
      else console.log('Delete during update', data)
  })

  req.body = req.params  
  next()
}


  
module.exports = {uploadImage, updateImage, deleteImage};