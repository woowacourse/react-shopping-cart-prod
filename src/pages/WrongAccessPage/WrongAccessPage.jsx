import { useNavigate } from "react-router-dom";
import Button from "@components/Button";

import styles from "./WrongAccessPage.module";

function WrongAccessPage() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="wrapper">
      <div className={styles.guideMessage}>잘못된 접근입니다.</div>
      <Button
        className={styles.homeButton}
        variant="primary"
        block
        onClick={navigateHome}
      >
        홈으로
      </Button>
    </div>
  );
}

export default WrongAccessPage;
