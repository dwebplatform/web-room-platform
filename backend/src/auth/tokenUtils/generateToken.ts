
const  jwt  =  require('jsonwebtoken');
export async function generateToken(id:number,email:string, time:number){
	return new Promise((resolve, reject)=>{
		jwt.sign({
			exp: Math.floor(Date.now()/1000) + time,
			id, 
			email
		},'kitty_missy', (err:any,token:any)=>{
			if(err){
				return reject(err);
			};
			return resolve(token);
		});
	});
}