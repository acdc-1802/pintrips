import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
class HomePage extends Component {
    render() {
        return (
            <div>
            <Navbar/>
            <Link to="/home"><button>Home</button></Link> 
            </div>
        );
    }
}

export default HomePage;
