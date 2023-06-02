import { PropsWithChildren, createContext, useCallback, useState } from 'react';

type CheckOutPointCostContextType = {
  pointCost: number;
  changePointCost: (e: React.ChangeEvent<HTMLInputElement>, cartTotalPrice: number, userOwnPoint: number) => void;
  allInPoint: (cartTotalPrice: number, userOwnPoint: number) => void;
};

export const CheckOutPointCostContext = createContext<CheckOutPointCostContextType | null>(null);

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
    <CheckOutPointCostContext.Provider value={{ pointCost, changePointCost, allInPoint }}>
      {children}
    </CheckOutPointCostContext.Provider>
  );
};
