function factoryBanner(resource){
	
	return  resource('/banners/:idTipo', {idTipo:'@idTipo'}, {
        query   : { method: 'GET', params: {idTipo:'listar'}, isArray: true },
        del  	: { method: 'DELETE',params:{idTipo:'@idTipo'}},
        addImagem  : { method: 'POST',params:{idTipo:'addImagem'}}
     });
	
}


function ListBannersController($scope,Banner ,$location){
	
	$scope.banners = Banner.query();
	
}

function RemoveBannersController($scope,Banner ,$location,$routeParams){
	
	Banner.del({idTipo:$routeParams.idTipo},function(){
		
		$location.path('/banners/listar');
		
	});
	
}