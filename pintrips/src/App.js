import React, { Component } from 'react';
import { Navbar } from './client/components';
import Routes from './client/routes';
import { Button, Icon, Popup, Image, Label } from 'semantic-ui-react';

class App extends Component {
  constructor() {
    super() 
      this.state={
        showInstallMessage: false
      }
    
  }
  componentDidMount() {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
    
    const isInStandalone = () => (window.matchMedia('(display-mode: standalone)').matches)
    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.setState({ showInstallMessage: true });
    }
    window.addEventListener('beforeinstallprompt', (event) => {
      event.prompt();

      console.log('event', event.prompt())

      console.log('beforeinstallprompt fired index'); // It doesn't show at all
    });
    
  }
  
  render() {
    return (
      <div id='full-page'>
        <Navbar />
        {
          this.state.showInstallMessage && 
            <Label className="download-label"
              active={true}
              
              content={'To install this webapp, click the share button and then Add to HomeScreen'}
            />

          
        }
        {/* BELOW IS WHERE WE'LL SWITCH BETWEEN COMPONENTS BASED ON ROUTES/LINKS */}
        <div className="screen">
        <Routes />
        </div>
     </div>
    );
  }
}

export default App;
