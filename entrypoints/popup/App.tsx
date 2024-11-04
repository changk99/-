import { useState } from 'react';

function App() {
  const [count, setCount] = useState(1);
  console.log(setCount);
  return <div className="text-red-500">hello world!! {count}</div>;
}

export default App;
