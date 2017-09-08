var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var urlencodeParser = bodyParser.urlencoded({ extended: true });
var http = require('http');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
var server = http.createServer(app);
server.listen(process.env.PORT || 3000);
// console.log('http://localhost:3000');
var transporter = nodemailer.createTransport({
    "aliases": [
        "Google Mail"
    ],
    "domains": [
        "gmail.com",
        "googlemail.com"
    ],
    "host": 'smtp.gmail.com',
    "auth": {
        user: 'osxunixl@gmail.com',
        pass: 'Osxunix97'
    },
    "port": 465,
    "secure": true
});
transporter.use('compile', hbs({
    viewPath: 'views',
    extName: '.ejs'
}));

app.get('/', function (req, res) {
    res.render('form');
});

app.post('/sendmail', urlencodeParser, function (req, res) {
    var username = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;
    console.log(username, email, pass);
    transporter.sendMail({
        from: 'osxunixl@gmail.com',
        to: email,
        subject: 'Node Mail',
        template: 'mail',
        context: {
            username, email, pass
        }
    },
        function (err, response) {
            if (err) {
                res.json('Thất bại');
                res.redirect('/');
            } else {
                res.json('Thành công');
                res.redirect('/');
            }
        });
});
