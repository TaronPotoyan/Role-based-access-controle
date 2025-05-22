import obj from "../service/photo.js";

async function setPhoto(req,res) {
       await   obj.Post_Photo(req,res);
}


async function  getPhoto(req,res) {
    await obj.Get_Photo(req,res);
}

export default {
    setPhoto,
    getPhoto
}
