import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Navbar extends Component {
    render() {
        return (
            <div>
            
            <header>
            <div className="nav-button">
            <Link to={'/'}> <button> HOME </button></Link> 
            </div>
            <h1> [ISN] </h1>
            <div className="button">
            <Link to={'/campuses'} > <button>CAMPUSES </button> </Link>              
            
            <Link to={'/students'}> <button>STUDENTS </button></Link>
            </div>
            </header>
            
            </div>
        );
    }
}

export default Navbar;