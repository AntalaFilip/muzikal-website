import React from 'react';
import './team.css'


class Team extends React.Component {
    render() {
        return (
            <div className="team">
                <div className="header">
                    <h1>Náš team</h1>
                </div>
                <div>
                    <div className="division herci">
                        <h2>Herci</h2>
                        <p>Adela Zemaníková ako&nbsp;
                            <em id="acooper" className="tooltip">Ashley Cooperová
                                <span className="tooltiptxt">Ashley Cooperová, snúbenica Steva Greena</span>
                            </em>
                        </p>
                        <p>Leo Rehúš ako&nbsp;
                            <em id="bjones" className="tooltip">Detektív Brandon Jones
                                <span className="tooltiptxt">Brandon Jones, súkromný detektív</span>
                            </em>
                        </p>
                        <p>Michal Čmelík ako&nbsp;
                            <em id="sgreen" className="tooltip">Steve Green
                                <span className="tooltiptxt">Steve Green, úspešný spisovateľ detektívok, snúbenec Ashley Cooperovej</span>
                            </em>
                        </p>
                        <p>Samo Pekarčík ako&nbsp;
                            <em id="dgreen" className="tooltip">Dustin Green
                                <span className="tooltiptxt">Dustin Green, brat zosnulého Steva Greena. Nikdy si neboli veľmi blízki, ale teraz jeho smrť veľmi oplakáva</span>
                            </em>
                        </p>
                        <p>Libor Byrtus ako&nbsp;
                            <em id="dnorton" className="tooltip">Donte Norton
                                <span className="tooltiptxt">Donte Norton, francúzsky cudzinec, ktorý žije v meste už pár rokov, ale nikto si s ním nie je blízky</span>
                            </em>
                        </p>
                        <p>Michal Földeš ako&nbsp;
                            <em id="everner" className="tooltip">Ethan Verner
                                <span className="tooltiptxt">Ethan Verner, Stevov najväčší súper vo svete literatúry, pretekali spolu, koho knihy budú úspešnejšie</span>
                            </em>
                        </p>
                        <p>Matúš Košťál ako&nbsp;
                            <em id="servant" className="tooltip">Peter Granger
                                <span className="tooltiptxt">Peter Granger, sluha v&nbsp;dome Ashley a Steva</span>
                            </em>
                        </p>
                        <p>Martin Krchnavý ako&nbsp;
                            <em id="doctor">Doktor</em>
                        </p>
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
}

export default Team;