module.exports = function(app){
	
	var permissoes = app.controllers.permissoes;
	
	app.put('/permissao/:id',permissoes.create);
	app.get('/permissao/:id',permissoes.get);
	
	
};