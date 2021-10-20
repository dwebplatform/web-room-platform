const jwt = require('jsonwebtoken');
export class TokenExpiredError extends Error { 
	constructor(message){
		super(message);
		Object.setPrototypeOf(this, TokenExpiredError.prototype);
	}

}
export async function verifyUser(token:string){
	return new Promise((resolve,reject)=>{
		jwt.verify(token,'kitty_missy',(err, decoded)=>{
			if(err){
				if(err instanceof jwt.TokenExpiredError){
					throw new TokenExpiredError('Время токена истекло');
				}
				reject(err);
			}
			return resolve(decoded);
		})
	}); 
}