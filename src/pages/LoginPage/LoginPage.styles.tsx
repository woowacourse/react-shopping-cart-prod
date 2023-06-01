import styled, { keyframes } from 'styled-components';

export const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginPageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const jump = keyframes`
  0%, 100% { transform: translate(-50%, -60%); }
  50% { transform: translate(-50%, -70%); }
`;

export const Image = styled.img`
  position: absolute;
  top: 32%;
  left: 50%;
  width: 250px;
  height: 250px;
  transform: translate(-50%, -50%);
  animation: ${jump} 1.3s infinite;
`;

export const FormWrapper = styled.div`
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

export const Label = styled.label`
  color: #721c24;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: var(--color-header);
  cursor: pointer;
  border-radius: 5px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
