const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: "User not found, you may have to create an account" }); //res.status(401).send("User not found, you may have to create an account");  
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ message: "password incorrect" }); //res.status(401).send("password incorrect");
        }
        const token = jwt.sign({ user }, process.env.SECRET_KEY, {expiresIn: '1h'});
        res.json({ message: "Login successful", redirectURL: `/profile/${user._id}`, token: token });
    } catch (error) {
        res.status(500).json({ message: "an error has occured when logging in" });
        console.log(error);
    }
};

exports.register = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password, birthdate, gender, bio} = req.body;
        const isExisting = await User.findOne({ username });
        if (isExisting) {
            return res.send('username already exists');
        }
        const emailNotAvailable = await User.findOne({ email });
        if (emailNotAvailable) {
            return res.send('email already signed up to another account');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({firstName, lastName, username, email, password: hashedPassword, birthdate, gender, bio});
        const savedUser = await newUser.save(); //const savedUser = await User.create({firstName, lastName, username, email, hashedPassword, birthdate, gender, bio})
        res.status(201).json({ message: 'User registered successfully!', redirectURL: `/profile/${user._id}`, user: savedUser });
    } catch (error) {
        res.status(500).json({ error: 'an error has occured when signing up' });
    }
};
