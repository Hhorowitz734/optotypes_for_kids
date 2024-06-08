import React, { useState } from 'react';

import ODisplay from '../components/ODisplay.jsx';
import Options from '../components/Options.jsx';


const OptotypeQuestion = () => {

    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);

    const isORight = [true, false, false, false];

    

    return (
      <div>
        <h1 className='m-4 text-2xl'>Counter: {count}</h1>
        <div className="flex justify-center w-full">

          
          <div className='mt-2'><ODisplay /></div>


        </div>
        <div className='mt-2 flex justify-between'>
            <Options isRight = { isORight[0] } incrementFunction = {increment}/>
            <Options isRight = { isORight[1] } incrementFunction = {increment}/>
            <Options isRight = { isORight[2] } incrementFunction = {increment}/>
            <Options isRight = { isORight[3] } incrementFunction = {increment}/>
        </div>
      </div>


    );
  };
  
  // Export the component
  export default OptotypeQuestion;