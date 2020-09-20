import React from 'react';
import './contact.css'

export default function Contact() {
    return (
        <div class="contact">
            <div class="header">
                <h1>Kontakt</h1>
            </div>
            <div class="text emails">
                <p>Ak máte nejakú otázku, môžete nám napísať na tieto maily:</p>
                <e>Lístky: </e><a href="mailto:rezervacie@domena.sk">rezervacie@domena.sk</a><e> / </e><a href="mailto:listky@domena.sk">listky@domena.sk</a>
                <br />
                <e>Sponzorstvo: </e><a href="mailto:sponzorstvo@domena.sk">sponzorstvo@domena.sk</a>
                <br />
                <e>Otázky a pod: </e><a href="mailto:filip@domena.sk">filip@domena.sk</a>
            </div>
            <div class="text felix">
                <a href="http://felix.edupage.org"><h2>Škola Felix</h2></a>
            </div>
            <div class="map">
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8962.008405910066!2d17.111449925399384!3d48.102113093858904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c89bef676c157%3A0xb86d0fc8aeb0cf64!2s%C5%A0kola%20Felix!5e0!3m2!1ssk!2ssk!4v1600331624345!5m2!1ssk!2ssk" class="embedmap" width="600" height="450" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
        </div>
    )
}