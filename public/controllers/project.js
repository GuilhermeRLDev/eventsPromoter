var app = angular.module('project',['ngRoute','ngResource','ui.bootstrap'])
.factory('Usuario',function($resource){
	return $resource('/home/:metodo/:idUser', {metodo:'@metodo',idUser:'@idUser'}, {
              query   : { method: 'GET', params: {metodo:null,idUser:'getUser'}, isArray: true },
              del  	  : { method: 'DELETE',params:{metodo:null,idUser:'@idUser'}},
              update  : { method: 'PUT',params:{metodo:null, idUser:'@idUser'}},
              save    : { method: 'POST',headers:{enctype:'multipart/form-data'},params:{metodo:null, idUser:null}},
              get     : { method: 'GET',params:{metodo:null,idUser:'@idUser'}},
              findmail: { method: 'GET',params:{metodo:'getmail',idUser:'@idUser'}},
              findnick: { method: 'GET',params:{metodo:'getnick',idUser:'@idUser'}}
    });
})
.factory('Grupo',function($resource){
	
	return $resource('/grupos/:metodo/:idGrupo', {metodo:'@metodo',idGrupo:'@idGrupo'}, {
        query   : { method: 'GET', params: {metodo:null,idGrupo:null}, isArray: true },
        del  	  : { method: 'DELETE',params:{metodo:null,idGrupo:'@idGrupo'}},
        update  : { method: 'PUT',params:{metodo:null, idGrupo:'@idGrupo'}},
        get     : { method: 'GET',params:{metodo:null,idGrupo:'@idGrupo'}},
        findnome: { method: 'GET',params:{metodo:'getnome',idGrupo:'@idGrupo'}}
     });
	
})
.factory('Menu',function($resource){
	
	return $resource('/menu/:metodo/:idMenu', {metodo:'@metodo',idGrupo:'@idMenu'}, {
        query   : { method: 'GET', params: {metodo:null,idMenu:null}, isArray: true },
        del  	: { method: 'DELETE',params:{metodo:null,idGrupo:'@idMenu'}},
        update  : { method: 'PUT',params:{metodo:null, idMenu:'@idMenu'}},
        get     : { method: 'GET',params:{metodo:null,idMenu:'@idMenu'}},
        findnome: { method: 'GET',params:{metodo:'getnome',idMenu:'@idMenu'}}
     });
	
})
.factory('Permissao',function($resource){
	
	return $resource('/permissao/:metodo/:idPerm', {metodo:'@metodo',idPerm:'@idPerm'}, {
        update  : { method: 'PUT',params:{metodo:null, idPerm:'@idPerm'}},
        get     : { method: 'GET',params:{metodo:null, idPerm:'@idPerm'}},
        salvar  : { method: 'POST',params:{metodo:null, idPerm:'@idPerm'}}
     });
	
})
.factory('Cidade',function($resource){
	
	return factoryCidades($resource);
	
})
.factory('Estilo',function($resource){
	
	return factoryEstilo($resource);
	
})
.factory('Tipo',function($resource){
	
	return factoryTipo($resource);
	
})
.factory('UF',function($resource){
	
	return factoryUF($resource);
	
})
.factory('Evento',function($resource){
	
	return factoryEvento($resource);
	
})
.factory('Banner',function($resource){
	
	return factoryBanner($resource);
	
})
.config(function($routeProvider){
	
$routeProvider
	.when("/consUsu",{
		controller:'ListCtrl',
		templateUrl:'views/usuarios/listUsu.html'	
	})
	.when ("/new",{

		controller:'CreateList',
		templateUrl:'views/usuarios/cadUsu.html'	
	})
	.when("/edit/:userId",{
			
		controller:'EditController',
		templateUrl:'views/usuarios/cadUsu.html'
	 })
	 .when("/consGrupo",{
		 
		 controller:'ListGrupoController',
		 templateUrl:'views/grupos/listGrupo.html'
	 })
	 .when("/consGrupo/:id",{})
	 .when("/newGrupo",{
		
		 controller:'CadGrupoController',
		 templateUrl: 'views/grupos/cadGrupo.html'
		 
	 })
	 .when("/editGrupo/:idGrupo",{
	
		 controller:'EditGrupoController',
		 templateUrl: 'views/grupos/cadGrupo.html'
	 
	 })
	 .when("/consMenu",{
		 
		 controller:'ListMenuController',
		 templateUrl:'views/menus/listMenu.html'
	 })
	 .when("/newMenu",{
		
		 controller:'CadMenuController',
		 templateUrl: 'views/menus/cadMenu.html'
		 
	 })
	 .when("/editMenu/:idMenu",{
	
		 controller:'EditMenuController',
		 templateUrl: 'views/menus/cadMenu.html'
	 
	 })
	  .when("/permissoes/:idPerm",{
	
		 controller:'EditPermissoesController',
		 templateUrl: 'views/grupos/permissoes.html'
	 
	 })
	 .when("/consCidades",{
		 controller:'ListCidadesController',
		 templateUrl: 'views/cidades/listCidades.html'
	 
	 })
	.when("/editCidade/:idCidade",{
	
	 controller:'EditCidadesController',
	 templateUrl: 'views/cidades/cadCidades.html'

	})
	.when("/newCidade",{
	
	 controller:'CadCidadesController',
	 templateUrl: 'views/cidades/cadCidades.html'

	})
	.when("/estilos",{
		 controller:'ListEstiloController',
		 templateUrl: 'views/estilo/listEstilo.html'
	 
	 })
	.when("/editEstilo/:idEstilo",{
	
	 controller:'EditEstiloController',
	 templateUrl: 'views/estilo/cadEstilo.html'

	})
	.when("/newEstilo",{
	
		controller:'CadEstiloController',
		templateUrl: 'views/estilo/cadEstilo.html'

	})
	.when("/editTipo/:idTipo",{
		
		controller:'EditTipoController',
		templateUrl: 'views/tipo/cadTipo.html'

	})
	.when("/newTipo",{
		
		controller:'CadTipoController',
		templateUrl: 'views/tipo/cadTipo.html'

	})
	.when("/tipos",{
		
		 controller:'ListTipoController',
		 templateUrl: 'views/tipo/listTipo.html'
	 
	 })
	 .when("/consEvento",{
			
		 controller:'ListEventoController',
		 templateUrl: 'views/evento/listEvento.html'
	 
	 })
	 .when("/newEvento",{
			
		 controller:'CadEventoController',
		 templateUrl: 'views/evento/cadEvento.html'
	 
	 })
	 .when("/editEvento/:idEvento",{
			
		 controller:'EditEventoController',
		 templateUrl: 'views/evento/cadEvento.html'
		 
	 })
	 .when("/evento/galeriaEvento/:idEvento",{
			
		 controller:'GaleriaEventoController',
		 templateUrl: 'views/evento/galeriaEvento.html'
		 
	 })
	 .when("/evento/galeriaEvento/:idEvento/removerImagem/:idImagem",{
			
		 controller:'RemoveImageController',
		 templateUrl: 'views/evento/galeriaEvento.html'
		 
	 })
	 .when("/banners/listar",{
		 controller:'ListBannersController',
		 templateUrl: 'views/banners/listBanners.html'		 
	 })
	 .when("/banners/addImagem",{
		 controller:'AddBannersController',
		 templateUrl: 'views/banners/addBanners.html'		 
	 })
	 .when("/banners/remove/:idTipo",{
		 controller:'RemoveBannersController',
		 templateUrl: 'views/banners/listBanners.html'		 
	 })
	 .when("/funcionario",{
		 templateUrl: 'views/funcionarios/cadFuncionario.html'		 
	 });


})

