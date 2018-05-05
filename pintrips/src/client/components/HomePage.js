import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Input } from 'react-blur-admin';
import {Row, Col} from 'react-flex-proto';

class HomePage extends Component {
    render() {
        return (
          <div>
          </div>
        );
    }
}

export default HomePage;




// <div className="home-page" >
//             <Sidebar />
//             <div className="home-main">
//             <Input
//             onChange={e => this.onTextChange('warning', e)}
//             onValidate={e => 'warning'}
//             label='Warning'
//             value={this.state.warning} />
//               <div className="board">
//                 <h3> Paris </h3> 
//                 <img className="image" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6wpTX_Re1488fB2Lq5ngmN3i5f83p5Vmhk7JOjPccOLmByGv4"}/>
//               </div> 
//               <div className="board">
//                 <h3> Paris </h3> 
//                 <img className="image" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6wpTX_Re1488fB2Lq5ngmN3i5f83p5Vmhk7JOjPccOLmByGv4"}/>
//               </div> 
//             </div>
//           // </div>