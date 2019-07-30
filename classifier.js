const fs = require('fs')

var data;
var score=[0,0,0,0,0,0]
module.exports = function classifier (data){
    fs.readFile('./classInvoices.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        classInv = JSON.parse(jsonString);
        var ch=data.fullTextAnnotation.text;
    /*var matches = ch.match(/[a-zA-Z]+/g);
    console.log(matches);*/
    for (i=0;i<classInv.topics.length;i++){
        for(j=0;j<classInv.topics[i].length;j++){
            if (ch.toLowerCase().indexOf((topics[i])[j])!=-1){
                score[i]++;
            }
        }
    }
    console.log(classInv.names[score.indexOf(Math.max(...score))]);
    return classInv.names[score.indexOf(Math.max(...score))]
    });
}

