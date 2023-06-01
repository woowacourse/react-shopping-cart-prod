import { PropsWithChildren, createContext, useCallback, useState } from 'react';

type CheckOutPointCostContextType = {
  pointCost: number;
  changePointCost: (e: React.ChangeEvent<HTMLInputElement>, userOwnPoint: number) => void;
  allInPoint: (userOwnPoint: number) => void;
};

export const CheckOutPointCostContext = createContext<CheckOutPointCostContextType | null>(null);

export const CheckOutPointCostProvider = ({ children }: PropsWithChildren) => {
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
    <CheckOutPointCostContext.Provider value={{ pointCost, changePointCost, allInPoint }}>
      {children}
    </CheckOutPointCostContext.Provider>
  );
};
