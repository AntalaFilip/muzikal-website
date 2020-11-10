const bcrypt = require('bcrypt');
const mysql = require('mysql');
require('dotenv').config({path: '/var/www/backend/.env'});
const jwt = require('jsonwebtoken');

const con = mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: "felixmuzikal0"
})

exports.register = async (req, res) => {
    const pass = await bcrypt.hash(req.body.pass, await bcrypt.genSalt());
    const users = {
        "fname": req.body.fname,
        "lname": req.body.lname,
        "user": req.body.user,
        "pass": pass,
        "class": req.body.class,
        "auth": req.body.auth,
    }
    con.query(`INSERT INTO users SET ?`, users, (err, results) => {
        if (err) {
            res.status(400).send(`An error has ocurred: ${err}`);
        }
        else {
            res.status(200).send('Register successful');
        }
    })

}

exports.login = async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    console.log(`Handling login: ${user}`)
    con.query(`SELECT * FROM users WHERE user = ?`, [user], async function (err, results) {
        if (err) {
            res.status(500).send(`An error has ocurred`);
            throw err;
        }
        else {
            if (results.length > 0) {
                const comparison = await bcrypt.compare(pass, results[0].pass);
                if (comparison) {
                    const token = jwt.sign({
                        user: user,
                        fname: results[0].fname,
                        lname: results[0].lname
                    }, process.env.AUTHKEY, {
                        expiresIn: '1h',
                        issuer: process.env.ISSUER
                    });
                    res.status(200).send({
                        "user": user,
                        "fname": results[0].fname,
                        "lname": results[0].lname,
                        "token": token,
                    });
                }
                else res.status(204).send(`Invalid password`);
            }
            else res.status(206).send(`User does not exist`);
        }
    })
}

exports.reqauth = async (req, res) => {
    const token = req.header('Authorization');
    jwt.verify(token, process.env.AUTHKEY, {
        issuer: process.env.ISSUER,
    }, (err, decoded) => {
        if (err) res.status(401).send({"message": `Authentication failed`, "err": err});
        else res.status(200).send({
            "user": decoded.user,
            "fname": decoded.fname,
            "lname": decoded.lname,
            "message": `Authentication successful`
        });
    })
}
exports.auth = async (token) => {
    jwt.verify(token, process.env.AUTHKEY, {
        issuer: process.env.ISSUER,
    }, (err, decoded) => {
        if (err) return false;
        else return decoded;
    })
}