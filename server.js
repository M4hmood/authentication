require('dotenv').config();
require('./mongoDB/config');
const express = require('express');
const app = express();
const rootRoute = require('./routes/root');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/api/userRoute')

app.use(express.urlencoded({ extended: true})); //app.use(bodyParser.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

//serve static files from the "public" directory
app.use('/', express.static('public'));
app.use('/login(.html)?', express.static('public'));
app.use('/register(.html)?', express.static('public'));
app.use('/profile(.html)?', express.static('public'));

//routes
app.use('/', rootRoute);
app.use('/auth', authRoute);
app.use('/api/user', userRoute);


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});