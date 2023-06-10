import {useState} from "react";
import styled from "styled-components";
import {
  CartCount,
  CartCountText,
  CartCountWrapper,
  MenuIcon,
  MenuTitle,
  MenuWrapper,
} from "../Header/Header.style.ts";
import Icon from "../Icon.tsx";
import {IoCart, IoPerson} from "react-icons/io5";
import {useRecoilValue} from "recoil";
import {userState} from "../../app/recoil/user/userAtom.tsx";
import {useNavigate} from "react-router-dom";
import Point from "../Point";
import {userRepository} from "../../app/recoil/user/userRepository.tsx";
import {cartCountSelector} from "../../app/recoil/cart/cartSelectors.ts";
import {modalRepository} from "../../app/recoil/modal/modalRepository.tsx";

export const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  color: black;
`;

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-top: none;
  display: ${({isOpen}) => (isOpen ? "block" : "none")};
  font-size: 18px;
  z-index: 9999;
`;

export const DropdownMenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: ${({isOpen}) => (isOpen ? "block" : "none")};
  z-index: 9998;
`;

const MenuGroup = styled.div`
  display: flex;
  gap: 10px;
`;

function PersonalDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(userState);
  const {logout} = useRecoilValue(userRepository);
  const cartCount = useRecoilValue(cartCountSelector);
  const {openModal} = useRecoilValue(modalRepository);

  const options = [
    {
      name: "포인트",
      callback: () => openModal(<Point/>),
    },
    {
      name: "주문목록",
      callback: () => navigate("/order"),
    },
    {
      name: "로그아웃",
      callback: () => {
        if (confirm("로그아웃 하시겠습니까?")) {
          logout();
        }
      },
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (callback: () => void) => {
    callback();
    toggleDropdown();
  };

  return (
    <DropdownWrapper>
      <MenuGroup>
        <MenuWrapper onClick={() => navigate("/cart")}>
          <MenuIcon>
            {cartCount > 0 ? (
              <CartCountWrapper>
                <CartCount>
                  <CartCountText>{cartCount}</CartCountText>
                </CartCount>
              </CartCountWrapper>
            ) : (
              <Icon fontSize={30}>
                <IoCart/>
              </Icon>
            )}
            <MenuTitle>장바구니</MenuTitle>
          </MenuIcon>
        </MenuWrapper>
        <MenuWrapper onClick={() => toggleDropdown()}>
          <MenuIcon>
            <Icon fontSize={30}>
              <IoPerson/>
            </Icon>
            <MenuTitle>{user?.name} 님</MenuTitle>
          </MenuIcon>
        </MenuWrapper>
      </MenuGroup>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleClick(option.callback)}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
      <Backdrop isOpen={isOpen} onClick={() => toggleDropdown()}/>
    </DropdownWrapper>
  );
}

export default PersonalDropdown;
