var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');
var templates = require('./public/lib/template.js');
var qs = require('qs');

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  fs.readdir('./data', function(error, folderlist) {
    var folderlists = templates.folderList(folderlist);
    var description = templates.mainpage();
    var template = templates.BaseTemplate(folderlists, description);
    response.send(template);
  });
});

app.get('/:page', function(request, response) {
  var filteredId = path.parse(request.params.page).base;
  if(filteredId === 'writeform') {
    fs.readdir('./data', function(error, folderlist) {
      var folderlists = templates.folderList(folderlist);
      var folder = templates.folder(folderlist);
      var description = templates.Multiupload(folder);
      var template = templates.BaseTemplate(folderlists, description);
      response.send(template);
    });
  } else if(filteredId === 'CreateFolder') {
    fs.readdir('./data', function(error, folderlist) {
      var folderlists = templates.folderList(folderlist);
      var description = templates.createdfolder();
      var template = templates.BaseTemplate(folderlists, description);
      response.send(template);
    });
  } else if(filteredId === 'DeleteFolder') {
    fs.readdir('./data', function(error, folderlist) {
      var folderlists = templates.folderList(folderlist);
      var description = templates.deletedfolder();
      var template = templates.BaseTemplate(folderlists, description);
      response.send(template);
    });
  } else {
    var filteredId = path.parse(request.params.page).base;
    fs.readdir('./data', function(error, folderlist) {
      fs.readdir(`./data/${filteredId}`, function(error, filelist) {
        var folderlists = templates.folderList(folderlist); 
        var filelists = templates.BoardList(filelist, filteredId);
        var description = "" + filelists;
        var template = templates.BaseTemplate(folderlists, description);
        response.send(template);
      });
    });
  }
});

app.get('/:page/:pageId', function(request, response) {
  var filteredpage = path.parse(request.params.page).base;
  var filteredId = path.parse(request.params.pageId).base;
  fs.readdir('./data', function(error, folderlist) {
    var folderlists = templates.folderList(folderlist);
    fs.readFile(`data/${filteredpage}/${filteredId}`, 'utf8', function(error, description){
      var temptext = filteredId.split('-');
      var title = temptext[1];
      var author = temptext[2];
      var template = templates.BoardTemplate(folderlists, title, author, description);
      response.send(template);
    });
  });
});

app.get('/public/DownloadFolders/:pageId', function(request, response) {
  var filename = path.parse(request.params.pageId).base;
  filepath = __dirname + "/public/DownloadFolders/" + filename;
  response.download(filepath);
});

app.post('/created_folder_process', function(request, response) {
  var body = '';
  request.on('data', function(data) {
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var foldername = post.foldername;
    fs.mkdir(`./data/${foldername}`,function(err) {
      response.writeHead(302, {Location: `/`});
      response.end();
    });
  });
});

app.post('/deleted_folder_process', function(request, response) {
  var body = '';
  request.on('data', function(data) {
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var foldername = post.foldername;
    fs.rmdir(`./data/${foldername}`,function(err) {
      response.writeHead(302, {Location: `/`});
      response.end();
    });
  });
});

app.post('/upload_process', function(request, response) {
  var form = new formidable.IncomingForm();
  form.on('fileBegin', function(name, file){
    if(file.name === '') {
      return;
    }
    else {
      file.path = __dirname + '/public/DownloadFolders/' + file.name;
    }
  });

  form.on('file', function(name, file){
    console.log('Uploaded ' + file.name);
  });

  form.on('error', function(error) {
    console.log('[error] error : ' + error);
  });

  form.parse(request, function(error, fields, file) {
    var title = fields.title;
    var author = fields.author;
    var board = fields.board;
    var description = fields.description;
    var filename = file.upload_Files.name;

    var description = `<div clsaa="file"><p>첨부파일 : <a href="/public/DownloadFolders/${filename}">${filename}</a></p></div>` + description.toString().replace(/\n/gi,"<br><br>");
    // class="addfile"
    fs.readdir(`./data/${board}`, function(error, filecount) {
      var count = filecount.length;
      count = count + 1;
      fs.writeFile(`data/${board}/${count}-${title}-${author}`, description, 'utf8', function(error) {
        response.writeHead(302, {Location: `/`});
        response.end();
      });
    });
  });
});

app.post('/delete_process', function(request, response) {
  var body = '';
  request.on('data', function(data) {
    body = body + data;
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var path = post.path;
    var filename = post.filename;
    console.log(path, filename);
    fs.unlink(`data/${path}/${filename}`, function(error) {
      response.writeHead(302, {Location: `/`});
      response.end();
    });
  });
});



  //   var post = qs.parse(body);
  //   var foldername = post.foldername;
  //   fs.mkdir(`./data/${foldername}`,function(err) {
  //     response.writeHead(302, {Location: `/`});
  //     response.end();
  //   });
  // });


  // var body = '';
  // request.on('data', function(data){
  //     body = body + data;
  // });
  // request.on('end', function(){
  //   var post = qs.parse(body);
  //   var id = post.id;
  //   var filteredId = path.parse(id).base;
  //   fs.unlink(`data/${filteredId}`, function(error) {
  //     response.writeHead(302, {Location: `/`});
  //     response.end();
  //   });
  // });
// });






app.listen(2000, function() {
  console.log('Example app listening on port 2000!');
});

