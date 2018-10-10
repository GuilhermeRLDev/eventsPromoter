module.exports = function(app){
	
	var Menu    = app.models.menu,
		Usuario = app.models.usuario,
		Grupo   = app.models.grupo;
	
	
	var MenuController = {
			
			listar: function(req, res){
				
				Menu.find(function(err, menus){
					if (err) res.json({erros:true, msg:err});
					res.json(menus);
				});
			},
			getOne: function(req, res){
				
				Menu.findById(req.params.id,function(err, menu){
						
					if (err) res.json({erros:true,msg:err});
					res.json(menu);
					
				});
				
			}, 
			getMenuByNome: function(req,res){
				
				Menu.count({nome:req.params.nome},function(err, resp){
					
					if (err) res.json({erros:true,msg:false});
					res.json({count:resp});
					
				});
				
			},
			getMenuByEndereco: function(req,res){
				
				Menu.count({endereco:req.params.endereco},function(err, resp){
					
					if (err) res.json({erros:true,msg:false});
					res.json({count:resp});
					
				});
				
			},
			update: function(req, res){
				
				Menu.findById(req.params.id,function(err, menu){
					
					if(err) res.json({erros:true,msg:err});
					
					menu.nome = req.body.nome;
					menu.endereco = req.body.endereco;
					
					Grupo.find(function(err, grupos){
							grupos.forEach(function(g, i){
							
								
								if (g.permissoes){
									
									g.permissoes.forEach(function(p, i, arr){
										
										if (p._id.equals(menu._id)){
											g.permissoes.splice(i,1, menu); 
											
										}
											
									});
									console.log(g, "aqui save");
									g.save(function(err){
										
										if (!err){
											
											Usuario.find({"grupo.nome":g.nome},function(err, usuarios){
												
												usuarios.forEach(function(u, i){ 
													u.grupo = g;
													u.save();
													
												});
												
											});
											
										}
										
									});
									
								}	
							});
							menu.save(function(err, menu){
								
								res.json({erros:false});
								
							});
					});
				});
			},
			create: function(req, res){
					
				Menu.create(req.body,function(err, menu){
						
					if(err) res.json({erros:true,msg:err});
					res.json(menu);	
				});
					
			},
			del: function(req, res){
				
				Menu.remove({_id: req.params.id},function(err){
					if (err) res.json({erros:true, msg:err});
					res.json({erros:false});
					
				})
				
			}
		};
	
		return MenuController;
};


	