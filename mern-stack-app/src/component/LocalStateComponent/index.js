import  { useState } from 'react';

const LocalStateComponet = () => {

    const [count, setCount] = useState(0);

    const increment = () => {
      setCount(prevCount => prevCount + 1);
    };
  
    const decrement = () => {
      setCount(prevCount => prevCount - 1);
    };

  return (

    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
    
  )
}

export default LocalStateComponet