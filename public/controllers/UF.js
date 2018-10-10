function factoryUF(resource){
	
	return  resource('/ufs/:metodo/:idUF', {metodo:'@metodo',idUF:'@idUF'}, {
        query   : { method: 'GET', params: {metodo:null,idUF:null}, isArray: true },
        get     : { method: 'GET',params:{metodo:null,idUF:'@idUF'}}
     });
	
}
