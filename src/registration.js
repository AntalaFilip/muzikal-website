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
            mailSent: false,
            error: null
        }
    }
    render() {
        return (
            <div class="registration">
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
                    <label for="int">Mám dieťa vo Felixe / som z Felixu</label><br/>
                    <input type="radio" id="origin ext" name="origin" value="ext" 
                        onChange={e => this.setState({ origin: e.target.value })}
                        required
                    />
                    <label for="ext">Nie som z Felixu</label><br/>
                    <br/>
                    <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                    <div>
                        {this.state.mailSent &&
                        <div>Vaša rezervácia bola zaevidovaná, ďakujeme!</div> }
                    </div>
                </form>
            </div>
        )
    }
    handleFormSubmit = e => {
        e.preventDefault();
        axios ({
            method: 'post',
            url: 'http://localhost:5000/registerticket',
            headers: { 'content-type': 'application/json'},
            data: this.state
        })
        .then(result => {
            this.setState({
                mailSent: result.data.sent
            })
        })
        .catch(error => this.setState({ error: error.message}));
    };
}

export default Registration;