import React, { Component } from 'react';
import truck from '../otypes/truck.png';

class ODisplay extends Component {
  render() {
    return (
      <div className='flex justify-center w-full'>
        <img src={truck} alt="optotype" className='w-1/4 h-auto border-2 border-black rounded-lg hover:opacity-60 opacity-100'/>
      </div>
    );
  }
}



// Export the component
export default ODisplay;