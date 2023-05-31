import styled from 'styled-components';

interface FallbackProps {
  error: Error;
}
export const Fallback = ({ error }: FallbackProps) => {
  return (
    <Style.Container>
      <Style.Title>앗!</Style.Title>
      <Style.Caption>{error.message}</Style.Caption>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    padding-top: 50px;
  `,
  Title: styled.h1`
    font-size: 150px;
  `,
  Caption: styled.span`
    font-size: 25px;
  `,
};
