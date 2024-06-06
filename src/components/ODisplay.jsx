import React, { Component } from 'react';
import truck from '../otypes/truck.png';
// Define the class component
class ODisplay extends Component {
  render() {
    return (
      <div>
        <img src={truck} alt="optotype"/>
      </div>
    );
  }
}

// Export the component
export default ODisplay;