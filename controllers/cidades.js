module.exports = function(app){
	
	var CtrlMananger = require("./controllerMananger"),  
		Cidade    = app.models.cidade,
		CidadeController = new CtrlMananger(Cidade);
	
	
	CidadeController.update = function(req, res){
		
		Cidade.findById(req.params.id,function(err, model){
			if(err) res.json({erros:true,msg:err});
			console.log(req.body);
			model.nome = req.body.nome;
			model.uf   = req.body.uf;
			model.save(function(err, menu){
				
				res.json({erros:false});
				
			});
		
		});
	};
	
	return CidadeController;
	
	
};


	