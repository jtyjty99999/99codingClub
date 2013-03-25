var http = require("http");
var db = require('./modules/mysql');
var url = require('url');
var queryHelper = require('querystring');
    function onRequest(request, response) {
        var q= url.parse(request.url).query;
       var obj = queryHelper.parse(q)
        console.log(JSON.stringify(obj))
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end(obj.message)
        /*
        var query = new db.orm;
        query.init();
        query.exec('SELECT * FROM mirrtalkActivation', function (rows, fields) {
            var l = rows.length,i= 0,data = {'list':[]}
            for(;i<l;i++){
                data.list.push(rows[i])
            }
            res.render('index',data);
        })
        query.end()*/
    }
    var server = http.createServer(onRequest).listen(8888);