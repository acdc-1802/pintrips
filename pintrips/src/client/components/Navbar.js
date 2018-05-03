import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Navbar extends Component {
    render() {
        return (
            <div className='navbar'>
            <p> THIS YOUR HOME AWAY FROM, BUT INCLUDING, HOME </p>
            <Link to="/home"><button>Home</button></Link> 
            </div>
        );
    }
}

export default Navbar;