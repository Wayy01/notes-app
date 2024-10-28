import React from 'react';
import { toast } from 'sonner';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error);
    console.error('Error info:', errorInfo);

    // Report to error tracking service if available
    if (import.meta.env.PROD) {
      // Add your error reporting service here
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
          <div className="text-center space-y-4 p-6 bg-[#12121A] rounded-xl">
            <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
            <p className="text-gray-400">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-violet-500 hover:bg-violet-600
                       transition-colors rounded-lg text-white"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
