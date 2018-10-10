module.exports = function(app){
	
	var Banner 		 	 = app.models.banner,
		funcoes          = require('./funcoes'),
		ctrlMananger 	 = require('./controllerMananger');
		BannerController = new ctrlMananger(Banner); 
		
		
	BannerController.addImagem = function(req, res){
		
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
			var nNome = funcoes.newName(files.file0.name);
			nNome += files.file0.name;
			pathV += nNome; 
			path  += nNome; 
			console.log(path);
			fs.readFile(files.file0.path, function(erro, data){
			
				fs.writeFile(path, data, function(err){
					
					im.resize({
						  srcPath:path,
						  dstPath: path,
						  width:  800
						}, function(err, stdout, stderr){
						  if (err) throw err;
						  // Gera a miniatura
						  im.resize({
							  srcPath:path,
							  dstPath: './public/miniaturas/'+pathV,
							  width:  250
							}, function(err, stdout, stderr){
							  if (err) throw err;
							  console.log('resized');
							  res.json({erro:false});
							});
					});
				});
			
			});
			
			Banner.create({nome:pathV,endereco:path},function(err){
				
				if (err) return err;
				
				res.json({erros:false});
				
			});
		}
	};
	
	return BannerController;
	
};