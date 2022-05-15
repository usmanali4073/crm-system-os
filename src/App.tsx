import './App.css';
import React from 'react';
// const Button = React.lazy(() => import('MFE1/Button'));
import ErrorBoundary from './components/ErrorBoundary';
import { useFederatedComponent } from './components/tools/webpackremoteloader';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ module, scope, url }, setSystem] = React.useState({});

  function setApp2() {
    setSystem({
      url: 'http://10.0.0.3:8083/remoteEntry.js',
      scope: 'MFE1',
      module: './Button',
    });
  }

  const { Component: Header, errorLoading } = useFederatedComponent(url, scope, module);

  //show alert on click
  const showAlert = () => {
    alert('Hello World');
  };
  
  return (
    <div className="App">
      <h1>Main Page</h1>
      <button onClick={setApp2}>Set App2</button>
      <ErrorBoundary>
      <React.Suspense fallback={<div>Button Component Did not load...</div>}>
      {errorLoading ? `Error loading module "${module}"` : Header && <Header changeName={showAlert} />}
      </React.Suspense>
      </ErrorBoundary>
      {process.env.name}
    </div>
  );
}

export default App;
