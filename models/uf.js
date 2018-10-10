module.exports = function(app){
	
	
	var Schema = require("mongoose").Schema;
	
	
	var uf = Schema({
		nome:{type:String,require:true},
		sigla:{type:String,require:true}
	});
	
	
	return db.model("uf", uf);
	
};