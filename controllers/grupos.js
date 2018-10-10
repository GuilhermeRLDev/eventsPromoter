module.exports = function(app){
	
	var Grupos = app.models.grupo;
	
	var GruposController = {
			
			listar: function(req,res){
		
				Grupos.find(function(err, grupos){
					
					console.log(grupos);
					res.json(grupos);
					
				});
		
			},
			getOne: function(req,res){
						
				Grupos.findById(req.params.id,function(err, grupo){
					console.log(err);
					console.log(grupo);
					if(err) res.json({erro:true});
					
					res.json(grupo);
					
				});	
			
			},
			getGrupoByNome: function(req,res){
				
				Grupos.count({nome:req.params.nome},function(err, grupo){
					
					if (err) res.json({erro:true});
					res.json({count:grupo});
				});
				
			},
			remove:function(req,res){
				
				Grupos.remove({_id:req.params.id},function(err){
					
					if(err)  res.json({error:true});
					res.json({error:false});
					
				});
				
			},
			create:function(req,res){
				
				grupo = req.body;
				console.log(grupo);
				grupo.permissoes = [];
				Grupos.create(grupo,function(err, grupo){
					console.log('aqui');
					if (err) res.json({error:true}); 
					res.json(grupo);
					
				});
							
			},
			atualiza:function(req,res){
				console.log(req.params.id);
				Grupos.findById(req.params.id, function(err,grupo){
					
					grupo.nome = req.body.nome;
					
					grupo.save(function(err){ 
						
						if (err) res.json({error:true});
						res.json(grupo);
						
					})
					
				});
				
			}
	};
	
	return GruposController;
}