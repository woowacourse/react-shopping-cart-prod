import { Component } from 'react';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import * as Styled from './styles';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <CommonStyled.Container
          width="100%"
          height="80vh"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Styled.ErrorImage />
          <CommonStyled.PageTitle>문제가 발생했습니다. 😥</CommonStyled.PageTitle>
          <CommonStyled.HR />
          <p>페이지를 새로고침 해주시고, 문제가 지속된다면 관리자에게 문의 바랍니다.</p>
        </CommonStyled.Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
