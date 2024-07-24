import React, { Component } from 'react';

import ODisplay from '../components/ODisplay.jsx';
import Options from '../components/Options.jsx';
import TimerBar from '../components/TimerBar.jsx';

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

                    console.log(wrongAnswers)

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
        if (lastWasRight && this.state.currentTimeIndex < this.state.timesSec.length - 1) {
            this.setState(prevState => ({
                currentTimeIndex: prevState.currentTimeIndex + 1
            }))

            if (this.timerBarRef.current) {
                this.timerBarRef.current.resetTimer(this.state.timesSec[this.state.currentTimeIndex]);
              }
        }
        else {
            if (this.timerBarRef.current) {
                this.timerBarRef.current.resetTimer(this.state.timesSec[this.state.currentTimeIndex]);
              }
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
                
                <div className="grid grid-cols-2 bg-black border-2 border-red-500 rounded-lg w-screen ml-4 mr-4 p-2 h-2/3">
                    <div className='mt-2'>
                        {mapping ? <ODisplay
                        optotype={mapping.optotype}
                        chartSizesMM={chartSizesMM}
                        currentSizeIndex={currentSizeIndex}
                        /> : <p>Loading...</p>}
                    </div>
                    <div>
                        <h1 className='text-xl text-white  '>Counter: {count}</h1>
                        <div className='bg-gray-100 hover:bg-gray-300 w-20 h-20 rounded-lg text-center align-middle cursor-pointer'
                        onClick={this.resetQuestion}>Reset</div>
                        <TimerBar 
                        timeToCount = {timesSec[currentTimeIndex]} 
                        ref={this.timerBarRef} />
                    </div>
            
                </div>

                <div className='m-2 grid grid-cols-1 md:grid-cols-4 gap-4 w-full px-4 '>
                    {mapping ? (
                        <Options
                            isRight={isORight[0]}
                            incrementFunction={this.getNewQuestion}
                            picture={isORight[0] ? mapping.correct_result : wrongAnswers[0]}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}

                    {mapping ? (
                        <Options
                            isRight={isORight[1]}
                            incrementFunction={this.getNewQuestion}
                            picture={isORight[1] ? mapping.correct_result : wrongAnswers[1]}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}

                    {mapping ? (
                        <Options
                            isRight={isORight[2]}
                            incrementFunction={this.getNewQuestion}
                            picture={isORight[2] ? mapping.correct_result : wrongAnswers[2]}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}

                    {mapping ? (
                        <Options
                            isRight={isORight[3]}
                            incrementFunction={this.getNewQuestion}
                            picture={isORight[3] ? mapping.correct_result : wrongAnswers[3]}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        );
    }
}

// Export the component
export default OptotypeQuestion;
