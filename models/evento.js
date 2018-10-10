module.exports = function(app){
	
	
	var Schema = require("mongoose").Schema;

	
	var imagem = Schema({imgSrc:{type:String, 
						 require:true}
						});
	
	
	var evento = Schema({
		
		titulo:{type:String, require:true},
		descricao:{type:String, require:true},
		data: {type:Date, require:true},
		data_cad: {type:Date, require:true},
		cidade: {},
		//cep:{type:String, require:true},
		rua:{type:String, require:true},
		bairro:{type:String, require:true},
		local: {type:String, require:true},
		longitude:{type:Number},
		latitude: {type:Number},
		numero: {type:Number},
		estilo:{},
		tipo:{},
		imgCapa:{type:String,  require:true},
		imgSlide:[imagem],
		finalizado:{type:Boolean ,require:true},
		//capa:{type:Boolean, require:true},
		imagens:[imagem],
		bloq: {type:Boolean, require:true}
	});	
	
	
	evento.virtual('data.formated').get(function(){
		return this.data.toString().substr(0,10);
	});
	
	return db.model("evento", evento);
	
	
};