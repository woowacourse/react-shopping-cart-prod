import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StyledSnackbar from "@/components/Snackbar/index.styled";
import { toggleSnackbarClose } from "@/redux/modules/snackbar";

function Snackbar({ timeout }) {
  const dispatch = useDispatch();

  const SHOW = useSelector((state) => state.snackbarState.toggleSnackbar);
  const MESSAGE = useSelector((state) => state.snackbarState.snackbarMessage);

  const TIME = `${(timeout - 500) / 1000}s`;

  let TIMER;
  function handleTimeout() {
    TIMER = setTimeout(() => {
      dispatch(toggleSnackbarClose());
    }, timeout);
  }

  useEffect(() => {
    if (SHOW) {
      handleTimeout();
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [SHOW, TIMER]);

  return (
    SHOW && (
      <StyledSnackbar time={TIME}>
        <p>{MESSAGE}</p>
      </StyledSnackbar>
    )
  );
}

export default Snackbar;
