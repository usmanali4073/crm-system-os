import './App.css';
import React from 'react';
// const Button = React.lazy(() => import('MFE1/Button'));
import { useFederatedComponent } from './components/tools/webpackremoteloader';

function App() {

  const { Component: Header, errorLoading } = useFederatedComponent('http://10.0.0.3:8083/remoteEntry.js', 'MFE1', './Button')
  const Headers = (Header as unknown as React.ComponentType<any>);


  //show alert on click
  const showAlert = () => {
    alert('Hello World');
  };

  return (
    <div className="App">
      <h1>Main Page</h1>
      {errorLoading ? `Error loading module "${module}"` : Header && <Headers changeName={showAlert} />}
      {process.env.name}
    </div>
  );
}

export default App;
