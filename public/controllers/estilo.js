function factoryEstilo(resource){
	
	return  resource('/estilo/:metodo/:idEstilo', {metodo:'@metodo',idEstilo:'@idEstilo'}, {
        query   : { method: 'GET', params: {metodo:null,idEstilo:null}, isArray: true },
        del  	: { method: 'DELETE',params:{metodo:null,idEstilo:'@idEstilo'}},
        update  : { method: 'PUT',params:{metodo:null, idEstilo:'@idEstilo'}},
        get     : { method: 'GET',params:{metodo:null,idEstilo:'@idEstilo'}},
        findnome: { method: 'GET',params:{metodo:'getnome',idEstilo:'@idEstilo'}}
     });
	
}

function ListEstiloController($scope,Estilo ,$location){
	
	$scope.estilos = Estilo.query();
	
}
function CadEstiloController($scope,Estilo, $location){
			
		$scope.save = function(){
			
			clearErrors();
			if (($scope.estilo == null)){
					 printError('Verifique se os campos obrigatórios foram preenchidos!');
			}else{
			
				clearErrors();
				Estilo.findnome({idEstilo:$scope.estilo.nome},function(res){
					
					if (res.count > 0){
						printError('Estilo já existe!');
						return;
					}
					
					var estilo = new Estilo($scope.estilo);
					
					estilo.$save(function(err){
					
						if (err) console.log(err);
					
							$location.path('estilos');
					
					});
					
				});
			}
		};
}	

function EditEstiloController($scope, Estilo, $location, $routeParams){
	
	$scope.estilo = Estilo.get({idEstilo:$routeParams.idEstilo});
	
	$scope.save = function(){
		console.log('aqui');
		$scope.estilo.$update({idEstilo : $routeParams.idEstilo}, function(){		
			$location.path('estilos');	
		});	
	};
	$scope.remove = function(){
		
		Estilo.del({idEstilo:$routeParams.idEstilo},function(){
			
			$location.path('estilos');
			
		});
		
	};
}
