import express from 'express';
import obj_users from '../controller/controller_users.js';
import obj_validation from '../Middleware/Validation.js';


const rout_users  = express.Router();

rout_users.get('/',
    obj_users.GetUsers
);

rout_users.post('/user/123',
    obj_validation.validateEmail,
    obj_validation.validatePassword,
    obj_users.CreateUser
);

rout_users.post('/:admin',
    obj_validation.validateEmail,
    obj_validation.validatePassword,
    obj_users.CreateUser,
);


rout_users.put('/:admin',
    obj_users.SetAdmin
)


rout_users.post('/one/one',
    obj_validation.validateEmail
    ,obj_users.GetUser
);

rout_users.delete('/user',obj_users.DeleteUser);





export default rout_users;