const GoogleCloudStorage = require('@google-cloud/storage');
  
  const GOOGLE_CLOUD_PROJECT_ID = 'gcs-demo-123456'; // Replace with your project ID
  const GOOGLE_CLOUD_KEYFILE = 'path-to-the-private-key'; // Replace with the path to the downloaded private key
  
  const storage = GoogleCloudStorage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
  });

  var BUCKET_NAME = 'my-bucket'
var myBucket = storage.bucket(BUCKET_NAME)


/*var file = myBucket.file('myImage.png')
file.existsAsync()                              // check if a file exists in bucket
  .then(exists => {
    if (exists) {
      // file exists in bucket
    }
  })
  .catch(err => {
     return err
  })*/
    
    
// upload file to bucket

let localFileLocation = './public/images/zebra.gif'
myBucket.uploadAsync(localFileLocation, { public: true })
  .then(file => {
    // file saved
  })
    
// get public url for file
var getPublicThumbnailUrlForItem = file_name => {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${file_name}`
}