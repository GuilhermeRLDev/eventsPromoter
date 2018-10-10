module.exports = function(app){
	
	var Schema = require('mongoose').Schema;
	
	
	var menu = Schema({
		
		nome: {type:String,
			   required:true},
	    endereco:{type:String,
				   required:true}		
	});
	
	
	return db.model('menu', menu);
	
};