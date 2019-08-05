'use strict';

const builder = require('botbuilder');
const restify = require('restify');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
var Jimp = require("jimp")
var storageupload=require ('./gcsupload');
var InvoiceScan=require ('./regex')
        
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


var bot = new builder.UniversalBot(connector, async function (session) {
    var msg = session.message;
    var reply;
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];
     session.send("Traitement en cours....")
     const imageUrl=await storageupload(attachment.contentUrl,attachment.name).catch((err)=> console.log(err.message));
     //console.log(imageUrl)
     reply= await InvoiceScan(imageUrl).catch((err)=> session.send("Veuillez fournir une image valide"))
     session.send(reply);
    } 
    else {
        async function runSample(projectId = 'elineagent-xxymjs') {
          // A unique identifier for the given session
          const sessionId = uuid.v4();
          
          // Create a new session
          const sessionClient = new dialogflow.SessionsClient({
              keyFilename:"ElineAgent-05ea25bb920f.json"
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


 

