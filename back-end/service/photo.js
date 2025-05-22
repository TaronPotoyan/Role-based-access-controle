import multer from 'multer';
import Photo from '../model/photo.js';
import User from '../model/User.js';

const storage = multer.memoryStorage();


const upload = multer({ storage });

async function Post_Photo(req, res) {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');
    console.log(req.body);
    
    const photo = new Photo({
      data: req.file.buffer,
      contentType: req.file.mimetype
    });


    const user = await User.findById(req.body._id);     
    console.log('user', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.avatar = photo;
    const saved = await photo.save();
    await user.save();
    console.log(user);
    
    res.json({ url: `/api/photos/${saved._id}` });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send('Internal Server Error');
  }
}

async function Get_Photo(req, res) {
  try {
    const photo = await Photo.findById(req.params.photo_id);
    if (!photo) return res.status(404).send('Photo not found');

    res.set('Content-Type', photo.contentType);
    res.send(photo.data);
  } catch (e) {
    res.status(500).send('Error retrieving image');
  }
}

export default { 
    upload, 
    Post_Photo, 
    Get_Photo 
};
