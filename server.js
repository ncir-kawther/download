var express=require('express');
var app=express();
var file_system = require('fs');
//var fs = require('fs');
var archiver = require('archiver');
//var unzip = require('unzip');
app.use(express.static(__dirname+"/public"));

app.get('/download',function(req,response,next){
  console.log(req.query.name);
  console.log(req.query.projectpath);
    var output = file_system.createWriteStream(__dirname+'/public/target.zip');
  //var output = file_system.createWriteStream('//TALANPFE-157/WorkspaceTibco/download/public/target.zip');
  var archive = archiver('zip');
  //fs.createReadStream(__dirname+'/public/target.zip').pipe(unzip.Extract({ path: __dirname+'/public/target'}));
  output.on('close', function (req,res,next) {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
      response.json({url:'http://localhost:3000/target.zip'});
  });
  archive.on('error', function(err){
      throw err;
  });
  archive.pipe(output);
//  const source=req.param('name'); // path te3 projet
  const source=req.query.projectpath;
  console.log(req.query.projectpath);
  //console.log(source);
  archive.directory(source,'/').finalize();
});
app.get("/hello",function(req,res,next){
    res.json({content:"ok"});
})
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.listen(3000);
