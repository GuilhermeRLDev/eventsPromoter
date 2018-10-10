function newName(nome){
	
	var  crypto = require("crypto");
	
	var nNome = nome + Math.random();
	
	return crypto.createHash('md5')
				 .update(nNome)
				 .digest('hex');
		
}
module.exports = function(app){
	
	var Evento = app.models.evento,
		CrtlMananger = require("./controllerMananger"),
		EventoController = CrtlMananger(Evento);
		
		EventoController.update = function(req, res){
			
			Evento.findById(req.params.id,function(err, model){
				if(err) res.json({erros:true,msg:err});
				console.log(req.body);
				model.titulo 	  = req.body.titulo;
				model.descricao   = req.body.descricao;
				model.data 		  = req.body.data;
				model.data_cad    = req.body.data_cad;
				model.cidade      = req.body.cidade;
				model.cep         = req.body.cep;
				model.rua         = req.body.rua;
				model.bairro      = req.body.bairro;
				model.local       = req.body.local;
				model.longitude   = req.body.longitude;
				model.latitude    = req.body.latitude;
				model.estilo      = req.body.estilo;
				model.tipo        = req.body.tipo;
				model.finalizado  = req.body.finalizado;
				model.numero      = req.body.numero;
				model.imgCapa     = req.body.imgCapa;
				model.bloq        = false;
				model.save(function(err, menu){
					
					res.json({erros:false});
					
				});
			
			});
		};
		EventoController.getModelByNome = function(req,res){
			
			Evento.count({titulo:req.params.nome},function(err, resp){
				
				if (err) res.json({erros:true,msg:false});
				res.json({count:resp});
				
			});
			
		};
	
		EventoController.getGalery = function(req, res){
			Evento.findById(req.params.id, function(err, evn){
				
				res.json(evn.imagens);
				
				
			});
		};
		
		
		EventoController.addImagem = function(req, res){
			
			Evento.findById(req.params.id, function(err, evn){
				
				var fs = require("fs"),
					im = require('imagemagick'),
				path = "./public/uploads/",
				pathV = "",
				files = req.files;
				uploads = [];
				console.log(path);
				console.log(req.body, req.files,"----------------------------------------");
				if (files){	
					console.log('aqui upload');
					var nNome = newName(files.file0.name);
					nNome += files.file0.name;
					pathV += nNome; 
					path  += nNome; 
					console.log(path);
					fs.readFile(files.file0.path, function(erro, data){
					
						fs.writeFile(path, data, function(err){
							
							im.resize({
								  srcPath:path,
								  dstPath: path,
								  width:  1024
								}, function(err, stdout, stderr){
								  if (err) throw err;
								  // Gera a miniatura
								  im.resize({
									  srcPath:path,
									  dstPath: "./public/miniaturas/"+pathV,
									  width:  250
									}, function(err, stdout, stderr){
									  if (err) console.log(err);
									  console.log('resized');
									  res.json({erro:false});
									});
							});
						});
					
					});
					
					imagens = evn.imagens; 
					
					imagens.push({imgSrc:nNome});
					
					evn.imagens = imagens;
					
					evn.save(function(err, env){
						
						res.json(env.imagens);
						
					});
					
					//req.session.upload = {nome:files.arquivos.name, path:path};
					//res.json({nome:files.file0.name, path:pathV});
			};
				
				
			});
			
			
			
		};
		
		EventoController.removeImagem = function (req, res){
			
			
			Evento.findById(req.params.id,function(err, env){
				
				var imagens = env.imagens;
				
				var imagem = imagens.id(req.params.idImagem);
				imagem.remove();
				
				env.save(function(){
					
					res.json(imagem);
					
				});
				
			});
			
			
		};
		
		
		return EventoController;
	
	
};