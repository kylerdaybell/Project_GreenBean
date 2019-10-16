var express = require('express');
var cors = require('cors');
var app = express();
const port = process.env.PORT || 8080;
var whitelist = "http:/144.17.24.16";


var corsOptions={
    origin:function(origin,callback){
      if(whitelist.indexOf(origin)===-1){
        callback(null,true)
      }else{
        callback(new Error('not allowed by cors'))
      }
    }
  }


app.get('/',cors(corsOptions),function(req,res){
    res.write("hello world");
    res.end();
  });

  app.listen(port,function(){
    
  });