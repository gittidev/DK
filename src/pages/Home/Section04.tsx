import { useRef, Suspense, lazy } from "react";
import styles from "./Section04.module.scss";

// NaverMap 컴포넌트를 lazy load
const NaverMap = lazy(() => import("../../components/NaverMap"));

const Section04 = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={styles.container} ref={sectionRef}>
      <h2 className={styles.title}>광주·전남 권역 시공 내역</h2>
      <span> 2024년 ~ 2025년 현황</span>
      <p className={styles.subtitle}>
        시공의 <strong>발자취</strong>를 지도 위에 담았습니다. <br />
        <span>광주·전남 권역 주요 현장을 확인해보세요.</span>
      </p>

      <Suspense fallback={<div>지도를 불러오는 중...</div>}>
        <NaverMap />
      </Suspense>
    </div>
  );
};

export default Section04;
