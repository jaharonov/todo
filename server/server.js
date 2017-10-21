var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5025;
var toDoRouter = require('./routers/todo_routes.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));
app.use('/todo', toDoRouter);
app.listen(port, function (){
    console.log('listening on port', port);
});

