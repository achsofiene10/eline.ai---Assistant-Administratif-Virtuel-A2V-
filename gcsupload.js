const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
var Jimp = require("jimp")
var encode=require ('./encode')


module.exports= async function uploadfile(Urlfile,file) {
  var encoded;
// Creates a client
const storage = new Storage({
  projectId: 'spring19eline',
  keyFilename: 'spring19Eline-cc0bfa3b53c0.json'
});
let filename=await sizeimg(Urlfile,file).catch((err) => console.log('error resize',err.message));        //   resize picture
Bucketname="eline_bucket";
console.log("upload start");

  storage.bucket(Bucketname).upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  }).catch((err)=> console.log("error upload",err.message));
 
  console.log(`${file} uploaded to ${Bucketname}.`);
  /*console.log("public set start")    // if you want to make file public you have to wait for a promise from upload for 3 sec
  await storage
  .bucket(Bucketname)
  .file(file)
  .makePublic().catch((err) => console.log('error set public ',err.message));
  console.log(" file is public")*/
  encoded= await encode(file).catch((err) => console.log('error encode base64',err.message));
  return encoded; //encode file from the storage or path images/
}
 function sizeimg(inputFile,output) {
  Jimp.read(inputFile, function(err,img){
      img.resize(1024,768	).write("./images/"+output);
      });
      console.log("resize complete")
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("./images/"+output);
        }, 5000);
      });
      
}