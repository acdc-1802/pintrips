import React from 'react';
import history from '../../history';
import { Button } from 'semantic-ui-react';

const CannotFind = () => {
  return (
    <div className='center-message'>
      <img alt='sadface-img' src='/attributes/sad-face.png'/>
      <h3>Sorry, we couldn't find that page :/</h3>
      <Button onClick={()=>history.push('/')}>Go Home</Button>
    </div>
  )
}

export default CannotFind;