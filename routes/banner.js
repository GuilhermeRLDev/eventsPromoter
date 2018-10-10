module.exports = function(app){
	
	var banner = app.controllers.banner;
	
	
	app.get('/banners/listar',banner.listar);
	app.post('/banner/addImagem',banner.addImagem);
	app.del('/banners/:id',banner.del);
	
};