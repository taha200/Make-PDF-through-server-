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
var pdfMake = require('pdfmake/build/pdfmake.js');
const hellosign = require('hellosign-sdk')({ key: '5b4f93885dac8ee68af85968b7b02c313b5b797173df5e27eec06d86eea2776f' });
app.use(bodyParser.json())
app.use(upload())

// create an express route for the home page
// http://localhost:8080/
app.get('/', function(req, res) {
res.sendFile('index.html',{root:path.join(__dirname)});
});
app.post('/users', function(req, res) {
    let doc= new PDF();
    let x =0;
    let y=0;
 // var dd;
 if(req.files){
    
    var file=req.files.filestoup

    if (file.length !== 0) {
        doc.pipe(fs.createWriteStream(`pdfs/${req.body.bioFileName}.pdf`))
        doc.image('./images/bang.jpg',156,30,{width:300,height:200,align:'center',valign:'center'})
        doc.addPage()
        file.forEach(function (fila, index) {
            var filename = fila.name
            fila.mv('./images/' + filename, function (err) {
                
                if (err) {
                    res.send('error')
                } else {
                    //      doc.image('images/'+filename,x,y, {fit: [100, 100]})
                    //    .rect(320, 15, 100, 100)
                    //    .stroke()
                    //    .text('Fit', 320, 0)

                        doc.image('./images/' + fila.name,0,0,{width:612,height:792})
                         doc.addPage()
                        if (index === file.length-1) {
                            doc.end()
                            res.send("DONE")
                        }
                }
            })
        })

    }
// hellosign.account.get().then((resp) => {
//    // console.log(resp)
//   }).catch((err) => {
//     // handle error
//   });
// //}
// const opts = {
//     test_mode: 1,
//     title: 'NDA with Acme Co.',
//     subject: 'The NDA we talked about',
//     message: 'Please sign this NDA and then we can discuss more.',
//     signers: [
//       {
//         email_address: 'tbabin015@gmail.com',
//         name: 'Me'
//       }
//     ],
//     files: ['./pdfs/vcvv.pdf']
//   };
  
//   hellosign.signatureRequest.send(opts).then((resp) => {
//     console.log(resp)
//   }).catch((err) => {
//     // handle error
//   });
}
})
//start the server on port 8080
app.listen(8080)
// send a message
console.log('Server has started!');
