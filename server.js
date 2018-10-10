var express = require('express')
  , load   = require('express-load')
  , app = express()
  , server   = require('http').createServer(app)
  , io    = require('socket.io').listen(server)
  , mongoose = require('mongoose');

global.db = mongoose.connect('mongodb://localhost/forum');

//var strConnection = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
//global.db = mongoose.connect('mongodb://MongoLab-qz:rAkR3GfnV_27kE8jDkhlna3lwccFTZRCSoP03alTQfk-@ds030817.mongolab.com:30817/MongoLab-qz');
//global.db = mongoose.connect('mongodb://guilhermeRL:159753@ds048537.mongolab.com:48537/inbalada');
var porta = process.env.PORT ||3001;


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
