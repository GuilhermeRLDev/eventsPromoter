module.exports =  function(app){
	
	var Schema = require("mongoose").Schema,
	
	
	tipo = Schema({
		nome:{type:String, require:true}
	});
	
	return db.model('tipo', tipo);
	
};