import React from 'react';

import Button from './Button';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="px-10 py-16 sm:px-10 sm:py-24 md:grid md:place-items-center lg:px-10">
          <div className="mx-auto max-w-max">
            <main className="flex flex-col items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-center text-gray-900 sm:text-5xl">Something went wrong</h1>
                <p className="mt-1 text-base text-center text-gray-500">An unknown error has occured. Please try refreshing the page. If that does not work please return to the home page.</p>
              </div>
              <div className="flex min-w-[50%] mt-10 space-x-3">
                <Button dark onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
                <Button onClick={() => window.open('/', '_self')}>Return Home</Button>
              </div>
            </main>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
