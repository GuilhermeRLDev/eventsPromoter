module.exports = function(app){
	
	var home = app.controllers.home,
		upload = require("./../middleware/uploads");;
	
	app.get('/home',home.index);
	app.get('/home/getUser',home.getUser);
	app.post('/home',home.create);
	app.del('/home/:id',home.remove);
	app.get('/home/:id',home.getOne);
	app.put('/home/:id',home.atualiza);
	app.get('/home/getmail/:email',home.getUserByMail);
	app.get('/home/getnick/:nickname',home.getuserByNickname);
	app.post('/home/upload',upload);
};