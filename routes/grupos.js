module.exports = function(app){

	var grupos = app.controllers.grupos;
	
	app.get('/grupos', grupos.listar);
	app.get('/grupos/:id', grupos.getOne);
	app.get('/grupos/getnome/:nome', grupos.getGrupoByNome);
	app.del('/grupos/:id',grupos.remove);
	app.post('/grupos', grupos.create);
	app.put('/grupos/:id',grupos.atualiza);

}