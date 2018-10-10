module.exports = function(app){
	
	var CtrlMananger = require("./controllerMananger"),  
		Cliente    = app.models.cliente,
		ClienteController = new CtrlMananger(Cliente);
	
	
	ClienteController.update = function(req, res){
		
		Cliente.findById(req.params.id,function(err, model){
			if(err) res.json({erros:true,msg:err});
			console.log(req.body);
			
			model.nome = req.body.nome;
			model.uf   = req.body.uf;
			model.cpfcnpj = req.body.cpfcnpj;
			model.cidade = req.body.cidade; 
			model.cep = req.body.cep;
			model.endereco = req.body.endereco;
			model.complemento = req.body.complemento;
			model.numero = req.body.numero;
			model.datanasc = req.body.datanasc;
			model.usuario = req.body.usuario;

			model.save(function(err, menu){
				
				res.json({erros:false});
				
			});
		
		});
	};
	
	return ClienteController;
	
	
};


	