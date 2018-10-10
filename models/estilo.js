module.exports =  function(app){
	
	var Schema = require("mongoose").Schema,
	
	
	estilo = Schema({
		nome:{type:String, require:true}
	});
	
	return db.model('estilo', estilo);
	
};