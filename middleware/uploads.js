function newName(nome){
	
	var  crypto = require("crypto");
	
	var nNome = nome + Math.random();
	
	return crypto.createHash('md5')
				 .update(nNome)
				 .digest('hex');
		
}

module.exports = function(req , res, next){
	
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
					//Cria miniatura...
					if (err) console.log(err);
					im.resize({
					  srcData: fs.readFileSync(path, 'binary'),
					  width:   300
					}, function(err, stdout, stderr){
					  if (err) throw err
					  fs.writeFileSync('./public/miniaturas/'+pathV, stdout, 'binary');
					  console.log('resized kittens.jpg to fit within 256x256px');
					});
				/*	im.resize({
						  srcPath:path,
						  dstPath: __dirname + '/public/miniaturas/'+pathV,
						  width:  300
						}, function(err, stdout, stderr){
						  if (err) throw err;
						  console.log('resized');
						});*/
					});
			
			});

			//req.session.upload = {nome:files.arquivos.name, path:path};
			res.json({nome:files.file0.name, path:pathV});
	}
	//return next();
	
}