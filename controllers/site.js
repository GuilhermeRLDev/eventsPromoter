module.exports = function(app){
	
	
	var Evento = app.models.evento;
	
	
	var SiteController = {
			
		home: function(req, res){
			
			res.render('index');
		
		},
		getEventos: function(req, res){
			
			Evento.find({finalizado:true})
				.limit(6)
				.exec(function(err, eventos){
					
					res.json(eventos);
					
				});
			
		},
		getAllEventos: function(req, res){
			
			Evento.find({finalizado:true})
				.exec(function(err, eventos){
					
					res.json(eventos);
					
				});
			
		},
		getEventoById: function(req, res){
			
			Evento.findById(req.params.id, function(err, evento){
				
				if (err) res.json({error:true});
				res.json(evento);
				
			});
			
		},
		getAgenda: function(req, res){
			var data = new Date();
				data = data.toJSON().substr(0,10);
				console.log(data);
			Evento.find({})
				.where('data')
				.gte(data)
				.sort('data')
				.limit(10)
				.exec(function(err,data){
					if (err) res.json({erro:true});
					console.log(data);
					res.json(data);
					
				});
		}
			
	};	
	
	return SiteController;
}