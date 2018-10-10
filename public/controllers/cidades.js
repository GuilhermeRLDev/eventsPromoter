function factoryCidades(resource){
	
	return  resource('/cidades/:metodo/:idCidade', {metodo:'@metodo',idGrupo:'@idCidade'}, {
        query   : { method: 'GET', params: {metodo:null,idCidade:null}, isArray: true },
        del  	: { method: 'DELETE',params:{metodo:null,idCidade:'@idCidade'}},
        update  : { method: 'PUT',params:{metodo:null, idCidade:'@idCidade'}},
        get     : { method: 'GET',params:{metodo:null,idCidade:'@idCidade'}},
        findnome: { method: 'GET',params:{metodo:'getnome',idCidade:'@idCidade'}}
     });
	
}


//Controllers de cidades
function ListCidadesController($scope,Cidade ,$location){
	
	$scope.cidades = Cidade.query();
	
}
function CadCidadesController($scope,Cidade,UF , $location){
		
		$scope.ufs = UF.query();
		
		$scope.save = function(){
			
			clearErrors();
			if (($scope.cidade.nome == null)||($scope.cidade.uf ==null)){
					 printError('Verifique se os campos obrigatórios foram preenchidos!');
			}else{
			
				clearErrors();
				Cidade.findnome({idCidade:$scope.cidade.nome},function(res){
					
					if (res.count > 0){
						printError('Cidade já existe!');
						return;
					}
					
					var cidade = new Cidade($scope.cidade);
					
					cidade.$save(function(err){
					
						if (err) console.log(err);
					
							$location.path('consCidades');
					
					});
					
				});
			}
		};
}	

function EditCidadesController($scope, Cidade, UF, $location, $routeParams){
	
	cidade = Cidade.get({idCidade:$routeParams.idCidade}, function(cidade){
		
		ufs = UF.query(function(){
			
			ufs.forEach(function(uf, i){
				
				if (uf.sigla == cidade.uf.sigla){
					console.log('aqui1');
					ufs.splice(i, 1, cidade.uf);
					
				}
					
			});
			
		});
		$scope.ufs = ufs;
		$scope.cidade = cidade;
	} );
	
	
	$scope.save = function(){
		console.log('aqui');
		$scope.cidade.$update({idCidade : $routeParams.idCidade}, function(){		
			$location.path('cidades');	
		});	
	};
	
	$scope.remove = function(){
		
		Cidade.del({idCidade:$routeParams.idCidade},function(){
			
			$location.path('cidades');
			
		});
		
	};
}
