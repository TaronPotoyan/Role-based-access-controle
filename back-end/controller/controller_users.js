import obj_users from '../service/Users.js'

async function  GetUsers(req,res) {
     await  obj_users.Get_Users(req,res);
}

async function CreateUser(req,res) {
        await obj_users.CreateUser(req,res);
}

async function  SetAdmin(req,res) {
       await obj_users.SetAdmin(req,res); 
}

async function GetUser(req,res) {
    await obj_users.GetUser(req,res);
}




export default {
    GetUsers,
    CreateUser,
    SetAdmin,
    GetUser
}

    