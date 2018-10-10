module.exports = function(app){
	
	var Schema = require('mongoose').Schema;
	
	
	var permissao = Schema({
		
		nome:{type:String, 
				required:true},
		endereco:{type:String,
				  required: true}
	});
	
	var grupo = Schema({
		
		nome: {type: String,
			   required:true},
	    permissoes:[permissao]
		
	});
	
	return db.model('grupo', grupo);
	
}