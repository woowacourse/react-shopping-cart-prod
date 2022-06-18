import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackbarClose } from "@/redux/modules/snackbar";

import SnackbarContainer from "@/components/common/snackbar/Snackbar.styled";

const Snackbar = ({ timeout }) => {
  const dispatch = useDispatch();

  const SHOW = useSelector((state) => state.snackbarState.toggleSnackbar);
  const MESSAGE = useSelector((state) => state.snackbarState.snackbarMessage);

  let TIME = (timeout - 500) / 1000 + "s";

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
      <SnackbarContainer time={TIME}>
        <p>{MESSAGE}</p>
      </SnackbarContainer>
    )
  );
};

export default Snackbar;
