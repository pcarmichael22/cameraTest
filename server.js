const express = require('express');
var multer = require('multer')
const app = express();
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/fullsize')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage })
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.get('/', renderHome);

function renderHome(request, response) {
    response.render('index');
}

app.post('/upload', upload.single('image'), function(req, res, next) {
    res.render('myupload', { image: req.file.path });
});

app.get('/uploads/fullsize/:file', function(req, res) {
    file = req.params.file;
    var img = fs.readFileSync(__dirname + "/uploads/fullsize/" + file);
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});


app.listen(PORT, () => console.log(`Up and running on ${PORT}`));