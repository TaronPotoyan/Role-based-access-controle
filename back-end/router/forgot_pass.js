import express from 'express';
import { forgot , resetPassword} from '../controller/controller_forgot.js';


const rout = express.Router();

rout.put('/',forgot);
rout.post('/:key' , resetPassword );

export default rout