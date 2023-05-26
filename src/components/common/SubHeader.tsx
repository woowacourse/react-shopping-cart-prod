import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
}

export default function SubHeader({ children }: Props) {
  return (
    <Wrapper>
      <h2>{children}</h2>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  border-bottom: 4px solid #333333;
  padding-bottom: 28px;

  line-height: 37px;
  letter-spacing: 0.5px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #333333;
`;
