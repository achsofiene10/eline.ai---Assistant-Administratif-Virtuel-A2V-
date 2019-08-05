const fs = require('fs')

var data;
var nameclass;
var score=[0,0,0,0,0,0]
module.exports = function classifier (data){
    var obj = fs.readFileSync('./classInvoices.json', 'utf8');
    classInv=JSON.parse(obj)
    //console.log(classInv)
    var ch=data.fullTextAnnotation.text;
    for (i=0;i<classInv.topics.length;i++){
        for(j=0;j<classInv.topics[i].length;j++){
            if (ch.toLowerCase().indexOf((topics[i])[j])!=-1){
                score[i]++;
            }
        }
    }
    console.log(classInv.names[score.indexOf(Math.max(...score))]);
    nameclass=classInv.names[score.indexOf(Math.max(...score))]
    return nameclass
}

