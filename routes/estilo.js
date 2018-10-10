module.exports = function(app){
	
	var estilo = app.controllers.estilo;
	
	app.get('/estilo'    ,estilo.listar);
	app.get('/estilo/:id',estilo.getOne);
	app.post('/estilo'   ,estilo.create);
	app.put('/estilo/:id',estilo.update);
	app.del('/estilo/:id',estilo.del);
	app.get('/estilo/getnome/:nome', estilo.getModelByNome);
	
	
}