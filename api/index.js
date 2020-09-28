const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const con = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: "tickets"
})

let transporter = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTPUSER,
        pass: process.env.SMTPPASS,
    },
});

app.post('/registerticket', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var qty = req.body.qty;
    var origin = req.body.origin;

    var sql = `INSERT INTO tickets (name, email, qty, origin, state) VALUES ('${name}', '${email}', '${qty}', '${origin}', 'RESERVED')`;
    
    con.query(sql, function (err, result) {
        if (err) {
            res.status(500).send('Failed to insert into database')
            throw err;
        }
        var id = result.insertId;
        console.log(`Inserted a reservation @ ${id} - ${name}, ${email}, ${qty}, ${origin}`)
        transporter.sendMail({
            from: 'rezervacie@muzikalvrazdapodlaobete.sk',
            replyTo: "rezervacie@muzikalvrazdapodlaobete.sk",
            to: req.body.email,
            bcc: "rezervacie@muzikalvrazdapodlaobete.sk",
            subject: `Rezervácia č. ${id}`,
            text: `Dobrý deň, ${name}. \r\n Vašu rezerváciu (${id}) sme úspešne zaznamenali. \r\n Ďakujeme vám - tím muzikálu Vražda podľa obete.`,
            html: `<p>Dobrý deň, ${name}.</p><br/><p>Vašu rezerváciu (${id}) sme úspešne zaznamenali.</p><br/><p>Ďakujeme vám - tím muzikálu Vražda podľa obete</p>`,
        });
        res.status(200).send({
            "sent": true
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});