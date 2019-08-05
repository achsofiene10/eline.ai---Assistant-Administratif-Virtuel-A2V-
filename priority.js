const fs = require('fs')
var _=require("underscore")

var obj = fs.readFileSync('./Wordspriority.json', 'utf8');
Words=JSON.parse(obj)
var max_key = _.invert(Words.priority)[_.max(Words.priority)];
delete Words.priority[max_key]
while(!(_.isEmpty(Words.priority))){
    max_key = _.invert(Words.priority)[_.max(Words.priority)];
    if (text.toUpperCase().indexOf(max_key)!=-1){
        console.log(max_key+" FOUNDED");
        price=DetectTotal(data,max_key);
        break;
    }
    else {
        delete Words.priority[max_key]
    }
}
if (_.isEmpty(Words.priority)){
    price=DetectMax(data);
}



