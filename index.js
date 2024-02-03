const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true})); //app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); //Serve static files from the "public" directory

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = mongoose.model('User', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other' ]},
    bio: String
});

app.get('/', (req, res) => {
    try {
        res.sendFile(__dirname + '/views/login.html');   
    } catch (error) {
        res.status(101).json({ error: "can't load login html file"});
    }
});

app.get('/register', (req, res) => {
    try {
        res.sendFile(__dirname + '/views/register.html');
    } catch (error) {
        res.status(102).json({ error: "can't load register html file"});
    }
});

app.get('/password_forgotten', (req, res) => {
    res.send("password can't be recovered");
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find().select("_id username password");
        if (!users) {
            return res.send("there are no users yet");
        } else {
            res.json(users);
        }
    } catch (error) {
        res.status(103).send({ error: "can't load users"});
    }
});

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        if (user) {
            if (user.password == password) {
                res.send("you've successfuly logged in");
            } else {
                res.send("password incorrect");
                //res.json({ message: "password incorrect" });
            }
        } else {
            res.send("User not found, you may have to create an account");
        }
    } catch (error) {
        res.status(500).json({ error: 'an error has occured when logging in' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const {firstName, lastName, username, email, password, birthdate, gender, bio} = req.body;
        const isExtisting = await User.findOne({ username });
        if (isExtisting) {
            return res.send('user already exists');
        }
        const newUser = new User({firstName, lastName, username, email, password, birthdate, gender, bio});
        const savedUser = await newUser.save();
        //const savedUser = await User.create({firstName, lastName, username, email, password, birthdate, gender, bio})
        res.json({ message: 'User registered successfully!', user: savedUser });
    } catch (error) {
        res.status(501).json({ error: 'an error has occured when signing up' })
    }
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});