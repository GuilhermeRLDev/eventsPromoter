module.exports = function( app ){
	
	var clientes = app.controllers.clientes;
	
	app.get('/clientes'    ,clientes.listar);
	app.get('/clientes/:id',clientes.getOne);
	app.post('/clientes'   ,clientes.create);
	app.put('/clientes/:id',clientes.update);
	app.del('/clientes/:id',clientes.del);
	app.get('/clientes/getnome/:nome', clientes.getModelByNome);
};