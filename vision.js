
const axios = require('axios')
const {Storage} = require('@google-cloud/storage');


 module.exports = async function quickstart(Urlimagebase) {  
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename:"spring19Eline-f87f0f815802.json"
    });
  
    body={
        "requests": [
          {
            "features": [
              {
                "maxResults": 50,
                "type": "LANDMARK_DETECTION"
              },
              
              {
                "maxResults": 50,
                "type": "OBJECT_LOCALIZATION"
              },
              {
                "maxResults": 50,
                "type": "LOGO_DETECTION"
              },
              {
                "maxResults": 50,
                "type": "LABEL_DETECTION"
              },
              {
                "maxResults": 50,
                "type": "DOCUMENT_TEXT_DETECTION"
              },
              {
                "maxResults": 50,
                "type": "SAFE_SEARCH_DETECTION"
              },
              {
                "maxResults": 50,
                "type": "IMAGE_PROPERTIES"
              },
              {
                "maxResults": 50,
                "type": "CROP_HINTS"
              },
              {
                "maxResults": 50,
                "type": "WEB_DETECTION"
              }
            ],
            "image":{
              "content":Urlimagebase
              /*"source":{
                "imageUri":"gs://eline_bucket/modele-facture-fr-pur-750px with resize.png"*/
                  
              },
            "imageContext": {
              "cropHintsParams": {
                "aspectRatios": [
                  0.8,
                  1,
                  1.2
                ]
              }
            }
          }
        ]
      }
    return axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCBKeaJ1k7cKNlPmYrqwgOo7AqIQRmSQIk', body)
     .catch()
    //console.log(data);

  }
/*async function run(){
  var Urlimg="";
  const response= await quickstart(Urlimg);
    var data=response.data.responses[0];
    console.log(data);}

    run()*/
  

