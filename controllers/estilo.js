module.exports = function(app){
	
	var Estilo = app.models.estilo,
		CtrcMananger = require("./controllerMananger"),
		EstiloController = new CtrcMananger(Estilo);
	
		EstiloController.update = function(req, res){
			
			Estilo.findById(req.params.id,function(err, model){
				if(err) res.json({erros:true,msg:err});
				model.nome = req.body.nome;
				model.save(function(err, model){
			
					res.json({erros:false});
			
				});
			
			});
		};
		
		
		return EstiloController;
	
	
};