const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console ,"Error in connecting to Data Base"));

db.once('open' , () => {
    console.log("Connected to Data Base :: MongoDB");
});


module.exports = db;