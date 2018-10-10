module.exports = function(app){
	
	var site = app.controllers.site;
	
	
	app.get("/", site.home);
	app.get("/site/eventos",site.getEventos);
	app.get("/site/eventos/all",site.getAllEventos);
	app.get("/site/eventos/:id",site.getEventoById);
	app.get("/site/agenda",site.getAgenda);
	
}