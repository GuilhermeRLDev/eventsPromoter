module.exports = function(app){
	
	var Tipo = app.models.tipo,
		CtrlMananger = require("./controllerMananger"),
		TipoController = new  CtrlMananger(Tipo);
	
		TipoController.update = function(req, res){
			
			Tipo.findById(req.params.id,function(err, model){
				if(err) res.json({erros:true,msg:err});
				console.log(req.body);
				model.nome = req.body.nome;
				model.save(function(err, model){
			
					res.json({erros:false});
			
				});
			
			});
		};
		
		return TipoController;
		
};