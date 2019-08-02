/*const image2base64 = require('image-to-base64');


module.exports=async function encode(Bucketname,file){
return image2base64(`https://storage.cloud.google.com/${Bucketname}/${file}`) // you can also to use url
    .catch()
}*/

var fs = require('fs');

module.exports =async function encode(file) {
var imageFile = fs.readFileSync('./images/'+file);
// Convert the image data to a Buffer and base64 encode it.
return Buffer.from(imageFile).toString('base64');}

