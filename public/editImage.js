/**
 * imglyKit
 * integration example using XHR image loading
 *
 * Copyright (c) 2013 img.ly
 */

$(function () {
  var imgly
    , image = new Image()
   
  // Load image
  image.src = "images/perfil.jpg";
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

  
});
