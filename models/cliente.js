module.exports =  function(app){
	
	var Schema = require("mongoose").Schema,
	
	
	cliente = Schema({
		nome:{type:String, require:true},
		cpfcnpj: { type: String, require: true},
		cidade: {},
		cep: { type: String, require: true },
		endereco: { type: String, require: true},
		complemento: { type: String, require: true},
		numero: { type: String, require: true},
		datanasc: { type: Date, require: true},
		usuario: {}	
	});
	
	return db.model('cliente', cliente);
	
};