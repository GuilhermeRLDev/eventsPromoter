function enviar(){ 
	$.ajax({
		type:"POST",
		url:"/mailer/sent",
		data:{nome:$('#nome').val(),
			  telefone:$('#telefone').val(),
			  mail:$('#email').val(),
			  menssagem:$('#menssagem').val()},
		dataType:'JSON',
	    success:function(data){
		
			if(data.error){

				$('.error').removeClass('noactive');
				$('.success').addClass('noactive');
				
			} else{
				$('.error').addClass('noactive');
				$('.success').removeClass('noactive');
	
			}
		}
	});	
}