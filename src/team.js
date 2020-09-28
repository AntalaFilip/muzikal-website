import React from 'react';
import './team.css'

export default function Team() {
    return (
        <div className="team">
            <div className="header">
                <h1>Náš team</h1>
            </div>
            <div>
                <div className="division herci">
                    <h2>Herci</h2> 
                    <p>Adela Zemaníková ako <em>Ashley Cooperová</em></p>
                    <p>Leo Rehúš ako <em>Detektív Brandon Jones</em></p>
                    <p>Libor Byrtus ako <em>postava</em></p>
                    <p>Samo Pekarčík ako <em>Donte Norton</em></p>
                    <p>Martin Krchnavý ako <em>postava</em></p>
                    <p>Michal Földeš ako <em>Ethan Verner</em></p>
                    <p>Matúš Košťál ako <em>postava</em></p>
                    <p>Michal Čmelík ako <em>Steve Green</em></p>
                </div>
                <div className="division scenaristi">
                    <h2>Scenáristi</h2>
                    <p>Terezka Kršáková</p>
                    <p>Matilda Borovská</p>
                    <p>Vesna Vrábelová</p>
                    <p>Zara Halmo</p>
                    <p>Šimon Godarský</p>
                </div>
                <div className="division manazeri">
                    <h2>Manažéri</h2>
                    <p>Filip Antala</p>
                    <p>Daniel Držík</p>
                    <p>Matúš Halák</p>
                    <p>Michal Svoboda</p>
                </div>
                <div className="division kulisari">
                    <h2>Kulisári</h2>
                    <p>Klára Šumská</p>
                    <p>Sofia Kocková</p>
                </div>
                <div className="division kostymeri">
                    <h2>Kostyméri</h2>
                    <p>Adela Belovičová</p>
                    <p>Zoja Zajvaldová</p>
                </div>
                <div className="division hudobnici">
                    <h2>Hudobníci</h2>
                    <p>Martin Krchnavý</p>
                    <p>Matúš Košťál</p>
                    <p>Adela Zemaníková</p>
                </div>
            </div>
        </div>
    )
}