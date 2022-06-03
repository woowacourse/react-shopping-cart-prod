import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

const QuantityInput = ({ quantity, onChange }: { quantity: number; onChange: () => void }) => {
  return <StyledRoot onChange={onChange}>{quantity}</StyledRoot>;
};

const StyledRoot = styled.div`
  ${flexCenter}

  font-size: 2.4rem;
  grid-area: qp;
  width: 7.3rem;
  height: 6rem;
  border: solid grey 1px;
`;

export default QuantityInput;
