import {Link, NavLink} from 'react-router-dom';
import {FlexColumn, FlexRow} from 'style/common';
import styled from 'styled-components';

const HeaderLayout = styled(FlexRow)`
  position: fixed;
  top: 0;
  left: 0;

  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10%;

  width: 100vw;
  height: 80px;

  background-color: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);

  z-index: 1;

  .active {
    transform: scale(1.1);
    font-weight: bold;
  }
`;

const HeaderNavBox = styled.div`
  display: flex;
`;

const NavText = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10vw;
  font-size: 24px;
  color: ${({theme}) => theme.WHITE};
`;

const ProfileNavContainer = styled(FlexColumn)`
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const ProfileNavText = styled(NavLink)`
  padding: 10px 0px;

  font-size: 15px;
  color: ${({theme}) => theme.BLACK};
`;

const ProfileLinkText = styled(Link)`
  padding: 10px 0px;

  font-size: 15px;
  color: ${({theme}) => theme.BLACK};
`;

const Profile = styled.div`
  position: relative;
  width: 60px;
  height: 60px;

  .tooltip-content {
    width: 142px;
    height: 112px;

    position: relative;
    top: 65px;
    right: 41px;
    padding: 0px;
    margin-top: 10px;

    background-color: ${({theme}) => theme.WHITE};
    color: white;
    text-align: center;

    border: 2px solid ${({theme}) => theme.MINT_700};
    box-sizing: border-box;

    visibility: hidden;
  }

  .tooltip-content:after {
    content: ' ';
    position: absolute;
    left: 50%;
    top: 0;
    width: 0;
    height: 0;

    background-color: transparent;

    border: 15px solid transparent;
    border-bottom-color: ${({theme}) => theme.MINT_700};
    border-top: 0;

    margin-left: -15px;
    margin-top: -15px;
  }

  .tooltip-container {
    position: absolute;
    width: 120px;
    height: 50px;
    top: 30px;
    left: -50%;
    background-color: transparent;
  }

  .tooltip-content a:hover {
    transform: scale(1.1);
    font-weight: bold;
  }

  &:hover .tooltip-content {
    visibility: visible;
  }

  &:hover .baedale {
    display: none;
  }
`;

const ProfileImage = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8vw;
  font-size: 20px;
  line-height: 25px;
  color: ${({theme}) => theme.WHITE};
`;

export {
  HeaderLayout,
  HeaderNavBox,
  NavText,
  Profile,
  ProfileNavText,
  ProfileNavContainer,
  ProfileImage,
  ProfileLinkText,
  UserName,
};
