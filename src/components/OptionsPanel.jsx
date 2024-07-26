import React, { Component } from 'react';
import Options from './Options';

class OptionsPanel extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
            mapping: props.mapping,
            incrementFunction: props.incrementFunction,
            isORight: props.isORight,
            wrongAnswers: props.wrongAnswers
        };
    }
    


    render() {

        const {mapping, isORight, wrongAnswers, incrementFunction} = this.state;

        return ( 
            <div className='m-2 grid grid-cols-1 md:grid-cols-4 gap-4 w-full px-4 '>
                {mapping ? (
                    <Options
                        isRight={isORight[0]}
                        incrementFunction={incrementFunction}
                        picture={isORight[0] ?  mapping.correct_result : wrongAnswers[0]}
                    />
                ) : (
                    <p>Loading...</p>
                )}

                {mapping ? (
                    <Options
                        isRight={isORight[1]}
                        incrementFunction={incrementFunction}
                        picture={isORight[1] ? mapping.correct_result : wrongAnswers[1]}
                    />
                ) : (
                    <p>Loading...</p>
                )}

                {mapping ? (
                    <Options
                        isRight={isORight[2]}
                        incrementFunction={incrementFunction}
                        picture={isORight[2] ? mapping.correct_result : wrongAnswers[2]}
                    />
                ) : (
                    <p>Loading...</p>
                )}

                {mapping ? (
                    <Options
                        isRight={isORight[3]}
                        incrementFunction={incrementFunction}
                        picture={isORight[3] ? mapping.correct_result : wrongAnswers[3]}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        )
    }


}



// Export the component
export default OptionsPanel;