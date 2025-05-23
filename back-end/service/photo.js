import multer from 'multer';
import Photo from '../model/photo.js';
import User from '../model/User.js';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});


const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only image files are allowed!'));
  }
});

async function Post_Photo(req, res) {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');
    
    const photo = new Photo({
      path: req.file.path, 
      contentType: req.file.mimetype,
      filename: req.file.filename
    });

    const user = await User.findById(req.body._id);     
    if (!user) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.avatar) {
      const oldPhoto = await Photo.findById(user.avatar);
      if (oldPhoto && fs.existsSync(oldPhoto.path)) {
        fs.unlinkSync(oldPhoto.path);
      }
      await Photo.findByIdAndDelete(user.avatar);
    }
    
    user.avatar = await photo.save();
    await user.save();
    
    res.json({ 
      url: `/api/photos/${photo._id}`,
      filePath: photo.path 
    });
  } catch (e) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error:', e);
    res.status(500).send('Internal Server Error');
  }
}

async function Get_Photo(req, res) {
  try {
    const photo = await Photo.findById(req.params.photo_id);
    if (!photo || !fs.existsSync(photo.path)) {
      return res.status(404).send('Photo not found');
    }

    res.set('Content-Type', photo.contentType);
    res.sendFile(photo.path, { root: '.' });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send('Error retrieving image');
  }
}

export default { 
    upload, 
    Post_Photo, 
    Get_Photo 
};