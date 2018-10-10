module.exports = function(app){
	
	var tipo = app.controllers.tipo;
	
	app.get('/tipo'    ,tipo.listar);
	app.get('/tipo/:id',tipo.getOne);
	app.post('/tipo'   ,tipo.create);
	app.put('/tipo/:id',tipo.update);
	app.del('/tipo/:id',tipo.del);
	app.get('/tipo/getnome/:nome', tipo.getModelByNome);
	
	
};