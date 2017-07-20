var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');

var audio = require('./rotas/testeAudio.js');

app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({limit: '5mb'}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/api/audio', function (req, res) {
   audio(req.body.audio);
   res.send('');

   // do stuff with file
});

// require('./rotas/speech.js')(teste);

module.exports = app;
