import { ChangeEvent } from 'react';

import * as styled from './Header.styled';

import { CartSize } from '../CartSize/CartSize';

import { CartLogo } from '../../assets/svg';
import { useApiBaseUrlState } from '../../recoils/recoilApiBaseUrl';

export const Header = () => {
  const [apiUrlkey, setApiUrlKey] = useApiBaseUrlState();

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setApiUrlKey(value);
  };

  return (
    <styled.Container>
      <styled.Content>
        <styled.Title to="/">
          <CartLogo fill="var(--grey-100)" style={{ width: '40px' }} />
        </styled.Title>
        <styled.RightWrapper>
          <styled.Selector onChange={onChange} value={apiUrlkey}>
            <option value="이리내">이리내</option>
            <option value="채채">채채</option>
          </styled.Selector>
          <styled.CartLink to="/shopping-cart">
            <CartSize />
          </styled.CartLink>
        </styled.RightWrapper>
      </styled.Content>
    </styled.Container>
  );
};
