import React from 'react';
import './registration.css'
import axios from 'axios';

const API_PATH = '';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            count: '',
            fromFelix: '',
            mailSent: false,
            error: null
        }
    }
    render() {
        return (
            <div>
                <form action="#">
                    <input type="text" id="name" name="name" placeholder="Meno a priezvisko.."
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        required
                    />
                    <input type="number" id="quantity" name="quantity" min="1" placeholder="Počet lístkov"
                        value={this.state.count}
                        onChange={e => this.setState({ count: e.target.value })}
                        required
                    />
                    <input type="email" id="email" name="email" placeholder="Váš email"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                        required
                    />
                    <input type="radio" id="internal" name="origin" value="int" 
                        onChange={e => this.setState({ fromFelix: e.target.value })}
                        required
                    />
                    <label for="internal">Som z Felixu</label><br/>
                    <input type="radio" id="external" name="origin" value="ext" 
                        onChange={e => this.setState({ fromFelix: e.target.value })}
                        required
                    />
                    <label for="external">Som mimo Felixu</label><br/>
                    <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                </form>
            </div>
        )
    }
    handleFormSubmit( event ) {
        event.preventDefault();
        console.log(this.state);
    }
}

export default Registration;