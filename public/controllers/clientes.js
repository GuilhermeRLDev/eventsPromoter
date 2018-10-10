function factoryEvento($resource){
	return $resource('/evento/:metodo/:idEvento/:idImagem', {metodo:'@metodo',idEvento:'@idEvento',idImagem:'@idImagem'}, {
              query   : { method: 'GET', params: {metodo:null,idEvento:null, idImagem:null}, isArray: true },
              del  	  : { method: 'DELETE', params:{metodo:null,idEvento:'@idEvento',idImagem:null}},
              update  : { method: 'PUT', params:{metodo:null, idEvento:'@idEvento',idImagem:null}},
              save    : { method: 'POST',headers:{enctype:'multipart/form-data'},params:{metodo:null, idEvento:null,idImagem:null}},
              get     : { method: 'GET', params:{metodo:null,idEvento:'@idEvento', idImagem:null}},
              findnome: { method: 'GET', params:{metodo:'getnome',idEvento:'@idEvento', idImagem:null}},
              addimagem:{ method: 'PUT',params:{metodo:'addimagem', idEvento:'@idEvento', idImagem:'@idImagem'}},
              removeimagem:{ method: 'PUT',params:{metodo:'removeimage', idEvento:'@idEvento', idImagem:'@idImagem'}},
              getgalery  : { method: 'GET',params:{metodo:'getgalery', idEvento:'@idEvento', idImagem:null}}
    });
}


function ListEventoController($scope, Evento, $routeParams){
	$scope.eventos = Evento.query();	
};
function EditEventoController($scope, Evento,Cidade , $location,$routeParams){
$(".ajax").colorbox({onComplete:function(){
	

	var imgly
    , image = new Image();
   
  // Load image
  image.src = document.getElementById('image').src;
  image.onload = function () {

    // Initialize imglyKit and run it
    // with the image
    imgly = new imglyKit({
      container: "#container"
    });

    try {
      imgly.run(image);
    } catch (e) {
      if(e.name == "NoSupportError") {
        alert("Your browser does not support canvas.");
      } else if(e.name == "InvalidError") {
        alert("The given file is not an image");
      }
    }

  };
	
	
},innerWidth:800, innerHeight:500});
	
$scope.cidades = Cidade.query(); 
	
	$scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  // Disable weekend selection
	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };


	
	   var evento = Evento.get({idEvento:$routeParams.idEvento},function(evento){
		   
		 $scope.initDate = new Date(evento.data);
	     $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	     $scope.format = $scope.formats[0];
			
		 var cidades  = Cidade.query(function(){
			   cidade = evento.cidade;
			   if (evento.cidade){
				   Cidade.findnome({idCidade:cidade.nome},function(){
					   var achou = false;
					   for (var i = 0; i<= cidades.length-1;i++){
						   if (cidade.nome == cidades[i].nome){
							   cidades.splice(i,1,cidade);
							   achou = true;
							   break;
						   }
					   }
					   if (!achou){
						   cidades.push(cidade);
					   }
					   $scope.cidades   = cidades;
					   $scope.evento  = evento;    
				   });
			   }else{
				   $scope.cidades   = cidades;
				   $scope.evento  = evento;  
			   }
		   });
	   });

	   $scope.save = function(){
	   $scope.evento.imgCapa = $("#srcImg").val();
	   $scope.evento.$update({idEvento:$routeParams.idEvento},function(){
		   $location.path('consEvento');
	   });

	   };
	   $scope.remove = function(){

		Evento.del({idEvento:$routeParams.idEvento},function(err){
			
			$location.path('consEvento');
			
		});
		
	   };
};
function CadEventoController($scope,Evento, Cidade,$location){
	$(".ajax").colorbox({onComplete:function(){
		

		var imgly
	    , image = new Image();
	   
	  // Load image
	  image.src = document.getElementById('image').src;
	  image.onload = function () {

	    // Initialize imglyKit and run it
	    // with the image
	    imgly = new imglyKit({
	      container: "#container"
	    });

	    try {
	      imgly.run(image);
	    } catch (e) {
	      if(e.name == "NoSupportError") {
	        alert("Your browser does not support canvas.");
	      } else if(e.name == "InvalidError") {
	        alert("The given file is not an image");
	      }
	    }

	  };
		
		
	},innerWidth:800, innerHeight:500});
	
	
	$scope.cidades = Cidade.query(); 
	
	$scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  $scope.disabled = function(date, mode) {
	    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	  };

	  $scope.toggleMin = function() {
	    $scope.minDate = $scope.minDate ? null : new Date();
	  };
	  $scope.toggleMin();

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.initDate = new Date('2016-15-20');
	  $scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	  $scope.format = $scope.formats[0];
	
	$scope.save = function(){
		console.log($scope.evento);
		$scope.evento.imgCapa = $("#srcImg").val();
		if (
			($scope.evento.titulo == null) ||
	   	   ($scope.evento.descricao == null) ||
	   	   ($scope.evento.data == null)||
	   	   ($scope.evento.local == null)||
	   	   ($scope.evento.imgCapa == null)||
	   	   ($scope.evento.cidade == null)||
	   	   ($scope.evento.rua == null)||
	   	   ($scope.evento.numero == null)
	   	   ){
			
			clearErrors();
			printError('Verifique se todos os campos obrigatórios foram preenchidos!');
			 $('html, body').animate({scrollTop: 0},'slow');
		} else {
			
			Evento.findnome({idEvento:$scope.evento.titulo}, function(res){
				clearErrors();
				if(res.count>0){
					printError('Titulo informado já está sendo utilizados por outro usuário!');
					return;
				}
				$scope.evento.data_cad = new Date();
				$scope.evento.bloq = false;
				$scope.evento.finalizado = false;
				var evento = new Evento($scope.evento);
				evento.$save(function(error, resp){
					if (!error.error){
						$location.path('consEvento');
					}else{
					
						alert(error.error);

					}	
				});	
			});

		}
	};
};


function GaleriaEventoController($scope, Evento , $location, $routeParams){
		
	$scope.idEvento = $routeParams.idEvento;

	Evento.get({idEvento:$routeParams.idEvento},function(evento){
		
		var tamanho = evento.imagens.length,
			count = 0;
			nLinhas = Math.ceil(tamanho / 3),
			linhas  = []; 
			for (var i=0; i< nLinhas; i++){	
				linhas[i] = [];
				for (var j = (i*3); ((j< ((i*3)+3)) && (j < tamanho)); j++){
					
					linhas[i].push(evento.imagens[j]);
					
				}
			}
			console.log(linhas);
			
		$scope.linhas = linhas;
		$(".ajax").colorbox({onComplete:function(){
			
			var imgly
		    , image = new Image();
		   
		  // Load image
		  image.src = "images/perfil.jpg";//document.getElementById('image').src;
		  image.onload = function () {

		    // Initialize imglyKit and run it
		    // with the image
		    imgly = new imglyKit({
		      container: "#container"
		    });

		    try {
		      imgly.run(image);
		    } catch (e) {
		      if(e.name == "NoSupportError") {
		        alert("Your browser does not support canvas.");
		      } else if(e.name == "InvalidError") {
		        alert("The given file is not an image");
		      }
		    }

		  };
			
			
		},innerWidth:800, innerHeight:500});
	});
	
};
function RemoveImageController($scope, Evento, $location, $routeParams){

	Evento.removeimagem({idEvento:$routeParams.idEvento, idImagem: $routeParams.idImagem},function(){
		
		$location.path('evento/galeriaEvento/'+$routeParams.idEvento);
		
	});
};
