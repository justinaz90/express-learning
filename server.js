const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

const app = express();
app.engine('hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', upload.single('fileName'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const fileName = req.file;
  
  if(author && sender && title && fileName && message) {
    res.render('contact', { isSent: true, fileName: fileName.originalname });
  } else {
    res.render('contact', { isError: true });
  }
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
