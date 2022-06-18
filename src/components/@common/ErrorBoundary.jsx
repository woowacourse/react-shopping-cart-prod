import { Component } from 'react';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';

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

const Styled = {
  Message: styled.div`
    ${flexCenter}
    font-size: 5rem;
    color: ${theme.colors.grey};
  `,
};
