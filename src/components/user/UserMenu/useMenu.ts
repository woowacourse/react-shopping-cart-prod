import { useRecoilState } from 'recoil';
import { menuState } from '../../../recoil/atoms/common';
import { useEffect, useRef, useState } from 'react';

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuState);
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      deactivateMenu();
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    setIsActive(true);
  };

  const deactivateMenu = () => setIsActive(false);

  const closeMenu = () => setIsMenuOpen(false);

  return {
    isMenuOpen,
    isActive,
    menuRef,
    openMenu,
    deactivateMenu,
    closeMenu,
  } as const;
};

export default useMenu;
