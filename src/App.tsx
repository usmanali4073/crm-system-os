import './App.css';
import React from 'react';
const Button = React.lazy(() => import('MFE1/Button'));

function App() {
  //show alert on click
  const showAlert = () => {
    alert('Hello World');
  };
  
  return (
    <div className="App">
      <h1>Main Page</h1>
      <React.Suspense fallback={<div>Button Component Did not load...</div>}>
        <Button changeName={showAlert}/>
      </React.Suspense>
      {process.env.name}
    </div>
  );
}

export default App;
