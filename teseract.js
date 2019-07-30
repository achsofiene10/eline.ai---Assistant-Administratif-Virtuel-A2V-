const Tesseract = require('tesseract.js');

Tesseract.recognize('./test.jpg')
 .progress(function(packet){
     //console.info(packet)
    })
 .then(function(result){
  console.log(result.text)
 })

 