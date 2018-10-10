module.exports = function(app){
	
	var cidades = app.controllers.cidades;
	
	app.get('/cidades'    ,cidades.listar);
	app.get('/cidades/:id',cidades.getOne);
	app.post('/cidades'   ,cidades.create);
	app.put('/cidades/:id',cidades.update);
	app.del('/cidades/:id',cidades.del);
	app.get('/cidades/getnome/:nome', cidades.getModelByNome);
};