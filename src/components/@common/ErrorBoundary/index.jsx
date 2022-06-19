import { Component } from 'react';
import { Styled } from './styles';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Styled.Message>{this.props.fallback}</Styled.Message>;
    }

    return this.props.children;
  }
}
