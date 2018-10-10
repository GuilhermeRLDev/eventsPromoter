module.exports = function(app){
	
	var login = app.controllers.login;
	
	app.get ('/login',login.index);
	app.post('/login',login.login);
	app.get('/logout',login.logout);
	
	
}