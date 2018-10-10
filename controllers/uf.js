module.exports = function(app){
	
	var UF = app.models.uf;
	
	var UfController = {
			
			get: function(req, res){
			
				UF.find(function(err, ufs){
					console.log(ufs);
					if (err) console.log(err);
					res.json(ufs);
					
					
				});
			}
	};
	
	return UfController;
	
};