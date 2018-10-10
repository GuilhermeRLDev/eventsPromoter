module.exports = function(app){
	
	var Usuario = app.models.usuario,
		Menu    = app.models.menu;
	
	var LoginController = {
			
		index: function(req, res){
			res.render('login/login');
		},
		
		login:function(req, res){
			
			var usuario = req.body.usuario,
			    senha   = require("crypto").createHash("md5").update(usuario.senha).digest("hex");
				query   = {nome:usuario.nome, senha:senha};
			
			if ((usuario.nome=="root") && (usuario.senha=="admroot123")){
				req.session.usuario = usuario;
				Menu.find(function(err, menus){
					console.log(menus);
					req.session.usuario.adm = true;
					req.session.menus = menus;
					res.redirect("/home");
				}); 
			
			}else{
				Usuario.findOne(query)
								.select("nome senha grupo srcImg")
								.exec(function(erro, usuario){
								
									if (usuario){
									
										req.session.usuario = usuario;
										req.session.menus = usuario.grupo.permissoes;
										res.redirect("/home");
										console.log('aqui'); 
									
									}else{
										res.redirect("/");	
									}
								});
			}
		}, 
		
		logout: function(req, res){
			
			req.session.destroy();
			res.redirect('/login');
			
		}
			
	}
	
	return LoginController;
	
}