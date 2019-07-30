'use strict';

const builder = require('botbuilder');
const restify = require('restify');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
var Jimp = require("jimp")
        
        /**
         * Send a query to the dialogflow agent, and return the query result.
         * @param {string} projectId The project to be used
         */


// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log(`${server.name} listening to ${server.url}`);
});

// Listen for messages from users
server.post('/api/messages', connector.listen());



var bot = new builder.UniversalBot(connector, function (session) {
    var msg = session.message;
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];
     sizeimg(attachment.contentUrl,"output.jpg");
    } 
    else {
        async function runSample(projectId = 'helloagent-ijihmo') {
          // A unique identifier for the given session
          const sessionId = uuid.v4();
        
          // Create a new session
          const sessionClient = new dialogflow.SessionsClient({
              keyFilename:"HelloAgent-ed43f8d08320.json"
          });
          const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        
          // The text query request.
          const request = {
            session: sessionPath,
            queryInput: {
              text: {
                // The query to send to the dialogflow agent
                text: session.message.text,
                // The language used by the client (en-US)
                languageCode: 'en-US',
              },
            },
          };
        
          // Send request and log result
          const responses = await sessionClient.detectIntent(request);
          const result = responses[0].queryResult;
          //console.log(`  Response: ${result.fulfillmentText}`);
          session.sendTyping() 
        // Echo back users text
            setTimeout(function () {
                session.send(result.fulfillmentText);
            }, 3000);
        }
        runSample()
        
    }
});


function sizeimg(inputFile, outputFile) {
    Jimp.read(inputFile, function(err,img){
        if (err) throw err;
        img.resize(842,595).write(outputFile);
        });
}

