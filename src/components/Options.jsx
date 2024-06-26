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

    return (
      <div className='p-4 m-2' onClick={this.checkCorrectness}>

        <img src={picture} alt="optotype" className='border-2 border-black rounded-lg hover:opacity-60 opacity-100'/>
      </div>
    );
  }


}



// Export the component
export default Options;