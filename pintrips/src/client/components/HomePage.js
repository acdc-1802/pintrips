import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import MapCard from './MapCard';




class HomePage extends Component {
    render() {
       return (
         <div className='card-group'>
          <MapCard />
          <MapCard />
          <MapCard />
          <MapCard />
          <MapCard />
          <MapCard />
          <MapCard />
          <MapCard />
        </div>
        );
    }
}

export default HomePage;




