import { PropsWithChildren, createContext, useCallback, useState } from 'react';

type OrderPointCostContextType = {
  pointCost: number;
  changePointCost: (e: React.ChangeEvent<HTMLInputElement>, userOwnPoint: number) => void;
  allInPoint: (userOwnPoint: number) => void;
};

export const OrderPointCostContext = createContext<OrderPointCostContextType | null>(null);

export const OrderPointCostProvider = ({ children }: PropsWithChildren) => {
  const [pointCost, setPointCost] = useState(0);

  const changePointCost = useCallback((e: React.ChangeEvent<HTMLInputElement>, userOwnPoint: number) => {
    const isValid = e.target.validity.valid;
    if (!isValid) return;

    const pointCost = Number(e.target.value);
    if (userOwnPoint < pointCost) return;

    setPointCost(pointCost);
  }, []);

  const allInPoint = useCallback((userOwnPoint: number) => {
    setPointCost(userOwnPoint);
  }, []);

  return (
    <OrderPointCostContext.Provider value={{ pointCost, changePointCost, allInPoint }}>
      {children}
    </OrderPointCostContext.Provider>
  );
};
