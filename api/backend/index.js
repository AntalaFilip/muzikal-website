const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const con = mysql.createConnection({
    host: "countrycraft-db.cvitton2dtqy.eu-west-3.rds.amazonaws.com",
    user: "muzikal",
    password: "muzikal123",
    database: "tickets"
})

let transporter = nodemailer.createTransport({
    host: "smtp.websupport.sk",
    port: 465,
    secure: true,
    auth: {
        user: "automailer@muzikalvrazdapodlaobete.sk",
        pass: "Jr75}etp$(",
    },
});

app.post('/registerticket', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var qty = req.body.qty;
    var origin = req.body.origin;

    var sql = `INSERT INTO tickets (name, email, qty, origin, state) VALUES ('${name}', '${email}', '${qty}', '${origin}', 'RESERVED')`;
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted!")
        var id = result.insertId;
        transporter.sendMail({
            from: 'automailer@muzikalvrazdapodlaobete.sk',
            replyTo: "rezervacie@muzikalvrazdapodlaobete.sk",
            to: req.body.email,
            bcc: "rezervacie@muzikalvrazdapodlaobete.sk",
            subject: `Rezervácia č. ${id}`,
            text: `Dobrý deň, ${name}. \r\n Vašu rezerváciu (${id}) sme úspešne zaznamenali. \r\n Ďakujeme vám - tím muzikálu Vražda podľa obete.`,
            html: `<p>Dobrý deň, ${name}.</p><br/><p>Vašu rezerváciu (${id} sme úspešne zaznamenali.</p><br/><p>Ďakujeme vám - tím muzikálu Vražda podľa obete</p>`,
        });

    });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});