var express = require('express');
var path = require('path')
var formidable = require('formidable')
// create an express app
var app = express();
var bodyParser= require('body-parser')
var upload= require('express-fileupload')
var fs = require('fs')
var PDF= require('pdfkit')
var port = process.env.PORT
app.use(bodyParser.json())
app.use(upload())
// create an express route for the home page
// http://localhost:8080/
app.get('/', function(req, res) {
res.sendFile('index.html',{root:path.join(__dirname)});
});
app.post('/users', function(req, res) {
    let doc = new PDF();
    doc.pipe(fs.createWriteStream(`pdfs/${req.body.bioFileName}.pdf`))
if(req.files){
    var file=req.files.filestoup
    console.log(file)
 file.forEach(function(fila){
     var filename=fila.name
     fila.mv('./images/'+filename,function(err){
if(err){
    res.send('error')
}
else{
    doc.image('./images/'+filename, {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
     })
     console.log('PDF created')
}
     })
 })
}
doc.end()
    });
// start the server on port 8080
app.listen(99)
// send a message
console.log('Server has started!');
