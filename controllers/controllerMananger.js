module.exports  = function(Model){
	
		
		var  methods = {

							listar: function(req, res){
								
								Model.find(function(err, models){
									if (err) res.json({erros:true, msg:err});
									res.json(models);
								});
							},
							getOne: function(req, res){
								
								Model.findById(req.params.id,function(err, model){
										
									if (err) res.json({erros:true,msg:err});
									res.json(model);
									
								});
								
							}, 
							getModelByNome: function(req,res){
								
								Model.count({nome:req.params.nome},function(err, resp){
									
									if (err) res.json({erros:true,msg:false});
									res.json({count:resp});
									
								});
								
							},
							create: function(req, res){
									
								Model.create(req.body,function(err, m){
										
									if(err) res.json({erros:true,msg:err});
									res.json(m);	
								});
									
							},
							del: function(req, res){
								
								Model.remove({_id: req.params.id},function(err){
									if (err) res.json({erros:true, msg:err});
									res.json({erros:false});
									
								});
								
							}
					};
			
		
			return methods;
			
};