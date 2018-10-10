module.exports = function(app){
	
	var mailerController = {
			
			enviar: function(req, res){
		
				  var nodemailer = require("nodemailer");
				  
				  var smtpTransport = nodemailer.createTransport("SMTP",{
					    service: "Gmail",
					    auth: {
					        user: "guilhermerossettilima@gmail.com",
					        pass: "159753123@g18"
					    }
					});
				  var mailOptions = {
						    from: req.body.mail+"✔ <"+req.body.email+">", // sender address
						    to: "guilhermerossettilima@gmail.com, inbalada@gmail.com", // list of receivers
						    subject: "Contact ✔", // Subject line
						    text: "Nome: "+req.body.nome+" Email:"+req.body.mail+" Telefone:"+ req.body.telefone+" Menssagem:"+req.body.menssagem+"✔", // plaintext body
						    html: "<b>Nome: "+req.body.nome+" <br>Email: "+req.body.mail+"<br> Telefone: "+ req.body.telefone+"<br> Menssagem:"+req.body.menssagem+"✔</b>" // html body
				 }
				 
				 smtpTransport.sendMail(mailOptions, function(error, response){
					    if(error){
					        console.log(error);
					        res.json({error:true});
					    }else{
					        console.log("Message sent: " + response.message);
					        res.json({error:false});
					    }
					    // if you don't want to use this transport object anymore, uncomment following line
					    //smtpTransport.close(); // shut down the connection pool, no more messages
				});

			
			} 
	};	
	
	return mailerController;
};