// Controllers

//Contollers de usuarios
.controller('ListCtrl', function($scope, Usuario, $routeParams){
	$scope.usuarios = Usuario.query();
	$scope.del = function(id){
		Usuario.del({idUser:id});
		alert($routeParams.userId);
	};
	$scope.edit = function(id){

	};	
})
.controller('EditController', function($scope, Usuario,Grupo , $location,$routeParams){
	  
	   var usuario = Usuario.get({idUser:$routeParams.userId},function(usuario){
		   var grupos  = Grupo.query(function(){
			   grupo = usuario.grupo;
			   if (usuario.grupo){
				   Grupo.findnome({idGrupo:grupo.nome},function(){
					   var achou = false;
					   for (var i = 0; i<= grupos.length-1;i++){
						   if (grupo.nome == grupos[i].nome){
							   grupos.splice(i,1,grupo);
							   achou = true;
							   break;
						   }
					   }
					   if (!achou){
						   grupos.push(grupo);
					   }
					   console.log(grupos);
					   $scope.grupos   = grupos;
					   $scope.usuario  = usuario;    
				   });
			   }else{
				   $scope.grupos   = grupos;
				   $scope.usuario  = usuario;  
			   }
		   });
	   });

	   $scope.save = function(){
	   $scope.usuario.srcImg = $("#srcImg").val();
	   $scope.usuario.$update({idUser:$routeParams.userId},function(){
		   $location.path('consUsu');
	   });

	   };
	   $scope.remove = function(){

		Usuario.del({idUser:$routeParams.userId},function(err){
			
			$location.path('consUsu');
			
		});
		
	   };

})
.controller('CreateList',function($scope,Usuario, Grupo,$location){
	
	$scope.grupos = Grupo.query(); 
	
	
	
	$scope.save = function(){
		console.log($scope.usuario);
		if (($scope.usuario.nome == null) ||
	   	   ($scope.usuario.email == null) ||
	   	   ($scope.usuario.nickname == null)||
	   	   ($scope.usuario.senha == null) ){
			
			clearErrors();
			printError('Verifique se todos os campos obrigatórios foram preenchidos!');
			$('html, body').animate({scrollTop: 0},'slow');
			
		} else {
			
			Usuario.findmail({idUser:$scope.usuario.email}, function(res){
				clearErrors();
				if(res.count>0){
					printError('Email informado já está sendo utilizados por outro usuário!');
					return;
				}
				
					
				Usuario.findnick({idUser:$scope.usuario.nickname}, function(res){
	
					if(res.count>0){
						printError('Nickname informado já está sendo utilizado por outro usuário!');
						return;
					}
					$scope.usuario.srcImg = $("#srcImg").val();
					var usuario = new Usuario($scope.usuario);
					usuario.$save(function(error, resp){
						if (!error.error){
							$location.path('consUsu');
						}else{
					
							alert(error.error);

						}	
					});
						
				});
					
			});

		}
	};
	
})
//Controllers de grupos de usuarios
.controller('ListGrupoController',function($scope,Grupo ,$location, $modal){
	
	$scope.grupos = Grupo.query();
	
	$scope.open = function () {

	    var modalInstance = $modal.open({
	      templateUrl: 'views/grupos/ModalPermissoes.html',
	      controller: ModalInstanceCtrl,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	    //modalInstance.result.then(function (selectedItem) {
	    //}, function () {
	     // $log.info('Modal dismissed at: ' + new Date());
	    //});
	  };

	// Please note that $modalInstance represents a modal window (instance) dependency.
	// It is not the same as the $modal service used above.

	var ModalInstanceCtrl = function ($scope, $modalInstance, Menu, $routeParams) {
	  
	  $scope.menus = Menu.query();
      console.log($routeParams.id);
	  $scope.ok = function () {
		  $modalInstance.close();
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
	
};
})
.controller('CadGrupoController',function($scope,Grupo, $location){
			
		$scope.save = function(){
			
			clearErrors();
			if ($scope.grupo == null){
				printError('Verifique se os campos obrigatórios foram preenchidos!');
				$('html, body').animate({scrollTop: 0},'slow');
			}else{
			
				clearErrors();
				Grupo.findnome({idGrupo:$scope.grupo.nome},function(res){
					
					if (res.count > 0){
						printError('Grupo já existe!');
						return;
					}
					
					var grupo = new Grupo($scope.grupo);
					
					grupo.$save(function(err){
					
						if (err) console.log(err);
					
							$location.path('consGrupo');
					
					});
				});
			}
		} 
})
.controller('EditGrupoController',function($scope, Grupo, $location, $routeParams){
	
	$scope.grupo = Grupo.get({idGrupo:$routeParams.idGrupo});
	
	$scope.save = function(){
		console.log('aqui');
		$scope.grupo.$update({idGrupo : $routeParams.idGrupo}, function(){		
			$location.path('consGrupo');	
		});	
	};
	$scope.remove = function(){
		
		Grupo.del({idGrupo:$routeParams.idGrupo},function(){
			
			$location.path('consGrupo');
			
		});
		
	};
	
})
//Controllers de grupos de usuarios
.controller('ListMenuController',function($scope,Menu ,$location){
	
	$scope.menus = Menu.query();
	
})
.controller('CadMenuController',function($scope,Menu, $location){
			
		$scope.save = function(){
			
			clearErrors();
			if ($scope.menu == null){
				printError('Verifique se os campos obrigatórios foram preenchidos!');
			}else{
			
				clearErrors();
				Menu.findnome({idMenu:$scope.menu.nome},function(res){
					
					if (res.count > 0){
						printError('Menu já existe!');
						return;
					}
					
					var menu = new Menu($scope.menu);
					
					menu.$save(function(err){
					
						if (err) console.log(err);
					
							$location.path('consMenu');
					
					});
					
				});
			}
		};
	
	
})
.controller('EditMenuController',function($scope, Menu, $location, $routeParams){
	
	$scope.menu = Menu.get({idMenu:$routeParams.idMenu});
	
	$scope.save = function(){
		console.log('aqui');
		$scope.menu.$update({idMenu : $routeParams.idMenu}, function(){		
			$location.path('consMenu');	
		});	
	};
	$scope.remove = function(){
		
		Menu.del({idMenu:$routeParams.idMenu},function(){
			
			$location.path('consMenu');
			
		});
		
	};
	
})
.controller('EditPermissoesController',function($scope, Menu, Permissao,Grupo , $location,$filter , $routeParams){
	
	Grupo.get({idGrupo:$routeParams.idPerm} , function(grupo){
		permissoes = Menu.query(function(permissoes){
			permissoes.forEach(function(p, i ){	
				grupo.permissoes.forEach(function(aux,j){
					if (aux._id === p._id){
						
						permissoes[i].checked = true;
					}
					
				});
			});
			$scope.permissoes = permissoes;
		});
	});
	$scope.save = function(){
		$scope.selecionados = $filter('filter')($scope.permissoes,{checked:true});
		//$scope.permissao.$update({idGrupo : $routeParams.idPerm}, function(){		
		//	$location.path('consGrupo');	
		//});
		perm = new Permissao([$scope.selecionados]); 
		perm.$update({idPerm:$routeParams.idPerm}, function(err){
			
			if (err) console.log(err);
			$location.path('consGrupo');
			
		});
	};
})
//Controllers de grupos de usuarios
.controller('ListCidadesController',ListCidadesController)
.controller('CadCidadesController' ,CadCidadesController)
.controller('EditCidadesController',EditCidadesController)
.controller('ListEstiloController' ,ListEstiloController)
.controller('CadEstiloController'  ,CadEstiloController)
.controller('EditEstiloController' ,EditEstiloController)
.controller('ListTipoController' ,ListTipoController)
.controller('CadTipoController'  ,CadTipoController)
.controller('EditTipoController' ,EditTipoController)
.controller('ListEventoController' ,ListEventoController)
.controller('CadEventoController'  ,CadEventoController)
.controller('EditEventoController' ,EditEventoController)
.controller('GaleriaEventoController' ,GaleriaEventoController)
.controller('RemoveImageController' ,RemoveImageController)
.controller('ListBannersController' ,ListBannersController)
.controller('RemoveBannersController' ,RemoveBannersController);