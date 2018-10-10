module.exports = function(app){
	
	var  Grupo = app.models.grupo,
		 Usuario =  app.models.usuario,
		 PermissoesController = {
			
			get: function(req, res){
				
				Grupo.find(req.params.id,  function(err, perm){
					
					if (err) res.json({erros:true,msg:err});
					res.json(perm);
				});
		
			},
			create:function(req, res){
				
				Grupo.findById(req.params.id, function(err, perm){
					
					perm.permissoes = req.body[0];
					console.log(req.body); 
					console.log(perm,'aqui');
					
					perm.save(function(err, perm){
						if (!err){
							Usuario.find({"grupo.nome":perm.nome},function(err, usuarios){
								console.log(usuarios);
								usuarios.forEach(function(u,i){
									console.log(u);
									if (u.grupo){ 
										if (u.grupo.nome == perm.nome){
										
											u.grupo = perm;
											u.save();
										
										}
									}
								});
							});

							res.json({erros:false});
						}
						
					});
					
				});
				
			}
			
			
		 };
		
		 return PermissoesController;
	
};