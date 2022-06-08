import React from 'react';
//https://levelup.gitconnected.com/micro-frontends-at-scale-part-2-d10994f09f18
const AsyncLoader = ({ children, noLoading }) => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={noLoading ? '' : <span>loading...</span>}>
        {children}
      </React.Suspense>
    </ErrorBoundary>
  )
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }

    return this.props.children; 
  }
}

export default AsyncLoader;