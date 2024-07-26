import React, { Component } from 'react';

class TimerBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.timeToCount,
      totalTime: props.timeToCount
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timeLeft: prevState.timeLeft > 0 ? prevState.timeLeft - 1 : 0
      }));
    }, 1000);
  };

  resetTimer = (newTime) => {
    clearInterval(this.interval);
    this.setState(
      {
        timeLeft: newTime,
        totalTime: newTime
      },
      this.startTimer
    );
  };

  getColor() {
    const { timeLeft, totalTime } = this.state;
    const red = Math.min(255, Math.floor((totalTime - timeLeft) * (255 / totalTime))) - 150;
    const green = Math.min(255, Math.floor(timeLeft * (255 / totalTime)));
    return `rgb(${red},${green},0)`;
  }

  render() {
    const { totalTime, timeLeft } = this.state;

    return (
      <div style={{ width: '100%', height: '30px', backgroundColor: '#ccc' }}>
        <div
          style={{
            width: `${((totalTime - timeLeft) / totalTime) * 100}%`,
            height: '100%',
            backgroundColor: this.getColor(),
            transition: 'width 1s linear, background-color 1s linear'
          }}
        ></div>
      </div>
    );
  }
}

export default TimerBar;
