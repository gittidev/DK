import { Suspense, lazy } from "react";
import styles from "./Section04.module.scss";

const NaverMap = lazy(() => import("../../components/NaverMap"));

const Section04 = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>시공 현장</h2>
      <p className={styles.subtitle}>
        대광PC의 주요 시공 현장을 확인해보세요.
      </p>
      <div className={styles.mapContainer}>
        <Suspense fallback={<div>지도를 불러오는 중...</div>}>
          <NaverMap />
        </Suspense>
      </div>
    </div>
  );
};

export default Section04;
