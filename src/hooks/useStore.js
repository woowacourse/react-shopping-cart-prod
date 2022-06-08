import { useDispatch, useSelector } from "react-redux";

export const useStore = (reducerKey) => {
  const { data, isLoading, isLoggedIn, errorMessage } = useSelector(
    (state) => state[reducerKey]
  );
  const dispatch = useDispatch();

  return { data, isLoading, isLoggedIn, errorMessage, dispatch };
};
