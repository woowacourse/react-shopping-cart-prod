import { useRecoilState } from 'recoil';

import { Servers } from '@Types/index';

import useCartItems from '@Hooks/useCartItems';

import serverState from '@Atoms/serverState';

export const useQuickMenu = () => {
  const { toggleServer } = useCartItems();
  const [server, setServer] = useRecoilState<Servers>(serverState);

  const handleClick = (value: Servers) => () => {
    setServer(value);
    toggleServer(value);

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return { handleClick, server };
};
