
var express = require('express')
  , load   = require('express-load')
  , app = express()
  , server   = require('http').createServer(app)
  , io    = require('socket.io').listen(server)
  , mongoose = require('mongoose');

global.db = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
var porta = process.env.PORT ||3000;


app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('forum'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname+'/public'));


load('models')
		.then('controllers')
		.then('routes')
		.into(app);

load('sockets')
		.into(io);
	

app.listen(porta, function(){
  console.log("Forum iniciado com sucesso na porta");
});
