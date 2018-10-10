exports.newName = function (nome){
	
	var  crypto = require("crypto");
	
	var nNome = nome + Math.random();
	
	return crypto.createHash('md5')
				 .update(nNome)
				 .digest('hex');
		
};
