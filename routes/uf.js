module.exports = function(app){
	
	var Uf = app.controllers.uf;
	
	app.get("/ufs",Uf.get);
	
};