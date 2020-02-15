const mysql = require('mysql'),
    Prompt = require('./lib/Prompts');
    
const prompt = new Prompt,
 connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    password:"taytum123",
    database: "tracker_db"
});

connection.connect( err => {
    if (err) throw err;
});