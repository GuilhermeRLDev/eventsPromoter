module.exports = function(app){
	
	var mailer = app.controllers.mailer;
	
	
	app.post('/mailer/sent', mailer.enviar);
	
	
	
};