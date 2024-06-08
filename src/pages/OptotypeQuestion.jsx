import React, { useState } from 'react';

import ODisplay from '../components/ODisplay.jsx';


const OptotypeQuestion = () => {

    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);

    

    return (
      <div>
        <h1 className='m-4 text-2xl'>Counter: 0</h1>
        <div className="flex justify-center w-full">

          
          <div className='mt-2'><ODisplay /></div>
        </div>
      </div>


    );
  };
  
  // Export the component
  export default OptotypeQuestion;