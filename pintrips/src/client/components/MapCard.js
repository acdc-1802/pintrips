import React, { Component } from 'react';
import { Button, Card, Image, Icon, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from 'firebase'
import db from '../firestore';
import history from '../../history';

class MapCard extends Component {
  constructor(props) {
    super(props)
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
          <Link to={`/SingleBoard/${this.props.id}`}>
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
          </Link>
          <Card.Content extra>
            <Card.Description>
              <Popup
                trigger={<Button color='red' floated='right' content='Delete Board' />}
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
      </div >
    );
  }
}

export default MapCard;
