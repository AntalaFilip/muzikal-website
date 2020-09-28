import React from 'react';
import './registration.css'
import axios from 'axios';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            qty: '',
            origin: '',
            done: true,
            error: null
        }
    }
    render() {
        return (
            <div className="reg">
                <div className="header">
                    <h1>Rezervujte si lístky!</h1>
                </div>
                <div className="form">
                {!this.state.done && 
                    <form action="#">
                    <input type="text" id="name" name="name" placeholder="Meno a priezvisko.."
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        required
                    />
                    <input type="number" id="qty" name="quantity" min="1" placeholder="Počet lístkov"
                        value={this.state.count}
                        onChange={e => this.setState({ qty: e.target.value })}
                        required
                    />
                    <input type="email" id="email" name="email" placeholder="Váš email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        required
                    />
                    <input type="radio" id="origin int" name="origin" value="int" 
                        onChange={e => this.setState({ origin: e.target.value })}
                        required
                    />
                    <label htmlFor="int">Mám dieťa vo Felixe / som z Felixu</label><br/>
                    <input type="radio" id="origin ext" name="origin" value="ext" 
                        onChange={e => this.setState({ origin: e.target.value })}
                        required
                    />
                    <label htmlFor="ext">Nie som z Felixu</label><br/>
                    <br/>
                    <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                </form>}
                <div className="hidden">
                        {this.state.done &&
                        <div className="after">
                            <p>Vaša rezervácia bola zaevidovaná, ďakujeme!</p>
                            <em>Psst, skontrolujte si email :)</em><br/>
                            <button 
                            onClick={this.setState({done: false})}
                            >Nová rezervácia</button>
                        </div> }
                    </div>
                </div>
            </div>
        )
    }
    handleFormSubmit = e => {
        axios ({
            method: 'post',
            url: 'http://localhost:5000/registerticket',
            headers: { 'content-type': 'application/json'},
            data: this.state
        })
        .then(result => {
            this.setState({
                done: result.data.sent
            })
        })
        .catch(error => this.setState({ error: error.message}));
    };
}

export default Registration;