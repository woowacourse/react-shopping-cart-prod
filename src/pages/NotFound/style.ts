import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 120px;
  min-width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`;

export const Layout = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  row-gap: 20px;
`;

export const Image = styled.img`
  width: 240px;
`;

export const MainGuideMessage = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.props.gray200};
`;

export const SubGuideMessage = styled.div`
  color: ${(props) => props.theme.props.gray200};
`;
