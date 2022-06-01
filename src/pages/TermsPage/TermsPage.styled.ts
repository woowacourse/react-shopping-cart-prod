import styled from 'styled-components';

export const PageBox = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

export const TermsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Title = styled.h2`
  font-weight: 700;
`;
export const Paragraph = styled.p`
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.label`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const TermDetailButton = styled.button`
  padding: 5px 30px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};
  border-radius: 50px;

  :hover {
    background: ${({ theme: { colors } }) => colors.lightGray};
  }
`;

export const SubmitButtonBox = styled.div`
  width: 300px;
  margin: 24px auto 0;
`;
