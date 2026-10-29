import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-8 text-center text-gray-400 bg-white/[0.02] border border-white/5 rounded-2xl my-4">
          <p className="text-sm">Component rendering fallback active.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
