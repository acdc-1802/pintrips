import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Button } from 'semantic-ui-react'



class HomePage extends Component {
    render() {
       return (
        <div className="home-page" >
          <Sidebar />
            <div className="home-main">
            
            </div> 
        </div>
       
        );
    }
}

export default HomePage;




