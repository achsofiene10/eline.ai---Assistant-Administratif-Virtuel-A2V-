async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename:"HelloAgent-ed43f8d08320.json"
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
                "type": "FACE_DETECTION"
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
                "source":{
                  "imageUri":
                    "gs://bucket_name/path_to_image_object"
                }
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
      axios.post('https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY_HERE', body)
  .then((response) => console.log(response));

  }
  quickstart()