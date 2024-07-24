import React, { Component } from 'react';

class ODisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartSizesMM: [20, 15, 10, 7.5, 5, 2.5, 2],
            currentSizeIndex: 0,
            isCorrect: true // You can manage this state from parent component or based on your logic
        };
    }

    componentDidMount() {
        this.updateImageSize();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isCorrect !== this.state.isCorrect && this.state.isCorrect) {
            this.updateImageSize();
        }
    }

    updateImageSize() {
        if (this.state.isCorrect && this.state.currentSizeIndex < this.state.chartSizesMM.length - 1) {
            this.setState(prevState => ({
                currentSizeIndex: prevState.currentSizeIndex + 1
            }));
        }
    }

    render() {

        const { optotype, chartSizesMM, currentSizeIndex } = this.props;
        const sizeInMM = chartSizesMM[currentSizeIndex];

        const style = {
            width: `${sizeInMM}mm`,
            height: `${sizeInMM}mm`
        };


        return (
            <div className=''>
                <div className='border-2 border-black rounded-lg flex items-center justify-center' style={style}>
                    <img src={optotype} alt="Optotype" className='object-contain rounded-lg' />
                </div>
            </div>
        );
    }
}

export default ODisplay;





