/* função responsável por imprimir menssagens de erros nas telas de cadastro
 * Sempre deve ser chamada após o jQuery ser declarado
 * Por default  as menssagens de erro serao adicionadas em uma div chamada 'msg-error'
 * 
 */
function printError(msg){
	
	var sIdDiv =  'msg-error';
	var sDiv   =  '<div class="alert alert-dismissable alert-danger" >';
		sDiv   += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
		sDiv   += msg;
		sDiv   += '</div>';
			
	$("#msg-error").append(sDiv);
		
		
}

function clearErrors(){
	
	$("#msg-error").html("");
	
}
function onFileSelect(files,preview){
	console.log('aqui');
	var imageType = /image.*/,
		file      = document.getElementById(files).files[0];
	if (file.type.match(imageType)){
	    console.log('aqui2');
		reader = new FileReader();
		reader.onload = function(e){
		
			var img = new Image();
			img.src = reader.result;
			img.heigth = 300;
			img.width  = 200;
			img.id="image";
			$("#"+preview).html("");
			$("#"+preview).append(img);
			var data = new FormData();
			jQuery.each($('#fileupload')[0].files, function(i, file) {
			    data.append('file'+i, file);
			});
			$.ajax({
			    url: '/home/upload',
			    data: data,
			    cache: false,
			    contentType: false,
			    processData: false,
			    type: 'POST',
			    success: function(data){
			        $("#srcImg").attr("ng-value",data.path);
			        $("#srcImg").val(data.path);
			    }
			});
		};	
		reader.readAsDataURL(file); 
	}else{	
		clearErrors();
		printError('Arquivo não suportando');
	
	}
}

function uploadGaleria(){
	var imageType = /image.*/,
	files      = document.getElementById('fileupload').files,
	url = window.location,
	id  = url.toString().split('/')[6];

	for (var i = 0;i< files.length;i++){	
		var file = document.getElementById('fileupload').files[i];  
		if (file.type.match(imageType)){
			var data = new FormData();
			data.append('file0', file);
			$.ajax({
				url: '/evento/addimage/'+id,
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'PUT',
				async:false,
				success: function(data){
		        	console.log("Successo no upload da imagem!");
		    	}
			});	
		}else{	
			clearErrors();
			printError('Arquivo não suportando!');
		}
	}
	setTimeout(
			function(){
				window.location.reload();
			},1250
	);
		
	
}

function uploadBanners(){
	var imageType = /image.*/,
	files      = document.getElementById('fileupload').files,
	url = window.location;

	for (var i = 0;i< files.length;i++){	
		var file = document.getElementById('fileupload').files[i];  
		if (file.type.match(imageType)){
			var data = new FormData();
			data.append('file0', file);
			$.ajax({
				url: '/banner/addImagem',
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				async:false,
				success: function(data){
		        	console.log("Successo no upload da imagem!");
		    	}
			});	
		}else{	
			clearErrors();
			printError('Arquivo não suportando!');
		}
	}
	setTimeout(
		function(){
			window.location.reload();
		},1250
	);
	
	
}
//Remove imagens da galeria de imagens do evento
//Feito em jQuery para diminuir processamento e redirecionamentos .
function remover(){
	
	alert(id);
	console.log(id);
	
}


//  Cidade ---> Id da input de cidade
//  uf     ---> Id da input de uf
//  rua    ---> id da input de rua
//  bairro ---> id da input de cidade
function getForCep(cidade, uf , rua, bairro){
		
}

function formatData(data){
	
	var data = data.toString().slice(0,10);
	
	data = data.split('-');
		
	var newData = data[2]+"/"+data[1]+"/"+data[0];
	
	return newData;
	
}

