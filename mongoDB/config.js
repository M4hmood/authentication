require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

/*const connect = (uri) => {  
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful...`))
.catch(err => console.log(`Error in DB connection`)); 
}

module.exports = connect(process.env.mongoURI); 
*/