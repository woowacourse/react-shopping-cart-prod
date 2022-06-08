import styled, { css } from 'styled-components';

const RightMenu = styled.div`
  display: flex;

  ${({ gap = '44px' }: { gap?: string }) =>
    css`
      gap: ${gap};
    `}

  a:hover {
    font-weight: 900;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;

  font-size: 20px;
  height: 60px;
  padding: 0 10%;
  top: 0px;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.overEverything};

  background: ${({ theme: { colors } }) => colors.redPink};
  color: ${({ theme: { colors } }) => colors.white};

  ${RightMenu} {
    text-shadow: -0.5px 0 ${({ theme: { colors } }) => colors.gray},
      0 0.5px ${({ theme: { colors } }) => colors.gray},
      0.5px 0 ${({ theme: { colors } }) => colors.gray},
      0 -0.5px ${({ theme: { colors } }) => colors.gray};
  }
`;

const Badge = styled.div`
  display: inline-block;
  position: absolute;
  top: 10px;
  text-align: center;

  width: 15px;
  height: 15px;
  border: 0.5px solid ${({ theme: { colors } }) => colors.white};
  border-radius: 50%;

  background: ${({ theme: { colors } }) => colors.pink};
  color: ${({ theme: { colors } }) => colors.black};

  font-size: 14px;
  font-weight: normal !important;
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: sticky;

  font-size: 16px;
  height: 24px;
  padding: 0 10%;
  top: 60px;
  z-index: ${({ theme: { zPriorities } }) => zPriorities.overEverything};

  background: ${({ theme: { colors } }) => colors.white};
  color: ${({ theme: { colors } }) => colors.black};
`;

const ControlUserButton = styled.button`
  border-radius: 12px;
  padding: 0 12px;

  background-color: ${({ theme: { colors } }) => colors.pink};
  color: ${({ theme: { colors } }) => colors.white};

  font-weight: 800;
  font-size: 14px;
`;

export { RightMenu, Header, Badge, SubHeader, ControlUserButton };
