var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var contactPoint = '10.0.0.2';

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// app.get('/api/tables', function(req, res) {
//     newclient.execute('SELECT * FROM USERS;', function(err, result) {
//         if (err) {
//             res.status(404).send({ msg : 'Schema not found' });
//         } else {
//             var user = result.rows;
//             res.send(user);        }
//     });
// });