module.exports = function(app){
	
	var evento     = app.controllers.evento,
		autenticar = require("./../middleware/autenticador");
	
	app.get('/evento'    						,autenticar,evento.listar);
	app.get('/evento/:id'						,evento.getOne);
	app.post('/evento'							,evento.create);
	app.put('/evento/:id'						,evento.update);
	app.del('/evento/:id'						,evento.del);
	app.put('/evento/addimage/:id'				,evento.addImagem);
	app.put('/evento/removeimage/:id/:idImagem'	,evento.removeImagem);
	app.get('/evento/getgalery/:id'				,evento.getGalery);
	app.get('/evento/getnome/:nome'				,evento.getModelByNome);
	
};