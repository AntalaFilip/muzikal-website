const bcrypt = require('bcrypt');
const mysql = require('mysql');
require('dotenv');

const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: "users"
})

export async function register(req, res) {
    const pass = await bcrypt.hash(req.body.password, process.env.SALT);
    const users = {
        "name": req.body.name,
        "user": req.body.user,
        "pass": pass
    }
    con.query(`INSERT INTO users SET ?`, users, (err, results) => {
        if (err) {
            res.status(400).send(`An error has occured`);
            console.log(err);
        }
        else {
            res.status(200).send('Register successful');
        }
    })

}

export async function login(req, res) {
    const user = req.body.user;
    const pass = req.body.pass;
    con.query(`SELECT * FROM users WHERE user = ?`, [user], async function (err, results) {
        if (err) res.status(400).send(`An error has ocurred`)
        else {
            if (results.length > 0) {
                const comparison = await bcrypt.compare(pass, results[0].pass);
                if (comparison) res.status(200).send({
                    "message": `Login successful`,
                    "user": `${results[0].user}`
                });
                else res.status(204).send(`Invalid password`);
            }
            else res.status(206).send(`User does not exist`);
        }
    })
}