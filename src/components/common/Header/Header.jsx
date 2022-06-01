import React from 'react';

import useWindowsSize from 'hooks/useWindowSize';

import { ROUTE } from 'route';

import { Icon } from 'components/common';
import * as Styled from 'components/common/Header/Header.style';

import { deviceSizeStandard } from 'styles/Theme';

function Header({ navLinkInfo }) {
  const windowSize = useWindowsSize();

  const IconSizeBreakPoint = deviceSizeStandard.desktop;

  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.NavLink to={ROUTE.home.path}>
          <Styled.Logo>
            <Icon
              iconName="Tent"
              size={windowSize >= IconSizeBreakPoint ? '50' : '30'}
              stroke="white"
            />
            BLVIC&apos;S CAMPING
          </Styled.Logo>
        </Styled.NavLink>

        <Styled.NavButton>
          {navLinkInfo.map(({ path, name }) => (
            <Styled.NavLink key={name} to={path}>
              {name}
            </Styled.NavLink>
          ))}
        </Styled.NavButton>
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Header;
