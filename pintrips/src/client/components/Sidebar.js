import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image, Icon} from 'semantic-ui-react'


class Sidebar extends Component {
  render() {
    return (
      <div className="side-bar">
        <div className="side-button">

          <Link to={'/HomePage'}className='button'><Button className="button">  MY BOARDS </Button> </Link>
          <Link to={'/HomePage'}className='button'><Button className="button">  BOARDS SHARED WITH ME </Button> </Link>
          

        </div>
      </div>
    );
  }
}

export default Sidebar;
