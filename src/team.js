import React from 'react';
import './team.css'


class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toolTip: false,
            ttId: null
        }
        this.changetooltip.bind(this.changetooltip);
    }
    changetooltip(event) {
        this.setState({
            toolTip: true
        })
    }
    render() {
        return (
            <div className="team">
                <div className="header">
                    <h1>Náš team</h1>
                </div>
                <div>
                    <div className="division herci">
                        {this.state.toolTip && 
                        <div className="tooltip">
                            {this.ttId === `acooper` && 
                            <p>Ashley Cooperová, snúbenica Steva Greena</p> }
                        </div> 
                        }
                        <h2>Herci</h2>
                        <p>Adela Zemaníková ako <em id="acooper" onMouseOver={this.changetooltip}>Ashley Cooperová</em></p>
                        <p>Leo Rehúš ako <em id="bjones">Detektív Brandon Jones</em></p>
                        <p>Michal Čmelík ako <em id="sgreen">Steve Green</em></p>
                        <p>Samo Pekarčík ako <em id="dgreen">Dustin Green</em></p>
                        <p>Libor Byrtus ako <em id="dnorton">Donte Norton</em></p>
                        <p>Michal Földeš ako <em id="everner">Ethan Verner</em></p>
                        <p>Martin Krchnavý ako <em id="doctor">Doktor</em></p>
                        <p>Matúš Košťál ako <em id="servant">Sluha</em></p>
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