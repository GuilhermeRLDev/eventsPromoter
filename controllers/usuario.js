module.exports =  function(app){
	
	var Schema = require("mongoose").Schema;
	
	
	var usuario = Schema({
		
		nome: String,
		email: {type:String, required:true},
		usuario: {type:String, required:true},
		senha:{type:String, 
			   index:{unique:true}, 
			   required:true}
		
	});
	
	return db.model('usuarios',usuario);
};