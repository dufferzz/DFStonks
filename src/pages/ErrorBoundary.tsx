import React from "react";
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {}

  render() {
    if (this.state.hasError) {
      return <h1>FUCK</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
