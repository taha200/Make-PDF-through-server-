var express = require('express');
var path = require('path')
var formidable = require('formidable')
// create an express app
var app = express();
var bodyParser= require('body-parser')
var upload= require('express-fileupload')
var fs = require('fs')
var PDF= require('pdfkit')
var blobStream=require('blob-stream')
var maker =require('./pdfs/modules/pdf')
var port = process.env.PORT
app.use(bodyParser.json())
app.use(upload())
// create an express route for the home page
// http://localhost:8080/
app.get('/', function(req, res) {
res.sendFile('index.html',{root:path.join(__dirname)});
});
app.post('/users', function(req, res) {
   var filenam=req.body.bioFileName
if(req.files){
    
    var file=req.files.filestoup
    console.log(file)
//    var filename=file.name
//    file.mv('./images/'+filename,function(err){
//        if(err){
//            console.log('error')
//        }
//        else
//            {
//             doc.image('./images/'+filename, 320, 15, {fit: [100, 100]})
//             .rect(320, 15, 100, 100)
//             .stroke()
//             .text('Fit', 320, 0)
//              doc.end()
//            }
//        })
    
   
    if(file.length!==0){
 file.forEach(function(fila){
     var filename=fila.name
     fila.mv('./images/'+filename,function(err){
if(err){
    res.send('error')
}
else{
//      doc.image('images/'+filename,x,y, {fit: [100, 100]})
//    .rect(320, 15, 100, 100)
//    .stroke()
//    .text('Fit', 320, 0)
while(file.length>0){
  maker.makePDF(fila,filenam)
}
     }
     })
 })

}
}

    });
//start the server on port 8080
app.listen(8080)
// send a message
console.log('Server has started!');
