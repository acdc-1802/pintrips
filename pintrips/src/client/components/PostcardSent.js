import React, { Component } from 'react';
import history from '../../history';

class PostcardSent extends Component {

  componentDidMount() {
    setTimeout(function(){
      history.push('/')
    }, 1000);
  }

  render() {
    return (
      <div className={"login-container"}>
        <h2>Postcard successfully sent!</h2>
      </div>
    )
  }
}

export default PostcardSent
