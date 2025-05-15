import { Forgot , ResetPassword} from '../service/forgot.js'

export async function forgot(req, res) {

     await Forgot(req,res);
}


export async function resetPassword(req,res) {
      await ResetPassword(req,res)    
}
