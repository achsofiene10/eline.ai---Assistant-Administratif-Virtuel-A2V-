const fs = require('fs')
var chrono = require('chrono-node');
var data;
var assembledstrings="";
var location=[]
var confidence;
var regex = /[+-]?\d+(\.\d\d)/g;
var classifier=require('./classifier')

/*module.exports =*/ function Searchtotal(){
fs.readFile('./result2.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    data = JSON.parse(jsonString);
    var text=data.fullTextAnnotation.text;
    text = text.replace(/,/g, ".");
    if (text.toUpperCase().indexOf("NET À PAYER")!=-1){
        console.log("NET À PAYER FOUNDED");
        DetectTotal(data,"PAYER");} 
    else if (text.toUpperCase().indexOf("NAP")!=-1) {
        console.log("NAP FOUNDED");
        DetectTotal(data,"NAP");}
    else if (text.toUpperCase().indexOf("TOTAL")!=-1){
        console.log("TOTAL FOUNDED");
        DetectTotal(data,"TOTAL");}
    else if (text.toUpperCase().indexOf("TOT")!=-1){
        console.log("TOT FOUNDED");
        DetectTotal(data,"TOT");}
    else {DetectMax(data);}
        
    console.log(confidence);
    var texte=data.fullTextAnnotation.text.replace(/\n/g, " ");
    var results = chrono.parse(texte);
    console.log('date =',results[0].text); 
    classifier(data);
})}
function DetectTotal(file,word){
    for (var key=0;key<file.textAnnotations.length;key++) { // find all Y of words=total
        if ((file.textAnnotations[key].description).toUpperCase()==word) {
            //console.log(file.textAnnotations[key].boundingPoly.vertices[3].y)
            var starty2,starty1;
            if (file.textAnnotations[key].boundingPoly.vertices[3].y>file.textAnnotations[key].boundingPoly.vertices[2].y)
            { starty2=file.textAnnotations[key].boundingPoly.vertices[3].y;}
            else {starty2=file.textAnnotations[key].boundingPoly.vertices[2].y}
            /*if (data.textAnnotations[key].boundingPoly.vertices[0].y<data.textAnnotations[key].boundingPoly.vertices[1].y)
            { starty1=data.textAnnotations[key].boundingPoly.vertices[0].y;}
            else {starty1=data.textAnnotations[key].boundingPoly.vertices[1].y}*/
            for (var i=starty2-5;i<starty2+10;i++){
            //console.log(i) // array of Y +-
            location.push(i)}}}
    for (var key=1;key<file.textAnnotations.length;key++) {
        for (var i=0;i<location.length;i++){
        if (file.textAnnotations[key].boundingPoly.vertices[3].y==location[i]) {
           // console.log(data.textAnnotations[key].description)
            assembledstrings=assembledstrings.concat(file.textAnnotations[key].description)
        }}}
    console.log("assembledstring=",assembledstrings)
    assembledstrings=assembledstrings.replace(/,/g,".")
    floats = assembledstrings.match(regex);
    if (floats==null){return null}// if there is no total with word searched
    else {
    floats.map(function(v) { return parseFloat(v); });
    console.log(floats);
    console.log(Math.max(...floats));
    if(DetectMax(data)==Math.max(...floats)){confidence=0.9;}
    else{confidence=0.8;}
    return (Math.max(...floats))
    
}}

function DetectMax(file){
    var ch=file.fullTextAnnotation.text;
    ch=ch.replace(/,/g,".")
    //console.log(ch)
    var floats = ch.match(regex).map(function(v) { return parseFloat(v); });
    if (floats==null){return null}else{
    confidence=0.6;
    console.log(floats);
    console.log(Math.max(...floats));
    return (Math.max(...floats))}
}
Searchtotal()



