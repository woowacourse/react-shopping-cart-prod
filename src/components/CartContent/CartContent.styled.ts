import styled from 'styled-components';

const ContentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 80px;

  width: 100%;

  margin-top: 30px;
`;

const ProductContainer = styled.div`
  grid-column: 1 / 5;
`;

const ProductOptions = styled.div`
  display: flex;
  justify-content: space-between;

  height: 30px;

  margin-bottom: 20px;
`;

const AllCheckOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  font-size: 15px;
`;

const DeleteButton = styled.button`
  width: 100px;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  background: ${({ theme: { colors } }) => colors.white};
`;

const Message = styled.div`
  text-align: center;
`;

const TotalContainer = styled.div`
  grid-column: 5 / 7;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 100px;

  height: fit-content;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  padding: 0 20px 20px;

  background: ${({ theme: { colors } }) => colors.white};

  h3 {
    line-height: 50px;
  }

  hr {
    width: calc(100% + 40px);

    margin: 0 -20px;
  }
`;

const TotalMoney = styled.div`
  line-height: 5px;
  border-bottom: 10px solid ${({ theme: { colors } }) => colors.pink};

  margin: 30px 0;
`;

export {
  ContentBox,
  ProductContainer,
  ProductOptions,
  AllCheckOption,
  DeleteButton,
  Message,
  TotalContainer,
  TotalMoney,
};
