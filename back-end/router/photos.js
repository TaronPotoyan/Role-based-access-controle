import express from 'express';
import controller from '../controller/controller_photo.js';
import service from '../service/photo.js'; 

const router_photo = express.Router();

router_photo.post('/api/photos', service.upload.single('photo'), controller.setPhoto );

router_photo.get('/api/photos/:photo_id', controller.getPhoto);

export default router_photo;
