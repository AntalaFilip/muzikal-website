import React from 'react';
import './sponsors.css';

export default function Sponsors() {
    return(
        <div className="sponsors">
            <div className="header">
                <h1>Sponzori</h1>
                <h2>Ďakujeme týmto super ľuďom a firmám za ich podporu! Ak by ste nás chceli podporiť, <a href="/contact">napíšte nám</a></h2>
            </div>
            <div className="sponsorlist">
                <ul>
                   <a href="http://farlesk.sk"><img src="farlesk.png" alt="Farlesk logo" about="Farlesk"></img></a>
                </ul>
            </div>
        </div>
    )
}