import React from 'react';
import './registration.css'
import axios from 'axios';
require('dotenv').config({path: '/var/www/backend/.env'});

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            qty: '',
            origin: '',
            done: false,
            error: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }
    resetForm(event) {
        this.setState({
            name: '',
            email: '',
            qty: '',
            origin: '',
            done: false,
            error: null
        })
        var ele = document.getElementsByName("origin");
        for(var i=0;i<ele.length;i++) {
            ele[i].checked = false;
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        if (event.target.checkValidity()) {
            axios ({
                method: 'post',
                url: `${process.env.BACKEND}registerticket`,
                headers: { 'content-type': 'application/json'},
                data: this.state
            })
            .then(result => {
                this.setState({
                    done: result.data.sent
                })
            })
            .catch(error => this.setState({ error: error.message }));
        }
    }
    render() {
        return (
            <div className="reg">
                <div className="header">
                    <h1>LÍSTKY</h1>
                </div>
                <div className="form">
                {!this.state.done && !this.state.error &&
                    <form 
                        onSubmit={this.handleSubmit}
                    >
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
                    <input type="radio" id="origin-int" name="origin" value="int" 
                        onChange={e => this.setState({ origin: e.target.value })}
                        required
                    />
                    <label htmlFor="int">Mám dieťa vo Felixe / som z Felixu</label><br/>
                    <input type="radio" id="origin-ext" name="origin" value="ext" 
                        onChange={e => this.setState({ origin: e.target.value })}
                        required
                    />
                    <label htmlFor="ext">Nie som z Felixu</label><br/>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>}
                <div className="hidden">
                        {this.state.done &&
                        <div className="after">
                            <p>Vaša rezervácia bola zaevidovaná, ďakujeme!</p>
                            <em>Psst, skontrolujte si email :)</em><br/>
                            <button onClick={this.resetForm}>Nová rezervácia</button>
                        </div> }
                        {this.state.error && 
                        <div className="after">
                            <p>Ospravedlňujeme sa, ale niečo sa pokazilo.<br/>Ak problém pretrváva, napíšte nám</p>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration;