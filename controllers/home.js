module.exports = function( app ){
	
	var Usuario = app.models.usuario;
	var Grupo   = app.models.grupo;
	
	var HomeController = {
			
		index: function(req, res){
			var usuario = req.session.usuario,
				menus   = req.session.menus,
				params  = {usuario:usuario,menus:menus};

			if ( usuario ){
				res.render('base',params);
			} else {
				res.json({Success: false, 
						  Message: 'Usuário ou senha incorretos verifique!', 
						  Content: []
						});
			} 
			
		},
		getUser: function(req,res){
			
			Usuario.find(function(err, users){
				res.json(users);
				
			});
			
		},
		create: function(req, res){
			
			console.log(req.body,'body');
			
			var usuario = req.body,
				crypto   = require('crypto');
			
			usuario.senha = crypto.createHash('md5')
								  .update(usuario.senha)
								  .digest('hex');
			
			Usuario.create(req.body, function(erro,usuario){
				
				if (erro){	
					
					res.json({erro:true});
					
				}else{		
					
					res.json(usuario);
					console.log('aqui1'); 
				}	
			});
			
		},
		remove: function(req, res){
			
			Usuario.remove({_id:req.params.id}, function (err) {
				  if (err) return handleError(err);
				  res.json({erro:false});
			});
			
		},
		getOne: function(req, res){
			
			
			Usuario.findById(req.params.id, function(error, user){
				
				if(!error){
					
					res.json(user);
					console.log(user.grupo);
					
				} 
				else
				{
					res.json({erro:true});
				}
				
			});
			
			
		},
		getUserByMail: function(req,res){

		   Usuario.count({email:req.params.email},  function (err, count){
			   
			   if (err) res.json({count:0});
			   res.json({count:count});
		   });
		
		},
		getuserByNickname: function(req,res){
			
			Usuario.count({nickname:req.params.nickname},  function (err, count){
				   
				   if (err) res.json({count:0});
				   res.json({count:count});
			});
		
		},
		atualiza: function(req,res){
			var crypto = require("crypto");
			Usuario.findById(req.params.id, function(error, usuario){
				
				if(!error){
					console.log(req.body);
					console.log("aqui");
					usuario.nome     = req.body.nome;
					usuario.email    = req.body.email;
					usuario.grupo    = req.body.grupo;
					usuario.nickname = req.body.nickname;
					usuario.srcImg   = req.body.srcImg;
					if(usuario.senha != req.body.senha ){
						usuario.senha    = crypto.createHash('md5')
														.update(req.body.senha)
														.digest('hex');
					}	
					usuario.save(function(err){
						if (err) console.log(err);
						res.json({error:false});
					});
				}
				
			});
		}
	};
	
	return HomeController;
};