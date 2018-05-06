import React, { Component } from 'react';
import { Button, Card, Image, Icon} from 'semantic-ui-react'

class MapCard extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className='ind-card'>
      <Card>
      <Image src='http://geoawesomeness.com/wp-content/uploads/2016/02/Paris-map.png' />
      <Card.Content>
        <Card.Header>
          {this.props.board.name}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {this.props.board.locked}
          </span>
        </Card.Meta>
        </Card.Content>
        <Card.Content extra>
        <Card.Description>
          Note avout travel
        </Card.Description>
       
      </Card.Content>
    </Card>
    </div>
    );
  }
}

export default MapCard;
