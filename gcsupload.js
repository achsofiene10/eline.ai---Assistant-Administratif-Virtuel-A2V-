const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
var Jimp = require("jimp")
var encode=require ('./encode')

module.exports= async function uploadfile(Urlfile,file) {

// Creates a client
const storage = new Storage({
  projectId: 'spring19eline',
  keyFilename: 'spring19Eline-f87f0f815802.json'
});
const filename=await sizeimg(Urlfile,file)
Bucketname="eline_bucket";
storage.bucket(Bucketname).upload(filename, {
  // Support for HTTP requests made with `Accept-Encoding: gzip`
  gzip: true,
  // By setting the option `destination`, you can change the name of the
  // object you are uploading to a bucket.
  metadata: {
    cacheControl: 'public, max-age=31536000',
  },
});

console.log(`${file} uploaded to ${Bucketname}.`);
/*setTimeout( async function () {
  await storage
  .bucket(Bucketname)
  .file(file)
  .makePublic().catch();}
  , 10000);
  console.log(" file is public")*/
  const encoded= await encode(file);  //encode file from the storage or path images/
  //console.log(encoded)
  return encoded;
}
function sizeimg(inputFile,output) {
  Jimp.read(inputFile, function(err,img){
      if (err) throw err;
      img.resize(842,595).write("./images/"+output);
      });
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("./images/"+output);
        }, 3000);
      });
}