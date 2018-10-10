function factoryBanner(resource){
	
	return  resource('/banners/:idTipo', {idTipo:'@idTipo'}, {
        query   : { method: 'GET', params: {idTipo:'listar'}, isArray: true }
     });
	
}


function ListBannersController($scope,Banner ,$location){
	
	$scope.banners = Banner.query();
	
}


