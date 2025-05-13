const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req, file) => 'folder_name',
    format: async (req, file) => {
      // async code using `req` and `file`
      // ...
      return 'jpeg';
    },
    public_id: (req, file) => 'some_unique_id',
  },
});

module.exports={
    cloudinary,
    storage
}