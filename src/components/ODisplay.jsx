import React, { Component } from 'react';

class ODisplay extends Component {

    constructor(props) {
        super(props);

    }

  

    render() {

      const { optotype } = this.props;

      return (
          <div>
            <div className='flex items-center justify-center'>
                <img src={optotype} className='border-2 border-black rounded-lg w-1/2' alt="Optotype" />
            </div>
          </div>
      );
      
    }
}

export default ODisplay;

