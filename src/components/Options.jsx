import React, { Component } from 'react';
import truck from '../otypes/truck.png';


class Options extends Component {

  checkCorrectness = () => {
      const { isRight, incrementFunction } = this.props;
      if (isRight) {
          incrementFunction();
      }
    }

  render() {

    const { isRight, incrementFunction, picture } = this.props;

    const style = {
      width: `80mm`,
      height: `80mm`
  };

    return (
      <div className='flex justify-center items-center' onClick={this.checkCorrectness}>
        <img 
          src={picture}
          alt="optotype" 
          className='border-2 border-black rounded-lg hover:opacity-60 opacity-100 max-w-full min-w-full '
          style = {style}/>
      </div>
    );
  }


}



// Export the component
export default Options;