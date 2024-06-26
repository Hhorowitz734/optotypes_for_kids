import React, { Component } from 'react';

import ODisplay from '../components/ODisplay.jsx';
import Options from '../components/Options.jsx';

class OptotypeQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
          count: 0,
          isORight: [true, false, false, false],
          mappings: null,
          mapping: null,
          error: false,
          errorMessage: '',
      };
    }

    increment = () => {
        this.setState((prevState) => ({
            count: prevState.count + 1,
        }));
    };

    
    componentDidMount() {
      
      const fetchUrl = '/otypes/matching.json';  // Path to matching json file -> Should be in "public" directory

      fetch(fetchUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok: ' + response.statusText);
              }
              return response.json();
          })
          .then(data => {
              if (data && data.image_mappings) {
                  const mappings = data.image_mappings;
                  const randomIndex = Math.floor(Math.random() * mappings.length);
                  const randomMapping = mappings[randomIndex];
                  this.setState({ mappings, mapping: randomMapping });
              } else {
                  throw new Error('Invalid JSON structure');
              }
          })
          .catch(error => {
              console.error('Error fetching the JSON file:', error);
              this.setState({ error: true, errorMessage: error.message });
          });
  }



    render() {

      const {count, isORight, mapping} = this.state;

        return (
            <div>
                <h1 className='m-4 text-2xl'>Counter: {count}</h1>
                <div className="flex justify-center w-full">
                    <div className='mt-2'>
                      {mapping ? <ODisplay optotype={mapping.optotype} /> : <p>Loading...</p>}
                    </div>
                </div>
                <div className='mt-2 flex justify-between'>
                    <Options isRight={isORight[0]} incrementFunction={this.increment} />
                    <Options isRight={isORight[1]} incrementFunction={this.increment} />
                    <Options isRight={isORight[2]} incrementFunction={this.increment} />
                    <Options isRight={isORight[3]} incrementFunction={this.increment} />
                </div>
            </div>
        );
    }
}

// Export the component
export default OptotypeQuestion;
