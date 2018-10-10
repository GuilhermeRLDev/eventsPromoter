function factoryTipo(resource){
	
	return  resource('/tipo/:metodo/:idTipo', {metodo:'@metodo',idTipo:'@idTipo'}, {
        query   : { method: 'GET', params: {metodo:null,idTipo:null}, isArray: true },
        del  	: { method: 'DELETE',params:{metodo:null,idTipo:'@idTipo'}},
        update  : { method: 'PUT',params:{metodo:null, idTipo:'@idTipo'}},
        get     : { method: 'GET',params:{metodo:null,idTipo:'@idTipo'}},
        findnome: { method: 'GET',params:{metodo:'getnome',idTipo:'@idTipo'}}
     });
	
}


function ListTipoController($scope,Tipo ,$location){
	
	$scope.tipos = Tipo.query();
	
}
function CadTipoController($scope,Tipo, $location){
			
		$scope.save = function(){
			
			clearErrors();
			if (($scope.tipo == null)){
					 printError('Verifique se os campos obrigatórios foram preenchidos!');
			}else{
				
				clearErrors();
				Tipo.findnome({idTipo:$scope.tipo.nome},function(res){
					
					if (res.count > 0){
						printError('Tipo já existe!');
						return;
					}
					
					var tipo = new Tipo($scope.tipo);
					
					tipo.$save(function(err){
					
						if (err) console.log(err);
					
							$location.path('tipos');
					
					});
					
				});
			}
		};
}	

function EditTipoController($scope, Tipo, $location, $routeParams){
	
	$scope.tipo = Tipo.get({idTipo:$routeParams.idTipo});
	
	$scope.save = function(){
		console.log('aqui');
		$scope.tipo.$update({idTipo : $routeParams.idTipo}, function(){		
			$location.path('tipos');	
		});	
	};
	$scope.remove = function(){
		
		Tipo.del({idTipo:$routeParams.idTipo},function(){
			
			$location.path('tipos');
			
		});
		
	};
}
