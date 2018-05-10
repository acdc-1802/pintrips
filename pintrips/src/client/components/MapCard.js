import React, { Component } from 'react';
import { Button, Card, Icon, Popup, Input, Checkbox, Segment, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
      zoom: [12],
      shareWith: '',
      boardId: this.props.id,
      canWrite: '',
      sender: null
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.acceptBoard = this.acceptBoard.bind(this);
    this.declineBoard = this.declineBoard.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
  }
  acceptBoard() {
    this.setState({ canWrite: 'accepted' })
    db.collection('users').doc(this.props.recipient).set(
      {
        canWrite: {
          [this.state.boardId]: 'accepted'
        }
      },
      { merge: true }
    )
      .catch(error => console.error('Unable to accept board'))
    db.collection('boards').doc(this.state.boardId).set(
      {
        writers: {
          [this.props.recipient]: true
        }
      },
      { merge: true }
    )
      .catch(error => console.log('Unable add user as a writer', error))
  }
  declineBoard() {
    this.setState({ canWrite: 'declined' })
    db.collection('users').doc(this.props.recipient).update(
      {
        canWrite: {
          [this.state.boardId]: 'declined'
        }
      }
    )
      .catch(error => console.error('Unable to decline board'))
    db.collection('boards').doc(this.state.boardId).update(
      {
        readers: {
          [this.props.recipient]: false
        }
      }
    )
      .catch(error => console.error('Unable to decline board', error))
  }
  componentDidMount() {
    if (this.props.recipient) {
      db.collection('users').doc(this.props.recipient).get()
        .then(doc => {
          this.setState({ canWrite: doc.data().canWrite[this.state.boardId] })
        })
        .catch(error => console.error('Could not find data', error))
      db.collection('users').doc(this.props.board.creator).get()
        .then(doc => {
          this.setState({ sender: doc.data().username })
        })
        .catch(error => console.error('could not get sender'))
    }
  }
  checkStatus(boardStatus) {
    if (boardStatus === 'open') {
      return true;
    } else {
      return false;
    }
  }
  changeStatus() {
    if (this.props.board.locked === 'open') {
      db.collection('boards').doc(this.state.boardId).update({
        locked: 'closed'
      })
        .catch(error => console.error('Could not close board', error))
    } else {
      db.collection('boards').doc(this.state.boardId).update({
        locked: 'open'
      })
        .catch(error => console.error('Could not open board', error))
    }
  }
  handleDelete() {
    db.collection('boards').doc(this.state.boardId).delete()
      .then(() => {
        console.log('Board successfully deleted')
      })
      .then(() => history.push('/HomePage'))
      .catch(err => console.error('Delete unsuccessful: ', err))
  }
  handleChange(event) {
    this.setState({
      shareWith: event.target.value
    })
  }
  handleSend() {
    db.collection('users').where('username', '==', this.state.shareWith).get()
      .then(snap => snap.forEach(doc => {
        let id = doc.data().id;
        db.collection('users').doc(id).set(
          {
            canWrite: {
              [this.state.boardId]: 'pending'
            }
          },
          { merge: true }
        )
          .catch(error => console.error('Unable to add board to user', error))
        db.collection('boards').doc(this.state.boardId).set(
          {
            readers: {
              [id]: true
            }
          },
          { merge: true }
        )
          .then(() => { this.setState({ sent: true }) })
          .then(() => { setTimeout(() => this.setState({ sent: false }), 3000) })
          .catch(error => console.error('Writer could not be added', error))
          .catch(error => console.error('Unable to send board', error))
      }))
      .catch(error => console.error('Unable to send board', error))

  }
  render() {
    return (
      <div className='ind-card'>
        <Card id='mapcard'>
          <Segment raised>
            {
              <Label as='a' color='white' size='large' corner='right' icon='empty star' />
            }
            <Map
              style={'mapbox://styles/destinmcmurrry/cjgy8hinv00192rp4obrfj9qq'}
              zoom={this.state.zoom}
              containerStyle={{
                height: "289px",
                width: "289px"
              }}
              center={this.state.center}
            />
          </Segment>
          <Card.Content className='card-content'>
            <div className='card-description'>
              <div>
                <Link to={`/SingleBoard/${this.props.id}`}>
                  <Card.Header>
                    {this.props.board.name}
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      {this.props.board.locked}
                    </span>
                  </Card.Meta>
                </Link>
              </div>
              <div>
                <Popup
                  trigger={<Icon name='external share' size='large' fitted={true} floated='right' />}
                  content={
                    !this.state.sent ?
                      (<div>
                        <p>Who would you like to share this board with?</p>
                        <Input onChange={this.handleChange} size='mini' icon='search' placeholder='Search...' />
                        <br />
                        <Button color='blue' size='mini' content='Share' onClick={this.handleSend} />
                      </div>)
                      :
                      (<p>Board was successfully sent!</p>)
                  }
                  on='click'
                  position='top right'
                />
              </div>
            </div>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>
              {
                this.props.owner &&
                <div className='card-description'>
                  <div>
                    <Popup
                      trigger={<Icon name='trash outline' color='red' size='large' fitted={true} />}
                      content={
                        <div>
                          <p>Are you sure?</p>
                          <Button color='red' content='Delete' onClick={this.handleDelete} />
                        </div>
                      }
                      on='click'
                    />
                  </div>
                  <div>
                    <Checkbox defaultChecked={this.checkStatus(this.props.board.locked)} onClick={this.changeStatus} toggle />
                  </div>
                </div>
              }
              {
                this.state.sender &&
                <div>
                  <p>Created by: {this.state.sender}</p>
                </div>
              }
              {
                this.state.canWrite === 'pending' &&
                (
                  <div>
                    <i>Pending</i>
                    <Button floated='right' color='red' onClick={this.declineBoard}>Decline</Button>
                    <Button floated='right' color='green' onClick={this.acceptBoard}>Accept</Button>
                  </div>
                )
              }
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default MapCard;
