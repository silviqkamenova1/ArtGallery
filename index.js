const express = require('express');
const handlebars = require('express-handlebars');
//const cookieParser = require('cookie-parser');
//const mongoose = require('mongoose')

const routes = require('./routes');
//const {authentication} = require('./middlewares/authMiddleware');
const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs')

app.use('/static',express.static('public'))
app.use(express.urlencoded({extended: false}))//to parse data from sended forms with post request
//which will be parsed and recived in req.body like object
//app.use(cookieParser());
//app.use(authentication)
app.use(routes);

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb://127.0.0.1:27017/art')

app.listen(5000, () => 'Server is running on port 5000...')