import React from 'react';
import Title from './Header/Title.js';
import Navigationbar from './Header/Navigation.js';

export default class Header extends React.Component {  

  render() {
    return (
      <div>
        <Navigationbar />
      </div>
    );
  }
}