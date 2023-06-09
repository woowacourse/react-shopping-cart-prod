import { PropsWithChildren, createContext, useCallback, useState } from 'react';

type CheckOutPointCostValueContextType = {
  pointCost: number;
};

type CheckOutPointCostActionsContextType = {
  changePointCost: (e: React.ChangeEvent<HTMLInputElement>, cartTotalPrice: number, userOwnPoint: number) => void;
  allInPoint: (cartTotalPrice: number, userOwnPoint: number) => void;
};

export const CheckOutPointCostValueContext = createContext<CheckOutPointCostValueContextType | null>(null);
export const CheckOutPointCostActionsContext = createContext<CheckOutPointCostActionsContextType | null>(null);

export const CheckOutPointCostProvider = ({ children }: PropsWithChildren) => {
  const [pointCost, setPointCost] = useState(0);

  const changePointCost = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, paymentAmount: number, userOwnPoint: number) => {
      const isValid = e.target.validity.valid;
      if (!isValid) return;

      const pointCost = Number(e.target.value);
      if (pointCost > paymentAmount || pointCost > userOwnPoint) return;

      setPointCost(pointCost);
    },
    []
  );

  const allInPoint = useCallback((paymentAmount: number, userOwnPoint: number) => {
    const point = paymentAmount > userOwnPoint ? userOwnPoint : paymentAmount;

    setPointCost(point);
  }, []);

  return (
    <CheckOutPointCostActionsContext.Provider value={{ changePointCost, allInPoint }}>
      <CheckOutPointCostValueContext.Provider value={{ pointCost }}>{children}</CheckOutPointCostValueContext.Provider>
    </CheckOutPointCostActionsContext.Provider>
  );
};
