import "./App.css";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary";
const Button = React.lazy(() => import("MFE1/Button"));

function App() {
  //show alert on click
  const showAlert = () => {
    alert("Hello World");
  };

  return (
    <div className="App">
      <h1>Main Page</h1>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Button changeName={showAlert}>Click Me</Button>
        </React.Suspense>
      </ErrorBoundary>

      {process.env.name}
    </div>
  );
}

export default App;
