import React, { Component } from 'react';
import { Button, Card, Image, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from 'firebase'
import db from '../firestore';
import history from '../../history';
import ReactMapboxGl from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZGVzdGlubWNtdXJycnkiLCJhIjoiY2plenRxaGw3MGdsNTJ3b2htMGRydWc3aiJ9.ycslnjgv2J9VZGZHT8EoIw'
});

class MapCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: [this.props.board.coordinates._long, this.props.board.coordinates._lat],
      zoom: [12]
    }
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    let boardId = this.props.id;
    db.collection('boards').doc(boardId).delete()
      .then(() => {
        console.log('Board successfully deleted')
      })
      .then(() => history.push('/HomePage'))
      .catch(err => console.error('Delete unsuccessful: ', err))
  }
  render() {
    return (
      <div className='ind-card'>
        <Card>
          <Map
            style='mapbox://styles/destinmcmurrry/cjgwoclek000a2sr3cwgutpdg'
            zoom={this.state.zoom}
            containerStyle={{
              height: "289px",
              width: "289px"
            }}
            center={this.state.center} />
          <Link to={`/SingleBoard/${this.props.id}`}>
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
          </Link>
          <Card.Content extra>
            <Card.Description>
              
              <Popup
                trigger={<Button color='red' floated='right' size='mini' content={<Icon name='trash outline' size='large' fitted={true} />} />}
                content={
                  <div>
                    <p>Are you sure?</p>
                    <Button color='red' content='Delete' onClick={this.handleDelete} />
                  </div>
                }
                on='click'
                position='top right'
              />
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default MapCard;
