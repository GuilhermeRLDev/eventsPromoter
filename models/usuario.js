module.exports =  function(app){
	
	var Schema = require("mongoose").Schema;
	var grupo  = app.models.grupo; 
	
	var usuario = Schema({
		
		nome: String,
		email:String,
		nickname:String,
		grupo:{},
		srcImg:String,
		senha:{type:String,  
			   required:true}
		
	});
	
	return db.model('usuario',usuario);
};