
var app = angular.module('app',['ngRoute','ngResource'])
.factory('Evento',function($resource){
	
	return $resource('/site/eventos/:idGaleria', {idGaleria:"@idGaleria"}, {
        "query"   : { method: 'GET',params:{idGaleria:null},  isArray: true },
        "all"     : { method: 'GET',params:{idGaleria:'all'},  isArray: true },
        "get"     : { method: 'GET',params:{idGaleria:"@idGaleria"} }
	});
})
.factory('Agenda',function($resource){
	
	return $resource('/site/agenda', {
        "query"   : { method: 'GET', isArray: true }
	});
})
.factory('Banner',function($resource){
	
	return factoryBanner($resource);

})
.config(function($routeProvider){
	
$routeProvider
	.when("/",{
		controller:'HomeCtrl',
		templateUrl:'site/views/home.html'	
	})
	.when("/galeria/:idEvento",{
		controller:'GaleriaCtrl',
		templateUrl:'site/views/galeria.html'	
	})
	.when("/eventos",{
		controller:'EventosCtrl',
		templateUrl:'site/views/eventos.html'	
	})
	.when("/contatos",{
		controller:'ContatosCtrl',
		templateUrl:'site/views/contatos.html'	
	})
	.when("/agenda",{
		controller:'AgendaCtrl',
		templateUrl:'site/views/agenda.html'	
	})
	.when("/perfilEvento/:idEvento",{
		controller:'PerfilEventoCtrl',
		templateUrl:'site/views/perfilEvento.html'	
	});
})
.controller('HomeCtrl', function( $scope, Evento ,Agenda ,Banner, $routeParams ){
	$scope.eventos = Evento.query( function(eventos){
		
		eventos.forEach(function(evn, i){
			
			eventos[i].data = formatData(evn.data);
			
		});
		
		
		$scope.eventos = eventos;
	    $('.carousel').carousel({
	        interval: 7000
	        });
	});
	
    Banner.query(function(banners){
    	
    	$scope.bannerp = banners[0];
    	
    	banners.splice(0,1);
    	$scope.banners = banners;
    	
    }); 
	
	Agenda.query(function(agenda){
		agenda.forEach(function(a, i){
			
			agenda[i].data = formatData(a.data); 
			
		});
		$scope.agenda = agenda;
	});
})
.controller('GaleriaCtrl', function($scope, Evento, $routeParams){
	
	var i = 0; 
	
	$scope.voltar = function(){
		
		window.history.back();
		
	};
	
	$scope.evento = Evento.get({idGaleria:$routeParams.idEvento}, function(evento){
		$scope.evento = evento;
		$scope.imagens = evento.imagens;
	});
	$scope.abrirPopup = function(index){
		
		 i = index; 
		
		 $(".ajax").colorbox({onComplete:function(){
			 
			 var imgly
			    , image = new Image();
			   
			  // Load image
			  image.src = "uploads/"+$scope.evento.imagens[i].imgSrc;//document.getElementById('image').src;
			  image.onload = function() {

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
			  
			  $("#cboxNext").click(function(){
				  
					 var imgly
					    , image = new Image();
					   
					 if (i < ($scope.evento.imagens.length - 1)) i++; 
					 
					$('#container').html('');
					 
					  // Load image
					  image.src = "uploads/"+$scope.evento.imagens[i].imgSrc;//document.getElementById('image').src;
					  image.onload = function() {

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
				  
			  });
			  $("#cboxPrevious").click(function(){
				  	
					 var imgly
					    , image = new Image();
					   
					 if (i>0) i--; 
					 
					 $('#container').html('');
					 
					  // Load image
					  image.src = "uploads/"+$scope.evento.imagens[i].imgSrc;//document.getElementById('image').src;
					  image.onload = function() {

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
				  
			  });
			 
		 }}); 	
	};
})
.controller('EventosCtrl', function($scope, Evento,Agenda, $routeParams){
	$scope.eventos = Evento.all( function(eventos){
		
		eventos.forEach(function(evn, i){
			
			eventos[i].data = formatData(evn.data);
			
		});
		
		$scope.eventos = eventos;
		
	});
})
.controller('ContatosCtrl', function($scope, $routeParams){
	
})
.controller('PerfilEventoCtrl', function($scope, Evento, $routeParams){
		Evento.get({idGaleria:$routeParams.idEvento},function(evento){
			
			evento.data = formatData(evento.data);
			var myLatlng = new google.maps.LatLng(evento.latitude,evento.longitude);
 
			var mapOptions = {
				    zoom: 14,
				    center: myLatlng
				  };
				  var map = new google.maps.Map(document.getElementById('map'),
				                                mapOptions);
				  var contentString = '<div id="content">'+
			      '<div id="siteNotice">'+
			      '</div>'+
			      '<div id="bodyContent">'+
			      '<p><b>Local:</b>'+evento.local+''+
			      '<br><b>Rua:</b>,'+evento.rua+'<br><b>Bairro:</b>'+ evento.bairro+
			      '<br><b>Cidade:</b>'+evento.cidade.nome+'/'+evento.cidade.uf.sigla+'</p>'+
			      '</div>'+
			      '</div>';

			  var infowindow = new google.maps.InfoWindow({
			      content: contentString
			  });

			  var marker = new google.maps.Marker({
			      position: myLatlng,
			      map: map,
			      title: 'Endereço:'
			  });
			  google.maps.event.addListener(marker, 'click', function() {
			    infowindow.open(map,marker);
			  });
			  
			$scope.map = map;	
			$scope.evento = evento;
			
		 
		});
		$(".group1").colorbox({rel:'group1'});
})
.controller('AgendaCtrl', function($scope,Agenda , $routeParams){
	Agenda.query(function(agenda){
		agenda.forEach(function(a, i){
			
			agenda[i].data = formatData(a.data); 
			
		});
		$scope.agenda = agenda;
	});
});

