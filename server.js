if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser= require('body-parser')
const methodOverride = require('method-override')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(expressLayouts)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(express.static('public'))
app.use('/',  indexRouter)
app.use('/authors',  authorRouter)
app.use('/books',  bookRouter)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testaroo', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}); // if db doesn't exist, it will automatically be created

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db');
});


app.listen(process.env.PORT || 3000)