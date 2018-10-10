module.exports = function(app){
	
	
	var menu = app.controllers.menu;
	
	app.get('/menu',menu.listar);
	app.get('/menu/:id',menu.getOne);
	app.post('/menu',menu.create);
	app.get('/menu/getnome/:nome',menu.getMenuByNome);
	app.get('/menu/getendereco/:endereco',menu.getMenuByEndereco);
	app.del('/menu/:id',menu.del);
	app.put('/menu/:id', menu.update);
	
}