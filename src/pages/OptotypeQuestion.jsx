import React, { Component } from 'react';

import ODisplay from '../components/ODisplay.jsx';
import Options from '../components/Options.jsx';
import TimerBar from '../components/TimerBar.jsx';

import OptionsPanel from '../components/OptionsPanel.jsx';


class OptotypeQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
          count: 0,
          isORight: [true, false, false, false],
          wrongAnswers: [],
          mappings: null,
          mapping: null,
          error: false,
          errorMessage: '',
          correctOptionArray: [],
          chartSizesMM: [100, 75, 50, 25, 20, 10],
          currentSizeIndex: 0,
          timesSec: [20, 17, 15, 10, 5, 3],
          currentTimeIndex: 0
        };

      this.getNewQuestion = this.getNewQuestion.bind(this);
      this.updateImageSize = this.updateImageSize.bind(this);
      this.resetQuestion = this.resetQuestion.bind(this);

      this.timerBarRef = React.createRef();
    }

    componentDidMount() {
        // randomizes which index in isORight is true
        this.setState((prevState) => {
            const array = prevState.isORight.map(() => false);
            const randomIndex = Math.floor(Math.random() * array.length);
            array[randomIndex] = true;
            return { isORight: array };
        });

        const fetchUrl = '/otypes/matching.json';  // Path to matching json file -> Should be in "public" directory

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.image_mappings && data.correctOptionArray) {
                    const mappings = data.image_mappings;
                    const randomIndex = Math.floor(Math.random() * mappings.length);
                    const randomMapping = mappings[randomIndex];

                    const correctOptionArray = data.correctOptionArray;
                    const wrongAnswers = this.getRandomElements(correctOptionArray, 3);

                    this.setState({ mappings, mapping: randomMapping, wrongAnswers });
                    this.setState({ correctOptionArray: correctOptionArray });
                } else {
                    throw new Error('Invalid JSON structure');
                }
            })
            .catch(error => {
                console.error('Error fetching the JSON file:', error);
                this.setState({ error: true, errorMessage: error.message });
            });
    }

    getRandomElements(array, count) {
        const shuffled = array.slice(0);
        let i = array.length;
        let min = i - count;
        let temp, index;

        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }

        return shuffled.slice(min);
    }

    updateImageSize(lastWasRight) {
        if (lastWasRight && this.state.currentSizeIndex < this.state.chartSizesMM.length - 1) {
            this.setState(prevState => ({
                currentSizeIndex: prevState.currentSizeIndex + 1
            }));
           }
    }

    updateTimerTime(lastWasRight) {
        if (lastWasRight && this.timerBarRef.current) {
            this.timerBarRef.current.resetTimer(30);
        }
    }



    getNewQuestion() {
        // Update isORight with a new random true value
        const newIsORight = this.state.isORight.map(() => false);
        const randomIndexORight = Math.floor(Math.random() * newIsORight.length);
        newIsORight[randomIndexORight] = true;

        // Select a new random mapping from the mappings array
        const randomIndexMapping = Math.floor(Math.random() * this.state.mappings.length);
        const newMapping = this.state.mappings[randomIndexMapping];

        // Generate new wrong answers
        const newWrongAnswers = this.getRandomElements(this.state.correctOptionArray, 3);

        // Set the new state
        this.setState({
            isORight: newIsORight,
            mapping: newMapping,
            wrongAnswers: newWrongAnswers
        });
        this.setState((prevState) => ({
            count: prevState.count + 1,
        }));
        this.updateImageSize(true);
        this.updateTimerTime(true);
    }

    resetQuestion() {

        const newIsORight = this.state.isORight.map(() => false);
        const randomIndexORight = Math.floor(Math.random() * newIsORight.length);
        newIsORight[randomIndexORight] = true;

        // Select a new random mapping from the mappings array
        const randomIndexMapping = Math.floor(Math.random() * this.state.mappings.length);
        const newMapping = this.state.mappings[randomIndexMapping];

        // Generate new wrong answers
        const newWrongAnswers = this.getRandomElements(this.state.correctOptionArray, 3);

        // Set the new state
        this.setState({
            isORight: newIsORight,
            mapping: newMapping,
            wrongAnswers: newWrongAnswers
        });

    }

    render() {
        const { count, isORight, mapping, wrongAnswers, chartSizesMM, currentSizeIndex, currentTimeIndex, timesSec } = this.state;

        return (
            <div className='h-screen lg:overflow-hidden bg-gray-100 flex flex-col items-center justify-between'>
                
                <div className="flex flex-col justify-center items-center bg-black border-2 border-red-500 rounded-lg w-screen ml-4 mr-4 p-2 h-2/3">
                    
                    <div className="flex-grow flex justify-center items-center w-full">
                        {mapping ? (
                            <ODisplay
                            optotype={mapping.optotype}
                            chartSizesMM={chartSizesMM}
                            currentSizeIndex={currentSizeIndex}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <TimerBar timeToCount={30} 
                    ref={this.timerBarRef} />
                </div>


                {mapping ? ( <OptionsPanel 
                    mapping = {mapping}
                    isORight = {isORight}
                    wrongAnswers = {wrongAnswers}
                    incrementFunction = {this.getNewQuestion} /> ) :
                    <p> Loading...</p> }



            </div>
        );
    }
}

// Export the component
export default OptotypeQuestion;
