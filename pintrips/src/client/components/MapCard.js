import React, { Component } from 'react';
import { Button, Card, Image, Icon} from 'semantic-ui-react'

class MapCard extends Component {
  render() {
    return (
      <div className='ind-card'>
      <Card>
      <Image src='http://geoawesomeness.com/wp-content/uploads/2016/02/Paris-map.png' />
      <Card.Content>
        <Card.Header>
          Paris
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            Started 
          </span>
        </Card.Meta>
        <Card.Description>
          Note avout travel
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
       
      </Card.Content>
    </Card>
    </div>
    );
  }
}

export default MapCard;
