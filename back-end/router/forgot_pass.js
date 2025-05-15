import express from 'express';
import { forgot , resetPassword , Getting} from '../controller/controller_forgot.js';


const rout = express.Router();

rout.put('/',forgot);
rout.post('/:key' , resetPassword );
rout.post('/:id' ,Getting )

export default rout