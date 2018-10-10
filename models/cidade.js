module.exports =  function(app){
	
	var Schema = require("mongoose").Schema,
	
	
	cidade = Schema({
		uf:{},
		nome:{type:String, require:true}
		
	});
	
	return db.model('cidade', cidade);
	
};