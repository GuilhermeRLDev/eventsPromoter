module.exports = function(app){
	
		var Schema = require('mongoose').Schema,
			
		banner = Schema({
			nome : {type:String},
			endereco:{type:String,require:true}
		});
		
		return db.model('banner', banner);
		
};