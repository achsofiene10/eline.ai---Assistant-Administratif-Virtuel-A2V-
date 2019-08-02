const fs = require('fs')
var chrono = require('chrono-node');
var confidence;
var data;
var regex = /[+-]?\d+(\.\d\d)/g;
var classifier=require('./classifier')
var vision=require ('./vision')
var price;

module.exports = async function Searchtotal(Urlimg){
    //console.log(Urlimg)
    const response= await vision(Urlimg);
    data=response.data.responses[0];
    console.log(data)
    var text=data.fullTextAnnotation.text;
    text = text.replace(/,/g, ".");
    if (text.toUpperCase().indexOf("NET À PAYER")!=-1){
        console.log("NET À PAYER FOUNDED");
        price=DetectTotal(data,"PAYER");} 
    else if (text.toUpperCase().indexOf("NAP")!=-1) {
        console.log("NAP FOUNDED");
        price=DetectTotal(data,"NAP");}
    else if (text.toUpperCase().indexOf("TOTAL")!=-1){
        console.log("TOTAL FOUNDED");
        price=DetectTotal(data,"TOTAL");}
    else if (text.toUpperCase().indexOf("TOT")!=-1){
        console.log("TOT FOUNDED");
        price=DetectTotal(data,"TOT");}
    else {price=DetectMax(data);}
        
    console.log(confidence);
    var texte=data.fullTextAnnotation.text.replace(/\n/g, " ");
    var results = chrono.parse(texte);
    console.log('date =',results[0].text); 
    var typefact=classifier(data)
    return ('date = '+results[0].text+'\n prix='+price+'\n classe='+typefact +"\n confidence level="+confidence)
}
function DetectTotal(file,word){
    var location=[]
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
            for (var i=starty2-10;i<starty2+10;i++){
            //console.log(i) // array of Y +-
            location.push(i)}}}
    var assembledstrings="";
    for (var key=1;key<file.textAnnotations.length;key++) {
        for (var i=0;i<location.length;i++){
        if (file.textAnnotations[key].boundingPoly.vertices[3].y==location[i]) {
           // console.log(data.textAnnotations[key].description)
            assembledstrings=assembledstrings.concat(file.textAnnotations[key].description)
        }}}
    console.log("assembledstring=",assembledstrings)
    assembledstrings=assembledstrings.replace(/,/g,".")
    floatsA = assembledstrings.match(regex);
    if (floatsA==null){return null}// if there is no total with word searched
    else {
    floatsA.map(function(v) { return parseFloat(v); });
    console.log(floatsA);
    console.log(Math.max(...floatsA));
    if(DetectMax(data)==Math.max(...floatsA)){confidence=0.9;}
    else{confidence=0.8;}
    return (Math.max(...floatsA))
    
}}

function DetectMax(file){
    var ch=file.fullTextAnnotation.text;
    ch=ch.replace(/,/g,".")
    //console.log(ch)
    floatsB = ch.match(regex).map(function(v) { return parseFloat(v); });
    if (floatsB==null){return null}else{
    confidence=0.6;
    console.log(floatsB);
    console.log(Math.max(...floatsB));
    return (Math.max(...floatsB))}
}



